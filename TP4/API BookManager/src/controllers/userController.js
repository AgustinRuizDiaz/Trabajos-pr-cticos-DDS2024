const Usuario = require('../models/User');

exports.crearUsuario = async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    if (!nombre || !email || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado.' });
        }

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contrasena,
        });

        res.status(201).json({ id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
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

exports.iniciarSesion = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario || usuario.contrasena !== contrasena) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

