import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; 
import '../styles/CreateReview.css';

function CreateReview() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); 
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const { user } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/books');
          setBooks(response.data);
        } catch (error) {
          console.error('Error al obtener los libros:', error);
        }
      };

      fetchBooks();
    }
  }, [user, navigate]);

  const handleBookSelection = (book) => {
    setSelectedBook(book);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedBook) {
      alert('Por favor, selecciona un libro para reseñar.');
      return;
    }
  
    const newReview = {
      libroId: selectedBook.id,
      contenido: review,
      puntuacion: rating,
    };
  
    try {
      await axios.post('http://localhost:3000/reviews', newReview);
      alert('¡Reseña enviada con éxito!');
    } catch (error) {
      console.error('Error al enviar la reseña:', error.response ? error.response.data : error.message);
      alert('Hubo un error al enviar la reseña');
    }
  };

  const handleCancel = () => {
    setReview('');
    setSelectedBook(null);
  };

  return (
    <div className="create-review">
      <h1>Selecciona un libro para reseñar</h1>

      <div className="book-selection">
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                onClick={() => handleBookSelection(book)}
                className={selectedBook && selectedBook.id === book.id ? 'selected' : ''}
              >
                {book.titulo} - {book.autor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes libros en tu colección.</p>
        )}
      </div>

      {selectedBook && (
        <div className="review-form">
          <h2>Reseña para el libro: {selectedBook.titulo}</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Escribe tu reseña..."
              required
            />
            <div className="rating">
              <label>Puntuación: </label>
              <select value={rating} onChange={handleRatingChange}>
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="buttons">
              <button type="submit">Enviar Reseña</button>
              <button type="button" onClick={handleCancel}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <button onClick={() => navigate('/manage-books')} className="back-button">
        Volver
      </button>
    </div>
  );
}

export default CreateReview;
