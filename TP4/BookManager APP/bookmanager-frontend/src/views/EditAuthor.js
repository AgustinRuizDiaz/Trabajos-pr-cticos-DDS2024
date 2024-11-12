import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditAuthor.css';

function EditAuthor() {
  const { id } = useParams(); 
  const [autor, setAutor] = useState({ nombre: '', biografia: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAutor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/authors/${id}`);
        setAutor(response.data);
      } catch (error) {
        console.error('Error al obtener el autor:', error);
      }
    };

    fetchAutor();
  }, [id]);

  const handleChange = (e) => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      if (autor.nombre) updatedData.nombre = autor.nombre;
      if (autor.biografia) updatedData.biografia = autor.biografia;

      await axios.put(`http://localhost:3000/authors/${id}`, updatedData);
      navigate('/authors'); 
    } catch (error) {
      console.error('Error al actualizar el autor:', error);
    }
  };

  return (
    <div className="edit-author">
      <h2>Editar Autor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={autor.nombre}
          onChange={handleChange}
        />
        <textarea
          name="biografia"
          placeholder="Biografía"
          value={autor.biografia}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Actualizar Autor</button>
        <button type="button" onClick={() => navigate('/authors')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditAuthor;
