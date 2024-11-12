const Reseña = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const { libroId, contenido, puntuacion } = req.body;

    if (!libroId || !contenido || !puntuacion) {
      return res.status(400).json({ error: "Todos los campos son requeridos." });
    }

    const nuevaReseña = await Reseña.create({
      libroId,       
      contenido,     
      puntuacion,   
    });

    res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error(error);  
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
