import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch {
      setError('Failed to create an account.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,15,0)_0%,rgba(10,10,15,1)_100%)] z-10"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* Moving Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}></div>

      <div className="relative z-20 w-full max-w-md px-6 animate-vault-open">
        <div className="mb-12 text-center">
          <Link to="/" className="inline-block text-4xl font-display font-black tracking-tighter neon-text-cyan italic mb-2">
            CINEMORA
          </Link>
          <p className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">Create Your Account</p>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-2">JOIN CINEMORA</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold p-4 rounded-xl mb-6 text-center tracking-wider">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              placeholder="FULL NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neon-yellow text-black font-display font-black py-4 rounded-2xl shadow-[0_0_30px_rgba(245,197,24,0.3)] hover:shadow-[0_0_50px_rgba(245,197,24,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 tracking-[0.2em] text-xs"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </div>

            <div className="pt-8 border-t border-white/5 text-center">
              <span className="text-gray-600 text-[10px] font-bold tracking-widest uppercase mr-2">Already a Member?</span>
              <Link to="/login" className="text-primary text-[10px] font-bold tracking-widest uppercase hover:underline">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
