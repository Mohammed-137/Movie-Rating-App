import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieSection = ({ title, movies }) => {
  return (
    <section className="py-6 px-8 max-w-[1536px] mx-auto overflow-hidden">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"></span>
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500">
              Sector: {title.split(' ')[0]}
            </h2>
          </div>
          <h3 className="text-3xl font-display font-black tracking-tight text-white drop-shadow-2xl">
            {title}
          </h3>
        </div>
        
        <Link 
          to="/all-movies" 
          className="glass-button px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase hover:neon-border-cyan transition-all"
        >
          View More
        </Link>
      </div>
      
      <div className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} className="w-[260px] md:w-[300px] snap-start" />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
