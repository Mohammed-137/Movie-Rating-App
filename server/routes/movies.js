import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: error.message,
    });
  }
});

// GET single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('reviews.user', 'name email');
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    res.json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message,
    });
  }
});

// GET movies by category
router.get('/category/:category', async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movies by category',
      error: error.message,
    });
  }
});

// GET movies by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    res.json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching movies by genre',
      error: error.message,
    });
  }
});

export default router;
