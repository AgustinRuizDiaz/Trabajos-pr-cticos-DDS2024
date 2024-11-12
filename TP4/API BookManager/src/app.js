const express = require('express');
const { sequelize } = require('./models'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authorRoutes = require('./routes/authorRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const readingHistoryRoutes = require('./routes/readingHistoryRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/authors', authorRoutes);
app.use('/collections', collectionRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/reading-history', readingHistoryRoutes);
app.use('/users', userRoutes);

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(error => {
    console.error('No se pudo sincronizar la base de datos:', error);
  });