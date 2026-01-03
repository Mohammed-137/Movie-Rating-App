import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
});

// POST upgrade subscription
router.post('/upgrade', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { subscriptionTier: 'premium' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Subscription upgraded to Premium',
      data: user,
    });
  } catch (error) {
    console.error('Error upgrading user:', error);
    res.status(500).json({
      success: false,
      message: 'Error upgrading user',
      error: error.message,
    });
  }
});

// PUT update user status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: `User status updated to ${status}`,
      data: user,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message,
    });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
});

// PUT update user details
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
});

// POST toggle favorite
router.post('/:id/favorites', async (req, res) => {
  try {
    const { movie } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isFav = user.favorites.some(m => String(m.id) === String(movie.id));
    if (isFav) {
      user.favorites = user.favorites.filter(m => String(m.id) !== String(movie.id));
    } else {
      user.favorites.push(movie);
    }

    await user.save();
    res.json({ success: true, data: user.favorites });
  } catch (error) {
    console.error('Error updating favorites:', error.stack || error);
    res.status(500).json({ success: false, message: 'Error updating favorites', error: error.message });
  }
});

// POST toggle watch later
router.post('/:id/watchLater', async (req, res) => {
  try {
    const { movie } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isListed = user.watchLater.some(m => String(m.id) === String(movie.id));
    if (isListed) {
      user.watchLater = user.watchLater.filter(m => String(m.id) !== String(movie.id));
    } else {
      user.watchLater.push(movie);
    }

    await user.save();
    res.json({ success: true, data: user.watchLater });
  } catch (error) {
    console.error('Error updating watch list:', error.stack || error);
    res.status(500).json({ success: false, message: 'Error updating watch list', error: error.message });
  }
});

export default router;
