const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api';
  }
  
  if (import.meta.env.PROD) {

    return '/api'; 
  }

  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();
console.log('--- CINEMORA API Initialization ---');
console.log('Resolved API_BASE_URL:', API_BASE_URL);
console.log('Current Environment:', import.meta.env.MODE);
console.log('------------------------------------');

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('movieAppToken');
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

/**
 * Auth API methods
 */
export const authAPI = {
  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  getMe: async () => {
    return await apiRequest('/auth/me');
  },
};

/**
 * User API methods
 */
export const userAPI = {
  /**
   * Fetch all users
   */
  getAll: async () => {
    const response = await apiRequest('/users');
    return response.data;
  },

  /**
   * Fetch single user by ID
   */
  getById: async (id) => {
    const response = await apiRequest(`/users/${id}`);
    return response.data;
  },
};

/**
 * Movie API methods
 */
export const movieAPI = {
  /**
   * Fetch all movies
   */
  getAll: async () => {
    const response = await apiRequest('/movies');
    return response.data;
  },

  /**
   * Fetch single movie by ID
   */
  getById: async (id) => {
    const response = await apiRequest(`/movies/${id}`);
    return response.data;
  },

  /**
   * Fetch movies by category
   */
  getByCategory: async (category) => {
    const response = await apiRequest(`/movies/category/${category}`);
    return response.data;
  },

  /**
   * Fetch movies by genre
   */
  getByGenre: async (genre) => {
    const response = await apiRequest(`/movies/genre/${genre}`);
    return response.data;
  },
};

/**
 * Export default API object
 */
const api = {
  auth: authAPI,
  users: userAPI,
  movies: movieAPI,
};

export default api;
