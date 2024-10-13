import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import getAuthToken from '../api/spotify';

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const token = await getAuthToken();

      const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtist(artistResponse.data);

      const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10, 
        },
      });
      setAlbums(albumsResponse.data.items);

      const favorites = JSON.parse(localStorage.getItem('favoriteArtists') || '[]');
      setIsFavorite(favorites.some(fav => fav.id === id));
    };

    fetchArtistDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteArtists') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem('favoriteArtists', JSON.stringify(newFavorites));
    } else {
      favorites.push({ id: artist.id, name: artist.name, image: artist.images[0]?.url });
      localStorage.setItem('favoriteArtists', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (!artist) return <div>Cargando...</div>;

  return (
    <div className="artist-detail">
      <button onClick={() => navigate('/')} className="back-button">Volver a la búsqueda</button>
      <img src={artist.images[0]?.url} alt={artist.name} />
      <h2>{artist.name}</h2>
      <p>Popularidad: {artist.popularity}</p>
      <button onClick={toggleFavorite} className="favorite-button">
        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>

      <h3>Álbumes</h3>
      <div className="albums-list">
        {albums.map((album) => (
          <div key={album.id} className="album-item" onClick={() => navigate(`/album/${album.id}`)}>
            <img src={album.images[0]?.url} alt={album.name} />
            <p>{album.name}</p>
            <p>{new Date(album.release_date).getFullYear()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistDetail;