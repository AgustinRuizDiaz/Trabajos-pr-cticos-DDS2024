import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css'; 
import { useUser } from '../contexts/UserContext'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const { setUserDetails } = useUser(); 
  const [formData, setFormData] = useState({
    nombre: '',
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
      const response = await axios.post('http://localhost:3000/users', formData); 
      if (response.status === 201) {
        setSuccess(true);
        setError('');
        
        setUserDetails(response.data); 
      }
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error al registrar el usuario');
      setSuccess(false);
    }
  };

  const handleNavigateHome = () => {
    navigate('/'); 
  };

  const handleNavigateLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <br />
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
        <button type="submit">Registrarse</button>
      </form>
      {success && <p className="success">¡Registro exitoso!</p>}
      {error && <p className="error">{error}</p>}

      <div className="navigation-buttons">
        <button onClick={handleNavigateHome} className="nav-button">Ir al Home</button>
        <button onClick={handleNavigateLogin} className="nav-button">Ir al Login</button>
      </div>
    </div>
  );
}

export default Register;
