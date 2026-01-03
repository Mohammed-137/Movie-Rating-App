import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://movie-rating-backend-nx55.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('movieAppToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const movieAPI = {
  getAll: () => api.get('/movies'),
  getOne: (id) => api.get(`/movies/${id}`),
  create: (movieData) => api.post('/movies', movieData),
  update: (id, movieData) => api.put(`/movies/${id}`, movieData),
  delete: (id) => api.delete(`/movies/${id}`),
};

export const userAPI = {
  getAll: () => api.get('/users'),
  getOne: (id) => api.get(`/users/${id}`),
  updateStatus: (id, status) => api.put(`/users/${id}/status`, { status }),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  toggleFavorite: (id, movie) => api.post(`/users/${id}/favorites`, { movie }),
  toggleWatchLater: (id, movie) => api.post(`/users/${id}/watchLater`, { movie }),
};

export const moderationAPI = {
  getAll: () => api.get('/moderation'),
  create: (data) => api.post('/moderation', data),
  delete: (id) => api.delete(`/moderation/${id}`),
};

export default api;
