import express from 'express';
import Moderation from '../models/Moderation.js';

const router = express.Router();

// GET all moderation items
router.get('/', async (req, res) => {
  try {
    const items = await Moderation.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching moderation items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching moderation items',
      error: error.message,
    });
  }
});

// POST add new moderation item
router.post('/', async (req, res) => {
  try {
    const { title, content, priority, status } = req.body;
    const newItem = await Moderation.create({
      title,
      content,
      priority,
      status
    });

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating moderation item:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating moderation item',
      error: error.message,
    });
  }
});

// DELETE moderation item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Moderation.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting moderation item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting moderation item',
      error: error.message,
    });
  }
});

export default router;
