const Coleccion = require('../models/Collection');

exports.crearColeccion = async (req, res) => {
    try {
        const nuevaColeccion = await Coleccion.create(req.body);
        res.status(201).json(nuevaColeccion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarColecciones = async (req, res) => {
    try {
        const colecciones = await Coleccion.findAll();
        res.status(200).json(colecciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerColeccionesPorUsuario = async (req, res) => {
    try {
        const colecciones = await Coleccion.findAll({
            where: { usuarioId: req.params.id }
        });
        res.status(200).json(colecciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editarColeccion = async (req, res) => {
    try {
        const [actualizado] = await Coleccion.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const coleccionActualizada = await Coleccion.findByPk(req.params.id);
            res.status(200).json(coleccionActualizada);
        } else {
            res.status(404).json({ error: 'Colección no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.borrarColeccion = async (req, res) => {
    try {
        const eliminado = await Coleccion.destroy({
            where: { id: req.params.id }
        });
        if (eliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Colección no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
