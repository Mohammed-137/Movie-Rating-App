import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/AuthContext';

const WatchLater = () => {
  const { watchLater, user } = useAuth();
  
  if (!user) {
    return (
      <div className="bg-imdb-black min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login to view your Watch List</h2>
          <Link to="/login" className="bg-imdb-yellow text-black px-6 py-2 rounded font-bold hover:bg-yellow-400">
            Login
          </Link>
        </div>
      </div>
    );
  }

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
          <span className="text-white font-bold">Watch Later</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-12 bg-imdb-yellow rounded-sm"></div>
          <h1 className="text-4xl font-bold text-white">Your Watch List</h1>
        </div>
        <p className="text-gray-400 ml-8">
          Movies you saved to watch later
        </p>
      </div>

      {/* Movies Grid */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {watchLater.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchLater.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your watch list is empty
            </h2>
            <Link to="/" className="text-imdb-blue hover:underline">Browse movies to add</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLater;
