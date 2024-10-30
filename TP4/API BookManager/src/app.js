const express = require('express');
const { sequelize } = require('./models'); 
const app = express();
const PORT = process.env.PORT || 3000;
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authorRoutes = require('./routes/authorRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const readingHistoryRoutes = require('./routes/readingHistoryRoutes');
const userRoutes = require('./routes/userRoutes');

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
    console.log('Database connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error('Unable to connect to the database:', error));
