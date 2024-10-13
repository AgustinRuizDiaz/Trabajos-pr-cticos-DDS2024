import axios from 'axios';

const clientId = '2ebd25e9eb364190aad5c0cdeb6e3dc1';
const clientSecret = 'c45a0165c7574535b63cca5c306499f0';

const getAuthToken = async () => {
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
