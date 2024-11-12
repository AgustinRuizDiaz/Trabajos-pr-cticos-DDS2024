import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageBooks.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from '../contexts/UserContext';

function ManageBooks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useUser();  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`http://localhost:3000/books/search?query=${query}`);
        setSearchResults(response.data);
        setIsSearching(true);
      } catch (error) {
        console.error('Error al buscar libros: ', error);
      }
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleNavigateHome = () => {
    navigate('/'); 
  };

  return (
    <div className="manage-books">
      <header className="header">
        <div className="logo-container">
          <button onClick={handleNavigateHome} className="home-button">Ir al Home</button>
        </div>
        
        <nav className="navigation">
          <Link to="/my-books" className="nav-button">Mis libros</Link>
          <Link to="/authors" className="nav-button">Autores</Link>
          <Link to="/collections" className="nav-button">Mis colecciones</Link>

          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar libros..."
              className="search-bar"
              value={searchQuery}
              onChange={handleSearch}
            />
            {isSearching && searchResults.length > 0 && (
              <div className="search-results">
                <ul>
                  {searchResults.map((book) => (
                    <li key={book.id}>
                      <Link to={`/book-detail/${book.id}`} className="book-link">
                        {book.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      <h1 className="welcome-title">Bienvenido a tu galería de libros</h1>

      <section className="book-sections">
        <div className="recommendation-section">
          <h2>Recomendaciones</h2>
          <p>¿Quieres recomendar un libro? Hazlo aquí:</p>
          <Link to="/recommendation" className="recommendation-link">
            Hacer una recomendación
          </Link>
        </div>

        <div className="review-section">
          <h2>¿Te gustaría reseñar alguno de tus libros y darle una puntuación?</h2>
          <p>Puedes hacerlo aquí:</p>
          <Link to={`/create-review`} className="review-link">
            Hacer una reseña
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ManageBooks;
