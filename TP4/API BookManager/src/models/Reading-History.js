const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const HistorialLectura = sequelize.define('HistorialLectura', {
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  libroId: { type: DataTypes.INTEGER, allowNull: false },
  fechaInicio: { type: DataTypes.DATE, allowNull: false },
  fechaFin: { type: DataTypes.DATE }
});

module.exports = HistorialLectura;
