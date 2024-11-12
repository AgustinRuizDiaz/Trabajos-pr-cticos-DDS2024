const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.crearUsuario);
router.put('/:id', userController.editarUsuario);
router.delete('/:id', userController.eliminarUsuario);
router.post('/login', userController.iniciarSesion);

module.exports = router;
