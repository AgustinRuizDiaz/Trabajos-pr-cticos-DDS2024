import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BookDetail.css';

function BookDetail() {
  const { id } = useParams(); 
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`); 
        setLibro(response.data);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
        setError('Error al cargar los detalles del libro.');
      }
    };

    fetchLibro();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>; 
  }

  if (!libro) {
    return <div className="loading-message">Cargando...</div>; 
  }

  return (
    <div className="book-detail">
      <h2>{libro.titulo}</h2>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Género:</strong> {libro.genero}</p>
      <p><strong>Estado:</strong> {libro.estado}</p>
      <button onClick={() => navigate(-1)} className="back-button">Volver</button>
    </div>
  );
}

export default BookDetail;
