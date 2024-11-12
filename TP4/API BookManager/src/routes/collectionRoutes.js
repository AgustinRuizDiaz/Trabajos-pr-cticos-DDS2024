const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.post('/', collectionController.crearColeccion);
router.get('/', collectionController.listarColecciones);
router.put('/:id', collectionController.editarColeccion);
router.delete('/:id', collectionController.borrarColeccion);
router.get('/:id', collectionController.obtenerColeccionPorId);
router.post('/agregarLibros', collectionController.agregarLibrosAColeccion);
router.get('/:id/books', collectionController.obtenerLibrosDeColeccion);


module.exports = router;
