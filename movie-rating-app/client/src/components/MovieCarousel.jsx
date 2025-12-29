import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const MovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused || !movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, movies, currentIndex]);

  if (!movies || movies.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const currentMovie = movies[currentIndex];

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel Display */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/40 backdrop-blur-sm">
        {/* Movie Backdrop */}
        <div className="relative aspect-video w-full">
          <img
            src={currentMovie.backdrop || currentMovie.poster}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
                  {currentMovie.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2 max-w-2xl mb-4">
                  {currentMovie.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-primary text-sm font-bold">{currentMovie.rating}/10</span>
                  <span className="text-gray-400 text-sm">{currentMovie.language}</span>
                </div>
              </div>
              
              {/* Play Button */}
              <Link
                to={`/movie/${currentMovie.id}`}
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
              >
                <Play size={20} fill="currentColor" />
                <span>Watch Now</span>
              </Link>
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-bold">
            2:49
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous movie"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next movie"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
