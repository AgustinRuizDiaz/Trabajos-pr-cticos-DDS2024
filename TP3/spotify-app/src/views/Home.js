import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import getAuthToken from '../api/spotify';

function Home() {
  const [artists, setArtists] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteArtists') || '[]');
    setFavoriteArtists(favorites);
  }, []);

  const handleSearch = async (searchTerm) => {
    setError(null);
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchTerm,
          type: 'artist',
          limit: 10,
        },
      });

      setArtists(response.data.artists.items);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      if (error.message.includes('No se encontraron credenciales')) {
        navigate('/login');
      } else {
        setError(error.message || 'Ocurrió un error durante la búsqueda. Por favor, intenta de nuevo.');
      }
      setArtists([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtistClick = (id) => {
    navigate(`/artist/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('spotifyClientId');
    localStorage.removeItem('spotifyClientSecret');
    navigate('/login');
  };

  return (
    <div className="container fade-in">
      <header className="main-header">
        <h2>Encuentra Artistas</h2>
        <p>En esta página puedes buscar cualquier artista que quieras y ver sus álbumes, ¡inténtalo!</p>
        <Link to="/favorite-songs" className="favorite-songs-link button">Ver canciones favoritas</Link>
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </header>

      <div className="content-wrapper">
        <div className="search-section">
          <h1>Buscar Artistas</h1>
          <SearchBar onSearch={handleSearch} />
          {isLoading && <p>Cargando...</p>}
          {error && <p className="error-message">{error}</p>}
          <ArtistList artists={artists} onArtistClick={handleArtistClick} />
        </div>
        
        <div className="favorites-section">
          <h2>Artistas Favoritos</h2>
          <ArtistList artists={favoriteArtists} onArtistClick={handleArtistClick} />
        </div>
      </div>
    </div>
  );
}

export default Home;