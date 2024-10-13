import axios from 'axios';

const getAuthToken = async () => {
  const clientId = localStorage.getItem('spotifyClientId');
  const clientSecret = localStorage.getItem('spotifyClientSecret');

  if (!clientId || !clientSecret) {
    throw new Error('No se encontraron credenciales de Spotify');
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
  };
  const data = 'grant_type=client_credentials';

  const response = await axios.post(tokenUrl, data, { headers });
  return response.data.access_token;
};

export default getAuthToken;