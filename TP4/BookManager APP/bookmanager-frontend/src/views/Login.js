import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; 
import '../styles/Login.css';

function Login() {
  const { setUserDetails } = useUser(); 
  const [formData, setFormData] = useState({
    email: '',
    contrasena: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', formData);
      console.log(response); 
      
      if (response.status === 200 && response.data.usuario) {
        setUserDetails(response.data.usuario);  
        setSuccess(true);
        setError('');
        navigate('/manage-books'); 
      } else {
        throw new Error('No se recibió información del usuario');
      }
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.error : 'Error al iniciar sesión');
      setSuccess(false);
    }
  };

  const handleNavigateHome = () => {
    navigate('/'); 
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {success && <p>¡Inicio de sesión exitoso!</p>}
      {error && <p>{error}</p>}

      <div className="navigation-buttons">
        <button onClick={handleNavigateHome} className="nav-button">Ir al Home</button>
      </div>
    </div>
  );
}

export default Login;
