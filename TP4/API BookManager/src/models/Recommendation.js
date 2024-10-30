const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Recomendacion = sequelize.define('Recomendacion', {
  libroId: { type: DataTypes.INTEGER, allowNull: false },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  razon: { type: DataTypes.TEXT }
});

module.exports = Recomendacion;
