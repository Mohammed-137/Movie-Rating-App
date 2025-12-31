import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Zap } from 'lucide-react';

const MovieCard = ({ movie, className = "" }) => {
  const { user, toggleFavorite, isFavorite, toggleWatchLater, isWatchLater } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(movie);
  };

  const handleWatchLaterClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleWatchLater(movie);
  };

  const isFav = isFavorite(movie.id);
  const isInWatchLater = isWatchLater(movie.id);

  return (
    <div className={`group relative perspective-[1000px] flex-shrink-0 ${className}`}>
      <Link to={`/movie/${movie.id}`} className="block relative aspect-[2/3] rounded-[1.5rem] overflow-hidden border border-white/5 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:rotate-y-6">
        {/* Main Image */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Overlay Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

        {/* Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80"></div>

        {/* Top Actions: Favorite & Premium Badge */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
           {movie.isPremiumOnly ? (
             <div className="bg-black/60 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-2xl">
               <ShieldCheck size={14} className="text-primary" />
               <span className="text-[10px] font-black tracking-[0.1em] text-white">PREMIUM</span>
             </div>
           ) : (
             <div></div>
           )}
           <button 
            onClick={handleFavoriteClick}
            className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:neon-border-cyan transition-all"
           >
             <svg className={`w-5 h-5 ${isFav ? 'text-primary fill-primary shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'text-white/60'}`} fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
           </button>
        </div>

        {/* Content Info */}
        <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-2">
           <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-primary tracking-[0.2em]">RATING</span>
              <div className="h-0.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary shadow-[0_0_8px_rgba(0,242,255,0.6)] transition-all duration-1000 group-hover:w-full" 
                  style={{ width: `${movie.rating.replace('%', '')}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-mono text-white/50">{movie.rating}</span>
           </div>

           <h4 className="text-xl font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors flex items-center gap-2">
             {movie.title}
             {movie.isPremiumOnly && <Zap size={14} className="text-primary-magenta shrink-0" />}
           </h4>

           <div className="flex gap-2 items-center mb-4">
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">HD</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{movie.duration || '2H 30M'}</span>
           </div>

           <div className="flex gap-2 opacity-100 transition-opacity duration-300">
             <button 
              onClick={handleWatchLaterClick}
              className={`flex-1 h-10 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                isInWatchLater 
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,242,255,0.4)]' 
                  : 'glass-panel text-white hover:bg-white/10'
              }`}
             >
               {isInWatchLater ? 'ADDED' : '+ WATCH LATER'}
             </button>
           </div>
        </div>
      </Link>
      
      {/* Decorative scanning line */}
      <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-white/5 group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
    </div>
  );
};

export default MovieCard;
