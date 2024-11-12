const sequelize = require('../database'); 
const Libro = require('./Book'); 
const Reseña = require('./Review'); 
const Recomendacion = require('./Recommendation'); 
const Usuario = require('./User'); 
const Autor = require('./Author'); 
const Coleccion = require('./Collection'); 
const HistorialLectura = require('./Reading-History'); 

Libro.hasMany(Reseña, { foreignKey: 'libroId' });
Reseña.belongsTo(Libro, { foreignKey: 'libroId' });

Libro.hasMany(Recomendacion, { foreignKey: 'libroId' });
Recomendacion.belongsTo(Libro, { foreignKey: 'libroId' });

Libro.hasMany(HistorialLectura, { foreignKey: 'libroId' });
HistorialLectura.belongsTo(Libro, { foreignKey: 'libroId' });

Coleccion.hasMany(Libro, { foreignKey: 'idColeccion', allowNull: true });
Libro.belongsTo(Coleccion, { foreignKey: 'idColeccion', allowNull: true });

module.exports = {
  sequelize,
  Libro,
  Reseña,
  Recomendacion,
  Usuario,
  Autor,
  Coleccion,
  HistorialLectura,
};
