import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import getAuthToken from '../api/spotify';

function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

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
    };

    fetchArtistDetails();
  }, [id]);

  if (!artist) return <div>Cargando...</div>;

  return (
    <div className="artist-detail">
      <img src={artist.images[0]?.url} alt={artist.name} />
      <h2>{artist.name}</h2>
      <p>Popularidad: {artist.popularity}</p>

      <h3>Álbumes</h3>
      <div className="albums-list">
        {albums.map((album) => (
          <div key={album.id} className="album-item">
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
