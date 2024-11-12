const Coleccion = require('../models/Collection');
const Libro = require('../models/Book');  

exports.crearColeccion = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body; 
        const nuevaColeccion = await Coleccion.create({ nombre, descripcion });
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

exports.editarColeccion = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;  
        const [actualizado] = await Coleccion.update(
            { nombre, descripcion },
            {
                where: { id: req.params.id }
            }
        );
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

exports.obtenerColeccionPorId = async (req, res) => {
    try {
        const coleccion = await Coleccion.findByPk(req.params.id);
        if (!coleccion) {
            return res.status(404).json({ error: 'Colección no encontrada' });
        }
        res.status(200).json(coleccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.agregarLibrosAColeccion = async (req, res) => {
    const { coleccionId, librosIds } = req.body;

    try {
        const coleccion = await Coleccion.findByPk(coleccionId);

        if (!coleccion) {
            return res.status(404).json({ error: 'Colección no encontrada' });
        }

       
        const libros = await Libro.findAll({
            where: {
                id: librosIds,
            },
        });

        
        if (libros.length === 0) {
            return res.status(404).json({ error: 'Libros no encontrados' });
        }

        
        await Promise.all(
            libros.map((libro) => {
                return libro.update({ idColeccion: coleccionId });
            })
        );

        res.status(200).json({ message: 'Libros agregados a la colección correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerLibrosDeColeccion = async (req, res) => {
    try {
        const coleccion = await Coleccion.findByPk(req.params.id);

        if (!coleccion) {
            return res.status(404).json({ error: 'Colección no encontrada' });
        }

        const libros = await coleccion.getLibros();  

        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
