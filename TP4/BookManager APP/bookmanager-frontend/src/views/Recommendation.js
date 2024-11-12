import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Recommendation.css';

function Recommendation() {
  const [libros, setLibros] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [selectedLibroId, setSelectedLibroId] = useState('');
  const [razon, setRazon] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setLibros(response.data);
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    };

    fetchLibros();
  }, []);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recommendations');
        setRecomendaciones(response.data);
      } catch (error) {
        console.error('Error al cargar las recomendaciones:', error);
      }
    };

    fetchRecomendaciones();
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/recommendations', {
        libroId: selectedLibroId,
        razon,
        usuarioId: 1,
      });

      setSuccessMessage('¡Recomendación agregada con éxito!');
      setSelectedLibroId('');
      setRazon('');
    } catch (error) {
      console.error('Error al agregar la recomendación:', error);
    }
  };

  return (
    <div className="recommendation-container">
      <h1>Recomendar un Libro</h1>
      <p>Selecciona un libro de tu colección y escribe una breve recomendación.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="libro">Libro:</label>
        <select
          id="libro"
          value={selectedLibroId}
          onChange={(e) => setSelectedLibroId(e.target.value)}
          required
        >
          <option value="">Seleccione un libro</option>
          {libros.map((libro) => (
            <option key={libro.id} value={libro.id}>
              {libro.titulo}
            </option>
          ))}
        </select>

        <label htmlFor="razon">Razón de la Recomendación:</label>
        <textarea
          id="razon"
          value={razon}
          onChange={(e) => setRazon(e.target.value)}
          placeholder="Escribe tu recomendación aquí..."
          required
        ></textarea>

        <button type="submit">Agregar Recomendación</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <h2>Recomendaciones</h2>
      <ul>
        {recomendaciones.map((recomendacion, index) => (
          <li key={index}>
            <strong>Libro:</strong> {recomendacion.libro}
            <br />
            <strong>Recomendación:</strong> {recomendacion.razon}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/manage-books')}>Volver</button>
    </div>
  );
}

export default Recommendation;
