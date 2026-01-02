import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('movieAppFavorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [watchLater, setWatchLater] = useState(() => {
    const stored = localStorage.getItem('movieAppWatchLater');
    return stored ? JSON.parse(stored) : [];
  });

  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('movieAppReviews');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('movieAppToken');
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data);
        } catch {
          console.error('Session expired or invalid token');
          localStorage.removeItem('movieAppToken');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem('movieAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('movieAppWatchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('movieAppReviews', JSON.stringify(reviews));
  }, [reviews]);

  const toggleFavorite = (movie) => {
    if (!user) return;
    setFavorites(prev => {
      const isFav = prev.some(m => m.id === movie.id);
      if (isFav) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const toggleWatchLater = (movie) => {
    if (!user) return;
    setWatchLater(prev => {
      const isListed = prev.some(m => m.id === movie.id);
      if (isListed) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const addReview = (movieId, rating, text) => {
    if (!user) return;
    const newReview = {
      id: Date.now(),
      userId: user._id,
      userName: user.name,
      userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FA320A&color=fff`,
      rating,
      text,
      date: new Date().toISOString()
    };

    setReviews(prev => ({
      ...prev,
      [movieId]: [...(prev[movieId] || []), newReview]
    }));
  };

  const isFavorite = (movieId) => favorites.some(m => m.id === movieId);
  const isWatchLater = (movieId) => watchLater.some(m => m.id === movieId);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('movieAppToken', token);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem('movieAppToken', token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieAppToken');
  };

  // Admin specific user management
  const updateUserStatus = async (userId, status) => {
    try {
      await userAPI.updateStatus(userId, status);
      return true;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  };

  const deleteReview = (movieId, reviewId) => {
    setReviews(prev => ({
      ...prev,
      [movieId]: prev[movieId].filter(r => r.id !== reviewId)
    }));
  };

  const value = {
    user, loading, login, register, logout,
    favorites, watchLater, reviews,
    toggleFavorite, toggleWatchLater, addReview, deleteReview,
    isFavorite, isWatchLater, updateUserStatus,
    upgradeSubscription: () => {
      setUser(prev => ({ ...prev, subscriptionTier: 'premium' }));
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
