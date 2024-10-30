const HistorialLectura = require('../models/Reading-History');

exports.crearHistorial = async (req, res) => {
    try {
        const nuevoHistorial = await HistorialLectura.create(req.body);
        res.status(201).json(nuevoHistorial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarHistorialPorUsuario = async (req, res) => {
    try {
        const historial = await HistorialLectura.findAll({
            where: { usuarioId: req.params.id }
        });
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editarHistorial = async (req, res) => {
    try {
        const [actualizado] = await HistorialLectura.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const historialActualizado = await HistorialLectura.findByPk(req.params.id);
            res.status(200).json(historialActualizado);
        } else {
            res.status(404).json({ error: 'Historial no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarHistorial = async (req, res) => {
    try {
        const eliminado = await HistorialLectura.destroy({
            where: { id: req.params.id }
        });
        if (eliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Historial no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
