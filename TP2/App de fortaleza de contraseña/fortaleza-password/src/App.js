import React, { useState } from 'react';
import InputContraseña from './components/InputContraseña';
import FortalezaContraseña from './components/FortalezaContraseña';
import './App.css';

const App = () => {
  const [contraseña, setContraseña] = useState('');
  const [esVisible, setEsVisible] = useState(false);

  const manejarCambioContraseña = (event) => {
    setContraseña(event.target.value);
  };

  const alternarVisibilidad = () => {
    setEsVisible(!esVisible);
  };

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(contraseña)
      .then(() => alert('Contraseña copiada al portapapeles'))
      .catch(err => alert('Error al copiar al portapapeles: ', err));
  };

  const generarContraseñaAleatoria = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contraseñaGenerada = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      contraseñaGenerada += caracteres[randomIndex];
    }
    setContraseña(contraseñaGenerada);
  };

  const calcularFortaleza = (contraseña) => {
    const tieneLetrasMayusculas = /[A-Z]/.test(contraseña);
    const tieneLetrasMinusculas = /[a-z]/.test(contraseña);
    const tieneNumeros = /[0-9]/.test(contraseña);

    if (contraseña.length > 10) return 'Segura';
    if (tieneLetrasMayusculas && tieneLetrasMinusculas && tieneNumeros && contraseña.length > 6) return 'Muy segura';
    if ((tieneLetrasMayusculas || tieneLetrasMinusculas) && tieneNumeros) return 'Segura';
    if ((tieneLetrasMayusculas || tieneLetrasMinusculas) && contraseña.length > 6) return 'Segura';
    return 'Poco segura';
  };

  return (
    <div className="app-container">
      <h1>Evaluador de Contraseña</h1>
      <InputContraseña
        contraseña={contraseña}
        onChange={manejarCambioContraseña}
        onToggleVisibility={alternarVisibilidad}
        esVisible={esVisible}
        onCopy={copiarAlPortapapeles}
      />
      <button onClick={generarContraseñaAleatoria}>Generar Contraseña Aleatoria</button>
      <FortalezaContraseña fortaleza={calcularFortaleza(contraseña)} />
    </div>
  );
};

export default App;
