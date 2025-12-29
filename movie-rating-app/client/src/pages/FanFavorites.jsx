import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { favorites, user } = useAuth();
  
  if (!user) {
    return (
      <div className="bg-dark min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center glass-panel p-12 rounded-[3rem]">
          <h2 className="text-3xl font-display font-black text-white mb-6 uppercase tracking-tighter">SECURE AREA</h2>
          <p className="text-gray-500 mb-8 font-mono">Please Login to view your Favorites</p>
          <Link to="/login" className="bg-primary text-black px-12 py-3 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase tracking-widest text-xs">
            Begin Authorization
          </Link>
        </div>
      </div>
    );
  }

  // Filter by category
  const filteredMovies = selectedCategory === 'All' 
    ? favorites 
    : favorites.filter(movie => movie.language === selectedCategory);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="bg-dark min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1720px] mx-auto px-8 mb-12">
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <span className="text-gray-400">Favorites</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-8 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></span>
              <h1 className="text-5xl font-display font-black tracking-tight text-white uppercase">
                Favorites
              </h1>
            </div>
            <p className="text-gray-400 text-lg ml-6 font-medium">
              Your curated collection of {favorites.length} cinematic masterpieces
            </p>
          </div>
          
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-[1720px] mx-auto px-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="glass-panel inline-block p-12 rounded-[3rem]">
              <h2 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">
                {favorites.length === 0 ? "NO FAVORITES DETECTED" : `NO ${selectedCategory.toUpperCase()} DATA FOUND`}
              </h2>
              <p className="text-gray-500 font-mono tracking-widest mb-8">
                {favorites.length === 0 ? "Start adding movies to your transmission" : "Try selecting a different data sector"}
              </p>
              {favorites.length === 0 && (
                <Link to="/" className="text-primary hover:neon-text-cyan font-bold uppercase text-xs tracking-widest">Explore Movies</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
