import axios from 'axios';

const getAuthToken = async () => {
  const clientId = localStorage.getItem('spotifyClientId');
  const clientSecret = localStorage.getItem('spotifyClientSecret');

  if (!clientId || !clientSecret) {
    throw new Error('No se encontraron credenciales de Spotify. Por favor, inicia sesión.');
  }

  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    };
    const data = 'grant_type=client_credentials';

    const response = await axios.post(tokenUrl, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Error al obtener el token de autenticación:', error);
    throw new Error('No se pudo obtener el token de autenticación. Por favor, verifica tus credenciales e intenta de nuevo.');
  }
};

export default getAuthToken;