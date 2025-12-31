import React, { createContext, useState, useContext, useEffect } from 'react';
import { featuredMovie, trendingMovies, newMovies, comingReleaseMovies } from '../data/mockData';

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('movieAppAllMovies');
    if (stored) return JSON.parse(stored);
    
    // Initial data from mockData.js
    const initialMovies = [
      { ...featuredMovie, section: 'Featured' },
      ...trendingMovies.map(m => ({ ...m, section: 'Trending' })),
      ...newMovies.map(m => ({ ...m, section: 'New' })),
      ...comingReleaseMovies.map(m => ({ ...m, section: 'Upcoming' }))
    ];
    return initialMovies;
  });

  useEffect(() => {
    localStorage.setItem('movieAppAllMovies', JSON.stringify(movies));
  }, [movies]);

  // Derived states for existing components
  const featured = movies.find(m => m.section === 'Featured') || movies[0];
  const trending = movies.filter(m => m.section === 'Trending');
  const newReleases = movies.filter(m => m.section === 'New');
  const upcoming = movies.filter(m => m.section === 'Upcoming');

  const addMovie = (movieData) => {
    const newMovie = {
      ...movieData,
      id: Date.now(),
      rating: movieData.rating || 'TBD',
      status: movieData.status || 'fresh'
    };
    setMovies(prev => [...prev, newMovie]);
  };

  const updateMovie = (id, updatedData) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, ...updatedData } : m));
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const toggleSection = (id, section) => {
    setMovies(prev => prev.map(m => {
      if (m.id === id) {
        // If it's featured, we need to ensure only ONE is featured
        if (section === 'Featured') {
          return { ...m, section };
        }
        return { ...m, section };
      }
      if (section === 'Featured' && m.section === 'Featured') {
        return { ...m, section: 'Trending' }; // Move old featured to trending
      }
      return m;
    }));
  };

  const value = {
    movies,
    featured,
    trending,
    newReleases,
    upcoming,
    addMovie,
    updateMovie,
    deleteMovie,
    toggleSection
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
