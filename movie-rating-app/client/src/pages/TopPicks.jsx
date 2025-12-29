import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';
import { useMovies } from '../context/MovieContext';

const TopPicks = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { trending, upcoming } = useMovies();
  
  // Combine trending and coming release movies for Top Picks
  const allTopPicks = [...trending, ...upcoming];
  
  // Filter by category
  const filteredMovies = selectedCategory === 'All' 
    ? allTopPicks 
    : allTopPicks.filter(movie => movie.language === selectedCategory);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="bg-imdb-black min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-imdb-yellow transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-bold">Top Picks</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-12 bg-imdb-yellow rounded-sm"></div>
          <h1 className="text-4xl font-bold text-white">Top Picks</h1>
        </div>
        <p className="text-gray-400 ml-8">
          Discover our curated selection of trending and upcoming movies
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter onCategoryChange={handleCategoryChange} />

      {/* Movies Grid */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">
              No {selectedCategory} movies found
            </h2>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPicks;
