const express = require('express');
const { crearLibro, obtenerLibros } = require('../controllers/bookController');
const router = express.Router();

router.post('/', crearLibro);
router.get('/', obtenerLibros);

module.exports = router;
