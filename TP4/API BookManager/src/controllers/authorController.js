const Autor = require('../models/Author');

exports.crearAutor = async (req, res) => {
    try {
        const nuevoAutor = await Autor.create(req.body);
        res.status(201).json(nuevoAutor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.mostrarAutores = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarAutor = async (req, res) => {
    try {
        const [actualizado] = await Autor.update(req.body, {
            where: { id: req.params.id }
        });
        if (actualizado) {
            const autorActualizado = await Autor.findByPk(req.params.id);
            res.status(200).json(autorActualizado);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarAutor = async (req, res) => {
    try {
        const eliminado = await Autor.destroy({
            where: { id: req.params.id }
        });
        if (eliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
