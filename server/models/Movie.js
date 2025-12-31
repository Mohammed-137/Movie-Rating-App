import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  genre: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  releaseDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  poster: {
    type: String,
  },
  trailer: {
    type: String,
  },
  previewTrailer: {
    type: String,
  },
  premiumTrailer: {
    type: String,
  },
  isPremiumOnly: {
    type: Boolean,
    default: false,
  },
  earlyAccessDate: {
    type: Date,
  },
  cast: {
    type: [String],
    default: [],
  },
  director: {
    type: String,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
  collection: 'movies'
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
