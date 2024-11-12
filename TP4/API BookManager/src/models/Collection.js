const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Coleccion = sequelize.define('Coleccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'colecciones' 
});

module.exports = Coleccion;
