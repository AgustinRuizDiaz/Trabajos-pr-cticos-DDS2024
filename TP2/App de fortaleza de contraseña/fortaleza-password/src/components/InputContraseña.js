import React from 'react';

const InputContraseña = ({ contraseña, onChange, onToggleVisibility, esVisible, onCopy }) => {
  return (
    <div className="input-container">
      <input
        type={esVisible ? 'text' : 'password'}
        value={contraseña}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
      />
      <div className="boton-ocultar-copiar">
        <button onClick={onToggleVisibility}>
          {esVisible ? 'Ocultar' : 'Mostrar'}
        </button>
        <button onClick={onCopy}>
          Copiar
        </button>
      </div>
    </div>
  );
};

export default InputContraseña;
