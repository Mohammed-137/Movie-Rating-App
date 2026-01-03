import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

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
          const userData = res.data.data;
          setUser(userData);
          setFavorites(userData.favorites || []);
          setWatchLater(userData.watchLater || []);
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
    // LocalStorage sync removed in favor of server-side storage
  }, [favorites]);

  useEffect(() => {
    // LocalStorage sync removed in favor of server-side storage
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('movieAppReviews', JSON.stringify(reviews));
  }, [reviews]);

  const toggleFavorite = async (movie) => {
    if (!user) return;
    try {
      const res = await userAPI.toggleFavorite(user._id, movie);
      setFavorites(res.data.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleWatchLater = async (movie) => {
    if (!user) return;
    try {
      const res = await userAPI.toggleWatchLater(user._id, movie);
      setWatchLater(res.data.data);
    } catch (error) {
      console.error('Error toggling watch later:', error);
    }
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
    const { token, ...userData } = res.data.data;
    localStorage.setItem('movieAppToken', token);
    setUser(userData);
    setFavorites(userData.favorites || []);
    setWatchLater(userData.watchLater || []);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    const { token, ...userData } = res.data.data;
    localStorage.setItem('movieAppToken', token);
    setUser(userData);
    setFavorites(userData.favorites || []);
    setWatchLater(userData.watchLater || []);
    return userData;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setWatchLater([]);
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
    upgradeSubscription: async () => {
      if (!user) return;
      try {
        await userAPI.upgradeSubscription(user._id);
        setUser(prev => ({ ...prev, subscriptionTier: 'premium' }));
      } catch (error) {
        console.error('Error upgrading subscription:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
