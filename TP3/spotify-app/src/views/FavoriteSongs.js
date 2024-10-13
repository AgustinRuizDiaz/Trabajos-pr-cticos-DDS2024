import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
    setFavoriteSongs(storedFavorites);
  }, []);

  return (
    <div className="favorite-songs fade-in">
      <button onClick={() => navigate('/')} className="back-button">Volver a la búsqueda</button>
      <h2>Canciones Favoritas</h2>
      <ul className="favorite-songs-list fade-in">
        {favoriteSongs.map((song) => (
          <li key={song.id} onClick={() => navigate(`/album/${song.album.id}`)} className="favorite-song-item">
            <span className="song-name">{song.name}</span>
            <span className="artist-name">{song.artist.name}</span>
            <span className="album-name">{song.album.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteSongs;