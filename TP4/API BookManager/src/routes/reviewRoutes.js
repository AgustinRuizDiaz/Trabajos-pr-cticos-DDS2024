const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

router.post('/', ReviewController.createReview); 
router.get('/', ReviewController.getAllReviews); 
router.get('/user/:usuarioId', ReviewController.getReviewsByUser); 
router.put('/:id', ReviewController.updateReview); 
router.delete('/:id', ReviewController.deleteReview); 

module.exports = router;
