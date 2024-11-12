const Libro = require('../models/Book');
const Reseña = require('../models/Review');
const { Op } = require('sequelize');

async function crearLibro(req, res) {
  const { titulo, autor, genero, estado, idColeccion } = req.body;

  try {
    const nuevoLibro = await Libro.create({
      titulo,
      autor,
      genero,
      estado,
      idColeccion
    });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error('Error al crear el libro:', error);
    res.status(500).json({ error: 'Error al agregar el libro', details: error.message });
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

async function buscarLibroPorTitulo(req, res) {
  const { query } = req.query;
  try {
    const libros = await Libro.findAll({
      where: {
        titulo: {
          [Op.like]: `%${query.toLowerCase()}%`
        }
      }
    });

    if (libros.length > 0) {
      return res.json(libros);
    } else {
      return res.status(404).json({ message: 'No se encontraron libros con ese título' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function actualizarLibro(req, res) {
  const { id } = req.params;
  const { titulo, autor, genero, estado, idColeccion } = req.body;

  try {
    const [updated] = await Libro.update(
      { titulo, autor, genero, estado, idColeccion },
      { where: { id } }
    );

    if (updated) {
      const libroActualizado = await Libro.findOne({ where: { id } });
      return res.status(200).json(libroActualizado);
    }
    throw new Error('Libro no encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function eliminarLibro(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Libro.destroy({
      where: { id }
    });

    if (deleted) {
      return res.status(204).send("Libro eliminado");
    }
    throw new Error('Libro no encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerLibroPorId(req, res) {
  const { id } = req.params;
  try {
    const libro = await Libro.findOne({ where: { id } });
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function obtenerReseñasPorLibro(req, res) {
  const { id } = req.params;  
  try {
    const reseñas = await Reseña.findAll({
      where: { libroId: id },
      attributes: ['id', 'contenido', 'puntuacion', 'libroId']
    });

    if (reseñas.length > 0) {
      return res.json(reseñas);
    } else {
      return res.status(404).json({ message: 'No se encontraron reseñas para este libro' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  crearLibro,
  obtenerLibros,
  buscarLibroPorTitulo,
  actualizarLibro,
  eliminarLibro,
  obtenerLibroPorId,
  obtenerReseñasPorLibro
};
