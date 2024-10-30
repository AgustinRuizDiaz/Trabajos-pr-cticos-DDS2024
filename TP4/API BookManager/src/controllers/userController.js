const Usuario = require('../models/User');

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editarUsuario = async (req, res) => {
    try {
        const [actualizado] = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const usuarioActualizado = await Usuario.findByPk(req.params.id);
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const eliminado = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (eliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
