import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import TopPicks from './pages/TopPicks';
import ComingSoon from './pages/ComingSoon';
import FanFavorites from './pages/FanFavorites';
import AdventureMovies from './pages/AdventureMovies';
import AllMovies from './pages/AllMovies';
import WatchLater from './pages/WatchLater';
import Search from './pages/Search';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-white flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/top-picks" element={<TopPicks />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/adventure-movies" element={<AdventureMovies />} />
              <Route path="/all-movies" element={<AllMovies />} />
              <Route path="/favorites" element={<FanFavorites />} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/search" element={<Search />} />
              <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
