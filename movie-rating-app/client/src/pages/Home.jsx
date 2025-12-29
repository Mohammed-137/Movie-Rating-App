import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieSection from '../components/MovieSection';
import CategoryFilter from '../components/CategoryFilter';
import { useMovies } from '../context/MovieContext';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { featured, trending, newReleases, upcoming } = useMovies();
  
  // Filter by category
  const filteredTopPicks = selectedCategory === 'All' 
    ? [...trending, ...upcoming] 
    : [...trending, ...upcoming].filter(movie => movie.language === selectedCategory);
    
  const filteredNew = selectedCategory === 'All' 
    ? newReleases 
    : newReleases.filter(movie => movie.language === selectedCategory);
    
  const filteredUpcoming = selectedCategory === 'All' 
    ? upcoming 
    : upcoming.filter(movie => movie.language === selectedCategory);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="bg-dark min-h-screen">
      <Hero movie={featured} trendingMovies={trending} />
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      
      <div className="space-y-2 pb-32 pt-2">{/* Minimized gap between Hero and Sectors */}
        {filteredTopPicks.length > 0 && (
          <MovieSection 
            title={selectedCategory === 'All' ? 'Top Picks' : `Sector: ${selectedCategory}`} 
            movies={filteredTopPicks}
            route="/top-picks"
          />
        )}
        {filteredNew.length > 0 && (
          <MovieSection 
            title={selectedCategory === 'All' ? 'Adventure Movies' : `Adventure - ${selectedCategory}`} 
            movies={filteredNew}
            route="/adventure-movies"
          />
        )}
        {filteredUpcoming.length > 0 && (
          <MovieSection 
            title={selectedCategory === 'All' ? 'Next Releases' : `Next - ${selectedCategory}`} 
            movies={filteredUpcoming}
            route="/coming-soon"
          />
        )}
        {selectedCategory !== 'All' && filteredTopPicks.length === 0 && filteredNew.length === 0 && filteredUpcoming.length === 0 && (
          <div className="text-center py-40">
            <h2 className="text-4xl font-display font-black text-white mb-4 animate-vault-open">TRANSMISSION LOST</h2>
            <p className="text-primary/50 font-mono tracking-widest">NO DATA FOUND FOR CATEGORY: {selectedCategory.toUpperCase()}</p>
          </div>
        )}
      </div>

      {/* CINEMORA Sign Up Section */}
      <section className="max-w-[1536px] mx-auto pb-32 px-8">
        <div className="glass-panel p-16 rounded-[4rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary-magenta/5"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
             <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-12 h-1 bg-primary rounded-full"></span>
                <span className="text-xs font-bold text-primary tracking-[0.5em] uppercase">Join Our Community</span>
                <span className="w-12 h-1 bg-primary rounded-full"></span>
             </div>
             
             <h2 className="text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">Start Your Journey</h2>
             <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
               Sign up with CINEMORA to create your watchlist, rate movies, and get personalized recommendations.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input 
                  type="email" 
                  placeholder='Enter Your Email' 
                  className='w-full sm:w-80 glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600' 
                />
                <Link to="/login" className="bg-neon-yellow text-black font-display font-black px-12 py-4 rounded-2xl shadow-[0_0_30px_rgba(245,197,24,0.3)] hover:shadow-[0_0_50px_rgba(245,197,24,0.5)] hover:scale-[1.05] transition-all tracking-[0.2em] text-xs">
                  GET STARTED
                </Link>
             </div>

             <div className="mt-8 flex justify-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 bg-primary rounded-full"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest">Privacy Protected</span>
                </div>
             </div>
          </div>
          
          {/* Animated Background Decoration */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-magenta/5 rounded-full blur-[100px] group-hover:bg-primary-magenta/10 transition-all duration-1000"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
