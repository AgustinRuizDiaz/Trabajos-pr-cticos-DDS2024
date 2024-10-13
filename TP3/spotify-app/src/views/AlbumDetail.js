import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import getAuthToken from '../api/spotify';

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      const token = await getAuthToken();

      const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlbum(albumResponse.data);

      const storedFavorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
      setFavoriteSongs(storedFavorites);
    };

    fetchAlbumDetails();
  }, [id]);

  const toggleFavorite = (track) => {
    const updatedFavorites = favoriteSongs.some(song => song.id === track.id)
      ? favoriteSongs.filter(song => song.id !== track.id)
      : [...favoriteSongs, { ...track, album: { id: album.id, name: album.name }, artist: album.artists[0] }];

    setFavoriteSongs(updatedFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
  };

  if (!album) return <div>Cargando...</div>;

  return (
    <div className="album-detail">
      <button onClick={() => navigate(-1)} className="back-button">Volver</button>
      <img src={album.images[0]?.url} alt={album.name} className="album-cover" />
      <h2>{album.name}</h2>
      <h3>Artista: {album.artists[0].name}</h3>
      <p>Fecha de lanzamiento: {album.release_date}</p>
      <h4>Canciones:</h4>
      <ol className="track-list">
        {album.tracks.items.map((track) => (
          <li key={track.id}>
            {track.name} - {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
            <button onClick={() => toggleFavorite(track)} className="favorite-song-button">
              {favoriteSongs.some(song => song.id === track.id) ? '❤️' : '🤍'}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AlbumDetail;