const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.post('/', collectionController.crearColeccion);
router.get('/', collectionController.listarColecciones);
router.get('/:id', collectionController.obtenerColeccionesPorUsuario);
router.put('/:id', collectionController.editarColeccion);
router.delete('/:id', collectionController.borrarColeccion);

module.exports = router;
