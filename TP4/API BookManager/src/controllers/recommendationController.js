const Recomendacion = require('../models/Recommendation');

exports.crearRecomendacion = async (req, res) => {
    try {
        const nuevaRecomendacion = await Recomendacion.create(req.body);
        res.status(201).json(nuevaRecomendacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.editarRecomendacion = async (req, res) => {
    try {
        const [actualizado] = await Recomendacion.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const recomendacionActualizada = await Recomendacion.findByPk(req.params.id);
            res.status(200).json(recomendacionActualizada);
        } else {
            res.status(404).json({ error: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarRecomendacion = async (req, res) => {
    try {
        const eliminado = await Recomendacion.destroy({
            where: { id: req.params.id }
        });
        if (eliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
