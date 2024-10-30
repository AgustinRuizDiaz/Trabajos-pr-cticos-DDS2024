const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.post('/', authorController.crearAutor);
router.get('/', authorController.mostrarAutores);
router.put('/:id', authorController.actualizarAutor);
router.delete('/:id', authorController.eliminarAutor);

module.exports = router;
