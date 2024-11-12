const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,   
    autoIncrement: true, 
  },
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  genero: { type: DataTypes.STRING },
  estado: { 
    type: DataTypes.ENUM('leído', 'por leer', 'favoritos', 'abandonado'), 
    defaultValue: 'por leer' 
  },
  idColeccion: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'Colecciones', 
      key: 'id',
    },
  }
}, {
  tableName: 'libros' 
});

module.exports = Libro;
