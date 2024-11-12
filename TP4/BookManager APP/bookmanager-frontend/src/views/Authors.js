import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Authors.css';

function Authors() {
  const [autores, setAutores] = useState([]);
  const [nuevoAutor, setNuevoAutor] = useState({ nombre: '', biografia: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAutores = async () => {
      const response = await axios.get('http://localhost:3000/authors');
      setAutores(response.data);
    };
    fetchAutores();
  }, []);

  const handleChange = (e) => {
    setNuevoAutor({ ...nuevoAutor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/authors', nuevoAutor);
      setNuevoAutor({ nombre: '', biografia: '' }); 
      setIsFormVisible(false); 
      const response = await axios.get('http://localhost:3000/authors');
      setAutores(response.data);
    } catch (error) {
      console.error('Error al agregar el autor:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-author/${id}`); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/authors/${id}`);
      setAutores(autores.filter((autor) => autor.id !== id)); 
    } catch (error) {
      console.error('Error al eliminar el autor:', error);
    }
  };

  const handleBack = () => {
    navigate('/manage-books'); 
  };

  return (
    <div className="authors">
      <h1>Lista de Autores</h1>
      <p>Aquí puedes ver todos los autores que has ingresado. Puedes agregar, editar y eliminar autores.</p>

      <button onClick={handleBack}>Volver</button>

      {!isFormVisible ? (
        <button onClick={() => setIsFormVisible(true)}>Agregar un autor nuevo</button>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoAutor.nombre}
              onChange={handleChange}
              required
            />
            <textarea
              name="biografia"
              placeholder="Biografía"
              value={nuevoAutor.biografia}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Agregar Autor</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>Cancelar</button>
          </form>
        </div>
      )}

      <ul>
        {autores.map((autor) => (
          <li key={autor.id}>
            <h3>{autor.nombre}</h3>
            <p>{autor.biografia}</p>
            <button onClick={() => handleEdit(autor.id)}>Editar</button>
            <button onClick={() => handleDelete(autor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Authors;
