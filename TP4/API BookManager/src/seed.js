const sequelize = require('./database');
const Usuario = require('./models/User');
const Autor = require('./models/Author');
const Libro = require('./models/Book');
const Reseña = require('./models/Review');
const Recomendacion = require('./models/Recommendation');
const Coleccion = require('./models/Collection');
const HistorialLectura = require('./models/Reading-History');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const usuario1 = await Usuario.create({
      nombre: 'Juan Perez',
      email: 'juan@example.com',
      contrasena: 'password123',
      fechaRegistro: new Date(),
    });

    const usuario2 = await Usuario.create({
      nombre: 'Maria Lopez',
      email: 'maria@example.com',
      contrasena: 'mypassword',
      fechaRegistro: new Date(),
    });

    const autor1 = await Autor.create({
      nombre: 'Gabriel García Márquez',
      biografia: 'Un famoso autor colombiano.',
    });

    const autor2 = await Autor.create({
      nombre: 'Julio Cortázar',
      biografia: 'Escritor argentino, conocido por su novela "Rayuela".',
    });

    const libro1 = await Libro.create({
      titulo: 'Cien años de soledad',
      autor: autor1.nombre,
      genero: 'Ficción',
      estado: 'leído',
      puntuacion: 5,
      reseña: 'Una obra maestra de la literatura.',
    });

    const libro2 = await Libro.create({
      titulo: 'Rayuela',
      autor: autor2.nombre,
      genero: 'Ficción',
      estado: 'por leer',
      puntuacion: null,
      reseña: null,
    });

    const coleccion1 = await Coleccion.create({
      nombre: 'Mis Lecturas',
      usuarioId: usuario1.id,
    });

    const reseña1 = await Reseña.create({
      contenido: 'Una historia fascinante que atrapa desde el principio.',
      puntuacion: 5,
      usuarioId: usuario1.id,
      libroId: libro1.id,
    });

    const recomendacion1 = await Recomendacion.create({
      libroId: libro1.id,
      usuarioId: usuario2.id,
      razon: 'Es un clásico de la literatura que no te puedes perder.',
    });

    const historial1 = await HistorialLectura.create({
      usuarioId: usuario1.id,
      libroId: libro1.id,
      fechaInicio: new Date('2024-01-01'),
      fechaFin: new Date('2024-01-10'),
    });

    console.log('Datos sembrados correctamente');
  } catch (error) {
    console.error('Error al sembrar los datos:', error);
  }
};

seed();
