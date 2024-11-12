const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/', recommendationController.crearRecomendacion);
router.put('/:id', recommendationController.editarRecomendacion);
router.delete('/:id', recommendationController.eliminarRecomendacion);
router.get('/', recommendationController.obtenerTodasRecomendaciones);

module.exports = router;
