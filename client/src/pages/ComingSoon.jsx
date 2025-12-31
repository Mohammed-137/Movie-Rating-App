import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';
import { useMovies } from '../context/MovieContext';

const ComingSoon = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { upcoming } = useMovies();
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredMovies = selectedCategory === 'All' 
    ? upcoming 
    : upcoming.filter(movie => movie.language === selectedCategory);

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      <div className="max-w-[1720px] mx-auto px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6 group">
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            RETURN TO HOME
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-2 h-8 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter">Upcoming Protocols</h1>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Initializing future cinematic data streams</p>
        </div>

        <CategoryFilter onCategoryChange={handleCategoryChange} />

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="glass-panel inline-block p-12 rounded-[3rem]">
              <h2 className="text-3xl font-display font-black text-white mb-4">NO UPCOMING DATA DETECTED</h2>
              <p className="text-gray-500 font-mono tracking-widest">NEXT CYCLE COMMENCING SOON...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
