import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Plus, Info } from 'lucide-react';

const Hero = ({ movie, trendingMovies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Combine featured movie with trending movies for a complete hero list
  const heroMovies = [movie, ...trendingMovies];

  useEffect(() => {
    if (isPaused || heroMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, heroMovies.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroMovies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
  };

  const currentMovie = heroMovies[currentIndex];
  // Get the next 3 movies for the "Up next" section
  const upNextMovies = [
    heroMovies[(currentIndex + 1) % heroMovies.length],
    heroMovies[(currentIndex + 2) % heroMovies.length],
    heroMovies[(currentIndex + 3) % heroMovies.length],
  ];

  return (
    <div className="relative w-full max-w-[1536px] mx-auto pt-20 px-8 flex flex-col lg:flex-row items-stretch gap-4 mb-4">
      {/* Main Slider Area (Left 2/3) - Height matched to sidebar */}
      <div 
        className="relative flex-[2] aspect-video lg:aspect-auto lg:h-[580px] rounded-xl overflow-hidden group border border-white/10 shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <img 
          src={currentMovie.backdrop || currentMovie.poster} 
          alt={currentMovie.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/20 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-8 flex items-end gap-6 w-full">
          {/* Movie Poster (Small overlay) */}
          <div className="hidden md:block w-32 aspect-[2/3] rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl relative translate-y-6">
            <img src={currentMovie.poster} alt="" className="w-full h-full object-cover" />
            <button className="absolute top-0 left-0 p-1.5 bg-black/60 hover:bg-black/80 transition-colors rounded-br-lg">
              <Plus size={18} className="text-white" />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-10">
              {/* Play Button Icon */}
              <Link 
                to={`/movie/${currentMovie.id}`}
                className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-white text-white hover:bg-white hover:text-black transition-all group/play"
              >
                <Play size={40} fill="currentColor" strokeWidth={1} className="ml-1" />
              </Link>

              <div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-2 uppercase tracking-tight">
                  {currentMovie.title}
                </h1>
                <div className="flex items-center gap-4">
                   <span className="text-sm font-bold text-gray-400">Watch Now</span>
                   <span className="text-sm font-mono text-gray-500">2:49</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center bg-black/20 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all border-r border-white/10"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center bg-black/20 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all border-l border-white/10"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Up Next Section (Right 1/3) */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-display font-black text-primary mb-4 uppercase tracking-[0.2em]">Up next</h2>
        <div className="flex flex-col gap-4 flex-1 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 overflow-hidden">
          {upNextMovies.map((m, idx) => (
            <Link 
              key={`${m.id}-${idx}`} 
              to={`/movie/${m.id}`}
              className="group flex gap-4 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors border-b border-white/5 last:border-0 pb-4"
            >
              <div className="relative w-24 aspect-[2/3] flex-shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={24} fill="white" className="text-white scale-150" />
                </div>
              </div>
              <div className="flex-1 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <Play size={14} className="text-primary" />
                  <span className="text-xs font-mono text-gray-400">3:35</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {m.title}
                </h3>
                <div className="flex items-center gap-2">
                   <p className="text-xs text-primary font-bold uppercase tracking-wider">Watch Now</p>
                   <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                   <span className="text-[10px] text-gray-500 font-mono">2025</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 glass-panel rounded-md">
                     <span className="text-[10px]">👍</span>
                     <span className="text-[10px] font-bold text-gray-400">231</span>
                   </div>
                   <div className="flex items-center gap-1.5 px-2 py-0.5 glass-panel rounded-md">
                     <span className="text-[10px] text-pink-500">❤️</span>
                     <span className="text-[10px] font-bold text-gray-400">55</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
          
          <Link to="/top-picks" className="mt-auto pt-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-all group py-2 border border-white/10 rounded-xl hover:border-primary/30">
            BROWSE ALL TRAILERS 
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
