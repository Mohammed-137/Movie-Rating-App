import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import CommentSection from '../components/CommentSection';
import { ThumbsUp, ThumbsDown, Lock, Play, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UpgradeModal from '../components/UpgradeModal';

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useMovies();
  
  const movie = movies.find(m => m.id.toString() === id.toString());
  const navigate = useNavigate();
  const { user, upgradeSubscription } = useAuth();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  
  // State for likes/dislikes
  const [likes, setLikes] = React.useState(0);
  const [dislikes, setDislikes] = React.useState(0);
  const [userAction, setUserAction] = React.useState('none'); // 'none', 'liked', 'disliked'
  
  const isPremiumUser = user?.subscriptionTier === 'premium' || user?.role === 'admin';
  const showPremiumTrailer = isPremiumUser && (movie.premiumTrailer || movie.trailer);
  const trailerUrl = showPremiumTrailer ? (movie.premiumTrailer || movie.trailer) : (movie.previewTrailer || movie.trailer);
  
  // Use state and effect for random telemetry data to satisfy React's purity rules
  const [telemetryData, setTelemetryData] = React.useState([]);

  React.useEffect(() => {
    const data = [...Array(20)].map((_, i) => ({
      height: `${Math.random() * 80 + 20}%`,
      opacity: Math.random() * 0.5 + 0.2,
      delay: `${i * 0.1}s`
    }));
    setTelemetryData(data);
  }, []);
  
  // State for emoji reactions
  const [reactions, setReactions] = React.useState({
    '❤️': 0,
    '😂': 0,
    '😮': 0,
    '🔥': 0
  });

  const handleAuthAction = (action) => {
    if (!user) {
      navigate('/login');
      return;
    }
    action();
  };

  const handleLike = () => {
    handleAuthAction(() => {
      if (userAction === 'liked') {
        setLikes(likes - 1);
        setUserAction('none');
      } else {
        if (userAction === 'disliked') {
          setDislikes(dislikes - 1);
        }
        setLikes(likes + 1);
        setUserAction('liked');
      }
    });
  };

  const handleDislike = () => {
    handleAuthAction(() => {
      if (userAction === 'disliked') {
        setDislikes(dislikes - 1);
        setUserAction('none');
      } else {
        if (userAction === 'liked') {
          setLikes(likes - 1);
        }
        setDislikes(dislikes + 1);
        setUserAction('disliked');
      }
    });
  };

  const handleReaction = (emoji) => {
    handleAuthAction(() => {
      setReactions(prev => ({
        ...prev,
        [emoji]: prev[emoji] + 1
      }));
    });
  };

  const handleUpgrade = () => {
    if (user) {
      upgradeSubscription(user.id);
      setIsUpgradeModalOpen(false);
    } else {
      navigate('/login');
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
         <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
            <button onClick={() => navigate('/')} className="bg-white text-black px-6 py-2 rounded-full font-bold">Go Home</button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 pb-20 relative overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 blur-[120px] pointer-events-none"
        style={{ backgroundImage: `url(${movie.poster})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark px-8"></div>

      <div className="max-w-[1720px] mx-auto px-8 relative z-10">
        <div className="flex flex-col xl:flex-row gap-12">
          
          {/* Column 1: Control Column (Left) */}
          <div className="hidden xl:flex flex-col gap-8 w-[350px]">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] text-gray-500 hover:text-primary transition-colors group px-4 py-2"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO HOME
            </button>

            <div className="relative group">
               <div className="absolute -inset-1 bg-primary/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
               <img 
                src={movie.poster} 
                alt={movie.title} 
                className="relative w-full aspect-[2/3] object-cover rounded-[2rem] border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
               />
            </div>

            <div className="glass-panel p-6 rounded-[2rem]">
               <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 text-center">Neural Sync Rating</h4>
               <div className="flex items-center justify-center gap-6">
                   <div className="relative w-24 h-24">
                   <svg className="w-full h-full -rotate-90">
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                       strokeDasharray={251.2} 
                       strokeDashoffset={251.2 * (1 - (
                         (movie.rating && typeof movie.rating === 'string') 
                           ? parseFloat(movie.rating.replace('%', '')) 
                           : (movie.rating || 0)
                       ) / 100)} 
                       className="text-primary drop-shadow-[0_0_8px_rgba(18,242,255,0.6)]" 
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-2xl font-display font-black text-white">{movie.rating}</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Column 2: Main Immersion Corridor (Center) */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="w-full aspect-video glass-panel rounded-[2.5rem] overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
               {movie.isPremiumOnly && !isPremiumUser && (
                 <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl p-8 text-center group-hover:bg-black/50 transition-all">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30">
                      <Lock className="text-primary" size={40} />
                    </div>
                    <h3 className="text-2xl font-display font-black text-white mb-2">PREMIUM CONTENT</h3>
                    <p className="text-gray-400 text-sm max-w-md mb-8">This exclusive full-length trailer is reserved for premium subscribers. Watch the preview below or upgrade to unlock now.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setIsUpgradeModalOpen(true)}
                        className="bg-primary text-black px-8 py-3 rounded-2xl font-bold tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] transition-all"
                      >
                        UNLOCK FULL TRAILER
                      </button>
                      <button 
                        className="glass-panel text-white px-8 py-3 rounded-2xl font-bold tracking-widest uppercase hover:bg-white/5 transition-all flex items-center gap-2"
                        onClick={() => {
                          // Force scroll to current iframe to play preview
                          const iframe = document.querySelector('iframe');
                          if (iframe) iframe.focus();
                        }}
                      >
                        <Play size={18} /> PLAY PREVIEW
                      </button>
                    </div>
                 </div>
               )}

               {trailerUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={trailerUrl}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={`w-full h-full ${movie.isPremiumOnly && !isPremiumUser ? 'blur-md brightness-50' : ''}`}
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900/50">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover opacity-20" />
                    <span className="absolute text-xl font-bold text-primary/50 font-mono tracking-widest">ENCRYPTED STREAM NOT FOUND</span>
                  </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                   <span className="text-[10px] font-bold text-primary-magenta tracking-[0.4em]">LIVE DATA STREAM</span>
                   <span className="w-2 h-2 bg-primary-magenta rounded-full animate-ping"></span>
                 </div>
                  <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-2 flex items-center gap-4">
                    {movie.title}
                    {movie.isPremiumOnly && (
                      <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                        <ShieldCheck size={12} /> PREMIUM
                      </span>
                    )}
                  </h1>
               </div>

               <div className="flex items-center gap-4">
                 <div className="flex glass-panel rounded-full p-1 border-white/5">
                    <button 
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${userAction === 'liked' ? 'bg-primary text-black' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                      <ThumbsUp size={18} />
                      <span className="text-sm font-bold">{likes}</span>
                    </button>
                    <button 
                      onClick={handleDislike}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${userAction === 'disliked' ? 'bg-primary-magenta text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                      <ThumbsDown size={18} />
                      <span className="text-sm font-bold">{dislikes}</span>
                    </button>
                 </div>
               </div>
            </div>

            <div className="flex gap-3 px-4 flex-wrap">
              {Object.entries(reactions).map(([emoji, count]) => (
                <button 
                  key={emoji} 
                  onClick={() => handleReaction(emoji)}
                  className="glass-panel hover:neon-border-cyan px-5 py-2.5 rounded-2xl flex items-center gap-3 transition-all active:scale-95 group"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{emoji}</span>
                  <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-primary">{count}</span>
                </button>
              ))}
            </div>

            <div className="mt-12">
               <CommentSection movieId={movie.id} />
            </div>
          </div>

          {/* Column 3: Telemetry Dashboard (Right) */}
          <div className="flex flex-col gap-8 w-full xl:w-[400px]">
            <div className="glass-panel p-8 rounded-[2rem] border-white/5 flex flex-col gap-8">
               <div>
                 <h4 className="text-[10px] font-bold text-primary tracking-[0.4em] mb-4 uppercase">Mission Profile</h4>
                 <p className="text-gray-400 text-sm leading-relaxed font-medium">
                   {movie.description}
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass-panel rounded-2xl border-white/5">
                    <div className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Temporal</div>
                    <div className="text-sm font-bold text-white">2h 45m</div>
                  </div>
                  <div className="p-4 glass-panel rounded-2xl border-white/5">
                    <div className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Protocol</div>
                    <div className="text-sm font-bold text-white">{movie.language} (Neural)</div>
                  </div>
               </div>

               <div>
                 <h4 className="text-[10px] font-bold text-primary tracking-[0.4em] mb-6 uppercase">Assigned Units</h4>
                 <div className="flex gap-4">
                   {[1, 2, 3, 4].map((unit) => (
                     <div key={unit} className="relative group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-magenta p-[1px] rotate-12 transition-transform group-hover:rotate-0">
                           <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center overflow-hidden">
                              <img src={`https://i.pravatar.cc/150?u=${unit}`} alt="Cast" className="w-full h-full object-cover" />
                           </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-dark rounded-full"></div>
                     </div>
                   ))}
                   <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-xs font-bold text-primary hover:neon-border-cyan cursor-pointer">
                     +8
                   </div>
                 </div>
               </div>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] border-white/5 overflow-hidden relative">
               <div className="flex items-center justify-between mb-8 text-center">
                 <div className="flex-1 border-r border-white/5">
                    <div className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Data Flow</div>
                    <div className="text-xl font-display font-black text-primary">STABLE</div>
                 </div>
                 <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-widest">Uptime</div>
                    <div className="text-xl font-display font-black text-white">99.9%</div>
                 </div>
               </div>
               
                <div className="h-24 w-full flex items-end gap-1 px-4">
                  {telemetryData.map((data, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-primary/20 rounded-full animate-pulse" 
                      style={{ 
                        height: data.height,
                        animationDelay: data.delay,
                        opacity: data.opacity
                      }}
                    ></div>
                  ))}
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_20px_rgba(18,242,255,0.8)]"></div>
            </div>
          </div>

        </div>
      </div>
      
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default MovieDetails;
