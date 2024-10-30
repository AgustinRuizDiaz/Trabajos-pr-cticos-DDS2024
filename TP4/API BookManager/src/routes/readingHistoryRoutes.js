const express = require('express');
const router = express.Router();
const readingHistoryController = require('../controllers/readingHistoryController');

router.post('/', readingHistoryController.crearHistorial);
router.get('/user/:id', readingHistoryController.listarHistorialPorUsuario);
router.put('/:id', readingHistoryController.editarHistorial);
router.delete('/:id', readingHistoryController.eliminarHistorial);

module.exports = router;
