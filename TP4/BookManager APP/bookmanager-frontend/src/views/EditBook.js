import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditBook.css';

function EditBook() {
  const { id } = useParams(); 
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    estado: 'por leer',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setLibro(response.data);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
      }
    };

    fetchLibro();
  }, [id]);

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/books/${id}`, libro);
      navigate('/my-books'); 
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
    }
  };

  return (
    <div className="edit-book">
      <h2>Editar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={libro.titulo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={libro.autor}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={libro.genero}
          onChange={handleChange}
        />
        <select name="estado" value={libro.estado} onChange={handleChange}>
          <option value="por leer">Por leer</option>
          <option value="leído">Leído</option>
          <option value="favoritos">Favoritos</option>
          <option value="abandonado">Abandonado</option>
        </select>
        <button type="submit">Actualizar Libro</button>
        <button type="button" onClick={() => navigate('/my-books')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditBook;
