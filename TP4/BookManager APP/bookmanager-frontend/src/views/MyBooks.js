import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MyBooks.css';

function MyBooks() {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    estado: 'por leer',
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reseñas, setReseñas] = useState({});
  const [mostrarReseñas, setMostrarReseñas] = useState(null); 

  const fetchLibros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setLibros(response.data);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const handleChange = (e) => {
    setNuevoLibro({
      ...nuevoLibro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/books', nuevoLibro);
      setLibros([...libros, response.data]); 
      setNuevoLibro({
        titulo: '',
        autor: '',
        genero: '',
        estado: 'por leer',
      });
      setMostrarFormulario(false); 
    } catch (error) {
      console.error('Error al agregar el libro:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      setLibros(libros.filter(libro => libro.id !== id)); 
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };

  const handleVerReseñas = async (id) => {
    if (mostrarReseñas === id) {
      setMostrarReseñas(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/books/${id}/reviews`);
      setReseñas({
        ...reseñas,
        [id]: response.data, 
      });
      setMostrarReseñas(id); 
    } catch (error) {
      console.error('Error al obtener las reseñas:', error);
    }
  };

  return (
    <div className="my-books">
      <h2>Mis Libros</h2>
      
      <Link to="/manage-books">
        <button className="back-button">Volver</button>
      </Link>
      
      <p>¿Deseas agregar un nuevo libro? Puedes hacerlo con un simple click.</p>
      
      {!mostrarFormulario ? (
        <button onClick={() => setMostrarFormulario(true)}>
          Quiero agregar un nuevo libro
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input type="text" name="titulo" placeholder="Título" value={nuevoLibro.titulo} onChange={handleChange} required />
            <input type="text" name="autor" placeholder="Autor" value={nuevoLibro.autor} onChange={handleChange} required />
            <input type="text" name="genero" placeholder="Género" value={nuevoLibro.genero} onChange={handleChange} />
            <select name="estado" value={nuevoLibro.estado} onChange={handleChange}>
              <option value="por leer">Por leer</option>
              <option value="leído">Leído</option>
              <option value="favoritos">Favoritos</option>
              <option value="abandonado">Abandonado</option>
            </select>
            <button type="submit">Agregar Libro</button>
            <button type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </form>
        </>
      )}

      <ul>
        {libros.map(libro => (
          <li key={libro.id}>
            {libro.titulo} - {libro.autor}
            <Link to={`/edit-book/${libro.id}`}>
              <button>Editar</button>
            </Link>
            <Link to={`/book-detail/${libro.id}`}>
              <button>Ver Detalles</button>
            </Link>
            <button onClick={() => handleVerReseñas(libro.id)}>
              {mostrarReseñas === libro.id ? 'Ocultar Reseñas' : 'Ver Reseñas'}
            </button>
            <button onClick={() => handleDelete(libro.id)}>
              Eliminar
            </button>

            {mostrarReseñas === libro.id && (
              <div className="reseñas-listado">
                {reseñas[libro.id]?.length > 0 ? (
                  <ul>
                    {reseñas[libro.id].map((reseña) => (
                      <li key={reseña.id}>
                        <p><strong>Puntuación:</strong> {reseña.puntuacion}</p>
                        <p><strong>Reseña:</strong> {reseña.contenido}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay reseñas para este libro.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBooks;
