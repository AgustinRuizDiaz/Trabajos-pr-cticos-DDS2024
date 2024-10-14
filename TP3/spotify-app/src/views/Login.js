import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedClientId = localStorage.getItem('spotifyClientId');
    const storedClientSecret = localStorage.getItem('spotifyClientSecret');
    if (storedClientId && storedClientSecret) {
      setClientId(storedClientId);
      setClientSecret(storedClientSecret);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientId && clientSecret) {
      localStorage.setItem('spotifyClientId', clientId);
      localStorage.setItem('spotifyClientSecret', clientSecret);
      navigate('/');
    } else {
      setError('Por favor, ingresa tanto el Client ID como el Client Secret.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión en Spotify API</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientId">Client ID:</label>
          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="clientSecret">Client Secret:</label>
          <input
            type="password"
            id="clientSecret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;