const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Coleccion = sequelize.define('Coleccion', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Coleccion;
