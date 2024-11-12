import React, { useState } from 'react';
import axios from 'axios';

function AddBook({ onBookAdded }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    estado: 'por leer', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/books', formData);
      console.log(response.data); 
      onBookAdded(); 
      setFormData({
        titulo: '',
        autor: '',
        genero: '',
        estado: 'por leer',
      }); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Libro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Autor:
          <input type="text" name="autor" value={formData.autor} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Género:
          <input type="text" name="genero" value={formData.genero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Estado:
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="por leer">Por Leer</option>
            <option value="leído">Leído</option>
            <option value="favoritos">Favoritos</option>
            <option value="abandonado">Abandonado</option>
          </select>
        </label>
        <br />
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
}

export default AddBook;
