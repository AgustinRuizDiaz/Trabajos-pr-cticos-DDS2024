const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Autor = sequelize.define('Autor', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  biografia: { type: DataTypes.TEXT }
});

module.exports = Autor;
