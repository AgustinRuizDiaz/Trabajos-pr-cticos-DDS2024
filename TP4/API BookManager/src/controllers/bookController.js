const Libro = require('../models/Book');

async function crearLibro(req, res) {
  const { titulo, autor, genero, estado, puntuacion, reseña } = req.body;
  try {
    const nuevoLibro = await Libro.create({ titulo, autor, genero, estado, puntuacion, reseña });
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerLibros(req, res) {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { crearLibro, obtenerLibros };
