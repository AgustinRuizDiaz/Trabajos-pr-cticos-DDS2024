const express = require('express');
const { crearLibro, obtenerLibros, actualizarLibro, eliminarLibro, obtenerLibroPorId, buscarLibroPorTitulo, obtenerReseñasPorLibro } = require('../controllers/bookController');
const router = express.Router();

router.post('/', crearLibro);
router.get('/', obtenerLibros);
router.get('/search', buscarLibroPorTitulo); 
router.put('/:id', actualizarLibro); 
router.delete('/:id', eliminarLibro);
router.get('/:id', obtenerLibroPorId);
router.get('/:id/reviews', obtenerReseñasPorLibro);

module.exports = router;
