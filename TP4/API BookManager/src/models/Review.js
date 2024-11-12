const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reseña = sequelize.define('Reseña', {
  contenido: { type: DataTypes.TEXT, allowNull: false },
  puntuacion: { type: DataTypes.INTEGER, allowNull: false },
  libroId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Reseña;
