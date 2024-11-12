import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a BookManager</h1>
      <p>Gestiona tu colección de libros de manera fácil y sencilla.</p>
      <div className="button-container">
        <Link to="/register">
          <button className="home-button">Registrarse</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Iniciar Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
