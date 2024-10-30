const sequelize = require('../database'); 
const Libro = require('./Book'); 
const Reseña = require('./Review'); 
const Recomendacion = require('./Recommendation'); 
const Usuario = require('./User'); 
const Autor = require('./Author'); 
const Coleccion = require('./Collection'); 
const HistorialLectura = require('./Reading-History'); 

Usuario.hasMany(Reseña, { foreignKey: 'usuarioId' });
Reseña.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Recomendacion, { foreignKey: 'usuarioId' });
Recomendacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Coleccion, { foreignKey: 'usuarioId' });
Coleccion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Libro.hasMany(Reseña, { foreignKey: 'libroId' });
Reseña.belongsTo(Libro, { foreignKey: 'libroId' });

Libro.hasMany(Recomendacion, { foreignKey: 'libroId' });
Recomendacion.belongsTo(Libro, { foreignKey: 'libroId' });

Libro.hasMany(HistorialLectura, { foreignKey: 'libroId' });
HistorialLectura.belongsTo(Libro, { foreignKey: 'libroId' });

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
