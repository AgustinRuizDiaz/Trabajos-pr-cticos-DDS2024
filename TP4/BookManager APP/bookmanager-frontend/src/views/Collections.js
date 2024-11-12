import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Collections.css';

function Collections() {
  const [colecciones, setColecciones] = useState([]);
  const [nuevaColeccion, setNuevaColeccion] = useState({ nombre: '', descripcion: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [libros, setLibros] = useState([]);
  const [librosSeleccionados, setLibrosSeleccionados] = useState([]);
  const [selectedColeccionId, setSelectedColeccionId] = useState(null);
  const [isAddingLibros, setIsAddingLibros] = useState(false);
  const [expandedColeccionId, setExpandedColeccionId] = useState(null);
  const [librosDeColeccion, setLibrosDeColeccion] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coleccionesResponse = await axios.get('http://localhost:3000/collections');
        setColecciones(coleccionesResponse.data);

        const librosResponse = await axios.get('http://localhost:3000/books');
        setLibros(librosResponse.data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaColeccion(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/collections', nuevaColeccion);
      setNuevaColeccion({ nombre: '', descripcion: '' });
      setIsFormVisible(false);
      const updatedColecciones = await axios.get('http://localhost:3000/collections');
      setColecciones(updatedColecciones.data);
    } catch (error) {
      console.error('Error al agregar la colección:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/collections/${id}`);
      setColecciones(colecciones.filter((coleccion) => coleccion.id !== id));
    } catch (error) {
      console.error('Error al eliminar la colección:', error);
    }
  };

  const handleLibrosChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLibrosSeleccionados([...librosSeleccionados, parseInt(value)]);
    } else {
      setLibrosSeleccionados(librosSeleccionados.filter(libroId => libroId !== parseInt(value)));
    }
  };

  const handleAgregarLibros = async () => {
    try {
      await axios.post('http://localhost:3000/collections/agregarLibros', {
        coleccionId: selectedColeccionId,
        librosIds: librosSeleccionados,
      });
      setLibrosSeleccionados([]);
      setIsAddingLibros(false);  
      const updatedLibrosDeColeccion = await axios.get(`http://localhost:3000/collections/${selectedColeccionId}/books`);
      setLibrosDeColeccion((prevState) => ({
        ...prevState,
        [selectedColeccionId]: updatedLibrosDeColeccion.data,
      }));
    } catch (error) {
      console.error('Error al agregar libros:', error);
    }
  };

  const handleCancelar = () => {
    setIsAddingLibros(false);
    setLibrosSeleccionados([]);  
  };

  const handleToggleLibros = async (coleccionId) => {
    if (librosDeColeccion[coleccionId]) {
      setExpandedColeccionId(expandedColeccionId === coleccionId ? null : coleccionId);
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/collections/${coleccionId}/books`);
        setLibrosDeColeccion((prevState) => ({
          ...prevState,
          [coleccionId]: response.data,
        }));
        setExpandedColeccionId(coleccionId);
      } catch (error) {
        console.error('Error al cargar los libros de la colección:', error);
      }
    }
  };

  const handleBack = () => {
    navigate('/manage-books');
  };

  return (
    <div className="collections-container">
      <h1>Mis Colecciones</h1>
      <p>Aquí puedes ver todas tus colecciones, agregar una nueva, editar o eliminar las que ya tienes.</p>

      <button onClick={handleBack}>Volver</button>

      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)}>
          Agregar nueva colección
        </button>
      )}

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la colección"
            value={nuevaColeccion.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción de la colección"
            value={nuevaColeccion.descripcion}
            onChange={handleChange}
          ></textarea>
          <div>
            <button type="submit">Agregar colección</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <ul>
        {colecciones.map((coleccion) => (
          <li key={coleccion.id}>
            <h3>{coleccion.nombre}</h3>
            <p>{coleccion.descripcion}</p>
            {coleccion.libros && coleccion.libros.length > 0 && (
              <p>{coleccion.libros.length} libros</p>
            )}
            <button onClick={() => { 
              setSelectedColeccionId(coleccion.id);
              setIsAddingLibros(true);
            }}>
              Agregar libros
            </button>

            {isAddingLibros && selectedColeccionId === coleccion.id && (
              <div>
                <h4>Seleccionar libros para agregar</h4>
                <div>
                  {libros.map((libro) => (
                    <div key={libro.id}>
                      <input
                        type="checkbox"
                        value={libro.id}
                        onChange={handleLibrosChange}
                        id={`libro-${libro.id}`}
                      />
                      <label htmlFor={`libro-${libro.id}`}>{libro.titulo}</label>
                    </div>
                  ))}
                </div>
                <button onClick={handleAgregarLibros}>Agregar libros a la colección</button>
                <button onClick={handleCancelar}>Cancelar</button>
              </div>
            )}

            <button onClick={() => handleToggleLibros(coleccion.id)}>
              {expandedColeccionId === coleccion.id ? 'Ocultar libros' : 'Ver libros'}
            </button>

            {expandedColeccionId === coleccion.id && librosDeColeccion[coleccion.id] && (
              <ul>
                {librosDeColeccion[coleccion.id].map((libro) => (
                  <li key={libro.id}>{libro.titulo}</li>
                ))}
              </ul>
            )}

            <button onClick={() => handleDelete(coleccion.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collections;
