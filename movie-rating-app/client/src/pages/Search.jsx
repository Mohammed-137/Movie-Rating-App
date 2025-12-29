import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const location = useLocation();
  const { movies: allMovies } = useMovies(); // Use movies from context
  
  // Extract query from URL: /search?q=query
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);

  // Filter movies based on query from URL
  const filteredMovies = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchLower = query.toLowerCase();
    
    // Use a Set to track unique IDs to avoid duplicates
    const seenIds = new Set();
    const results = [];

    allMovies.forEach(movie => {
      if (seenIds.has(movie.id)) return;
      
      const titleMatch = movie.title.toLowerCase().includes(searchLower);
      const descMatch = movie.description?.toLowerCase().includes(searchLower);
      const langMatch = movie.language?.toLowerCase().includes(searchLower);

      if (titleMatch || descMatch || langMatch) {
         seenIds.add(movie.id);
         results.push(movie);
      }
    });

    return results;
  }, [query]);

  return (
    <div className="bg-dark min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1720px] mx-auto px-8 py-4">
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-white">Search</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-[1720px] mx-auto px-8 py-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-1 h-12 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,255,0.5)]"></div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">Results for "{query}"</h1>
        </div>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest ml-1">
          Transmission detected: {filteredMovies.length} segments identified
        </p>
      </div>

      {/* Results Grid */}
      <div className="max-w-[1720px] mx-auto px-8 py-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 glass-panel max-w-2xl mx-auto rounded-[3rem] border-white/5">
            <h2 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tighter">
              {query.trim() ? `Search failure: No data matching "${query}"` : "Input required: Please specify search parameters"}
            </h2>
            <Link to="/" className="text-primary font-bold text-xs uppercase tracking-[0.2em] hover:neon-text-cyan transition-all">Return to base station</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
