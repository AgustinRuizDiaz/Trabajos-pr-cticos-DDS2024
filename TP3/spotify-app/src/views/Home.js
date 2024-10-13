import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import getAuthToken from '../api/spotify';

function Home() {
  const [artists, setArtists] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteArtists') || '[]');
    setFavoriteArtists(favorites);
  }, []);

  const handleSearch = async (searchTerm) => {
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
  };

  const handleArtistClick = (id) => {
    navigate(`/artist/${id}`);
  };

  return (
    <div className="container">
      <header className="main-header">
        <h2>Encuentra Artistas</h2>
        <p>En esta página puedes buscar cualquier artista que quieras y ver sus álbumes, ¡inténtalo!</p>
      </header>

      <div className="content-wrapper">
        <div className="search-section">
          <h1>Buscar Artistas</h1>
          <SearchBar onSearch={handleSearch} />
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