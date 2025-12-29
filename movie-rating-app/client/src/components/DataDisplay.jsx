import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Example component demonstrating how to fetch data from the backend
 */
const DataDisplay = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch movies and users from backend
      const [moviesData, usersData] = await Promise.all([
        api.movies.getAll(),
        api.users.getAll(),
      ]);

      setMovies(moviesData);
      setUsers(usersData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data from MongoDB Atlas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold text-lg mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">MongoDB Atlas Data</h1>

      {/* Users Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>👥</span>
          Users ({users.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Movies Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>🎬</span>
          Movies ({movies.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                {movie.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {movie.description}
                  </p>
                )}
                {movie.genre && movie.genre.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {movie.genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
                {movie.rating > 0 && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span>⭐</span>
                    <span className="font-semibold">{movie.rating}/10</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DataDisplay;
