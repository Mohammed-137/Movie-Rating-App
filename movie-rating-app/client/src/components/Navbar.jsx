import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 glass-panel h-16 border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-8">
        {/* Logo & Menu */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-3xl font-display font-black tracking-tighter neon-text-cyan italic">
            CINEMORA
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/top-picks" className="text-sm font-medium hover:text-primary transition-colors">Movies</Link>
            <Link to="/coming-soon" className="text-sm font-medium hover:text-primary transition-colors">Upcoming</Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl flex justify-end md:justify-center items-center">
          <div className={`relative flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-full' : 'w-10'}`}>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-colors z-10 ${isSearchOpen ? 'text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            
            {isSearchOpen && (
              <input
                type="text"
                autoFocus
                placeholder="Search for movies..."
                className="absolute right-0 w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-12 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all placeholder:text-gray-500 animate-slide-left"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
              />
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link to="/favorites" className="p-2 hover:bg-white/5 rounded-full transition-colors relative group" title="Favorites">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          
          <Link to="/watch-later" className="p-2 hover:bg-white/5 rounded-full transition-colors relative group" title="Watchlist">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          </Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="hidden lg:flex items-center gap-2 glass-button px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-primary border-primary/20 hover:neon-border-cyan transition-all">
              <ShieldCheck size={14} />
              ADMIN PANEL
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 glass-button px-4 py-1.5 rounded-full">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-primary-magenta flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                    {user.subscriptionTier === 'premium' && (
                      <span className="bg-primary/20 border border-primary/30 text-primary text-[8px] px-2 py-0.5 rounded-full font-black tracking-tighter shrink-0">
                        PREMIUM
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="glass-button px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:neon-border-cyan transition-all">
              SIGN IN
            </Link>
          )}
          
          <button className="lg:hidden text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
