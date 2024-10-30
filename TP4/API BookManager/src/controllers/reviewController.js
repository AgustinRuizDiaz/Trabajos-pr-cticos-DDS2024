const Reseña = require('../models/Review');
const Usuario = require('../models/User');

exports.createReview = async (req, res) => {
  try {
    const reseña = await Reseña.create(req.body);
    res.status(201).json(reseña);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reseñas = await Reseña.findAll();
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByUser = async (req, res) => {
  const usuarioId = req.params.usuarioId; 

  try {
    const reseñas = await Reseña.findAll({ where: { usuarioId } });
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const reseñaId = req.params.id; 

  try {
    const [updated] = await Reseña.update(req.body, {
      where: { id: reseñaId },
    });

    if (updated) {
      const updatedReseña = await Reseña.findByPk(reseñaId);
      res.status(200).json(updatedReseña);
    } else {
      res.status(404).json({ message: 'Reseña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const reseñaId = req.params.id; 

  try {
    const deleted = await Reseña.destroy({
      where: { id: reseñaId },
    });

    if (deleted) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: 'Reseña no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
