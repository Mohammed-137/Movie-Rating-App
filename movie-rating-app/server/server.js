import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import initAdmin from './utils/initAdmin.js';
import userRoutes from './routes/users.js';
import movieRoutes from './routes/movies.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  initAdmin();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🎬 Movie Rating API Server',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      movies: '/api/movies',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 API available at http://localhost:${PORT}`);
    console.log(`📱 Client URL: ${process.env.CLIENT_URL}`);
  });
}

export default app;
