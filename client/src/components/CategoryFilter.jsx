import React, { useState, useRef, useEffect } from 'react';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { id: 'All', label: 'All', icon: '🎬' },
    { id: 'Tamil', label: 'Tamil', icon: '🎭' },
    { id: 'Hindi', label: 'Hindi', icon: '🎪' },
    { id: 'Telugu', label: 'Telugu', icon: '🎨' },
    { id: 'Marathi', label: 'Marathi', icon: '🎯' },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setIsOpen(false);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-20 right-8 z-50" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3 hover:neon-border-cyan transition-all duration-300 shadow-lg group"
      >
        {/* Filter Icon */}
        <svg 
          className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-sm font-bold tracking-wider text-white">Filters</span>
        {activeCategory !== 'All' && (
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        )}
        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass-panel rounded-2xl overflow-hidden shadow-2xl animate-vault-open">
          <div className="p-2">
            <div className="px-4 py-2 border-b border-white/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Language</span>
            </div>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="tracking-wider uppercase">{category.label}</span>
                {activeCategory === category.id && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
