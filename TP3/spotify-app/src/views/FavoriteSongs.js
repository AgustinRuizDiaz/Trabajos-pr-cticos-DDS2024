import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavoriteSongs = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
      const validSongs = storedFavorites.filter(song => 
        song && song.name && song.artist && song.artist.name && song.album && song.album.name && song.album.id
      );
      setFavoriteSongs(validSongs);
    };

    loadFavoriteSongs();
  }, []);

  const handleSongClick = (albumId) => {
    if (albumId) {
      navigate(`/album/${albumId}`);
    } else {
      console.error('ID de álbum inválido');
    }
  };

  return (
    <div className="favorite-songs fade-in">
      <button onClick={() => navigate('/')} className="back-button">Volver a la búsqueda</button>
      <h2>Canciones Favoritas</h2>
      {favoriteSongs.length > 0 ? (
        <ul className="favorite-songs-list fade-in">
          {favoriteSongs.map((song) => (
            <li key={song.id} onClick={() => handleSongClick(song.album.id)} className="favorite-song-item">
              <span className="song-name">{song.name}</span>
              <span className="artist-name">{song.artist.name}</span>
              <span className="album-name">{song.album.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes canciones favoritas aún.</p>
      )}
    </div>
  );
}

export default FavoriteSongs;