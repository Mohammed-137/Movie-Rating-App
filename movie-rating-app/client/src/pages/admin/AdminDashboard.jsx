import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  ShieldCheck,
  Eye,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useMovies } from '../../context/MovieContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';

// Placeholder sub-components (will build these out next)
const AddMovieForm = ({ isOpen, onClose, onSave, editingMovie = null }) => {
    const [formData, setFormData] = useState(editingMovie || {
        title: '',
        description: '',
        duration: '',
        poster: '',
        backdrop: '',
        trailer: '',
        previewTrailer: '',
        premiumTrailer: '',
        isPremiumOnly: false,
        earlyAccessDate: '',
        releaseDate: '',
        language: 'English',
        genre: '',
        certification: 'PG-13',
        section: 'New'
    });

    // useEffect removed - using key prop for state reset

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative glass-panel w-full max-w-4xl p-10 rounded-[3.5rem] border border-white/10 animate-vault-open overflow-y-auto max-h-[90vh]">
                <h2 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-tighter">
                    {editingMovie ? 'Edit Protocol' : 'Initialize New Entry'}
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Movie Title</label>
                            <input 
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" 
                                placeholder="e.g. Inception"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                            <textarea 
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white h-32 resize-none" 
                                placeholder="Enter cinematic summary..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Language</label>
                                <select 
                                    value={formData.language}
                                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white appearance-none"
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Marathi">Marathi</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Section</label>
                                <select 
                                    value={formData.section}
                                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white appearance-none"
                                >
                                    <option value="New">New Release</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Featured">Featured</option>
                                    <option value="Upcoming">Upcoming</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main Trailer URL</label>
                                <input
                                    type="text"
                                    name="trailer"
                                    value={formData.trailer}
                                    onChange={handleInputChange}
                                    placeholder="https://www.youtube.com/embed/..."
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Preview Trailer (Free)</label>
                                <input
                                    type="text"
                                    name="previewTrailer"
                                    value={formData.previewTrailer}
                                    onChange={handleInputChange}
                                    placeholder="https://www.youtube.com/embed/..."
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Premium Trailer (Full)</label>
                                <input
                                    type="text"
                                    name="premiumTrailer"
                                    value={formData.premiumTrailer}
                                    onChange={handleInputChange}
                                    placeholder="https://www.youtube.com/embed/..."
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                                />
                            </div>
                            <div className="space-y-4 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="isPremiumOnly"
                                            checked={formData.isPremiumOnly}
                                            onChange={(e) => setFormData(prev => ({ ...prev, isPremiumOnly: e.target.checked }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:bg-primary transition-all"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">MARK AS PREMIUM ONLY</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Early Access Release Date</label>
                            <input
                                type="date"
                                name="earlyAccessDate"
                                value={formData.earlyAccessDate}
                                onChange={handleInputChange}
                                className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Poster URL</label>
                            <input
                                type="text"
                                name="poster"
                                value={formData.poster}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Release Date</label>
                                <input 
                                    type="date"
                                    value={formData.releaseDate}
                                    onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white" 
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Certification</label>
                                <select 
                                    value={formData.certification}
                                    onChange={(e) => setFormData({...formData, certification: e.target.value})}
                                    className="w-full glass-panel bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all text-white appearance-none"
                                >
                                    <option value="G">G</option>
                                    <option value="PG">PG</option>
                                    <option value="PG-13">PG-13</option>
                                    <option value="R">R</option>
                                    <option value="NC-17">NC-17</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        <button type="button" onClick={onClose} className="px-8 py-3 rounded-2xl font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest text-[10px]">Portal Close</button>
                        <button type="submit" className="bg-primary text-black px-12 py-3 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase tracking-widest text-[10px]">Save Transmission</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updateUserStatus } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userAPI.getAll();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        try {
            await updateUserStatus(userId, newStatus);
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
        } catch (error) {
            alert('Failed to update user status');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="animate-vault-open">
            <h2 className="text-2xl font-display font-bold text-white mb-8">User Surveillance</h2>
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subscriber</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Role</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Activity</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-white/5 text-primary text-xs font-bold">
                                            {u.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">{u.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-medium uppercase">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${u.role === 'admin' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-500/10 text-gray-500 border border-white/5'}`}>
                                        {u.role || 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-gray-400 font-mono">ID: {u._id.substring(0, 8)}...</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'suspended' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></div>
                                        <span className={`text-[10px] font-bold ${u.status === 'suspended' ? 'text-red-500' : 'text-gray-400'} uppercase tracking-widest`}>
                                            {u.status || 'Active'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {u.role !== 'admin' && (
                                        <button 
                                            onClick={() => handleStatusToggle(u._id, u.status || 'active')}
                                            className={`p-2 rounded-lg transition-all ${u.status === 'suspended' ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'}`}
                                            title={u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                        >
                                            {u.status === 'suspended' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Moderation = () => {
    const { reviews, deleteReview } = useAuth();
    const { movies } = useMovies();
    
    // Flatten reviews for the table
    const allReviews = Object.entries(reviews).flatMap(([movieId, movieReviews]) => {
        const movie = movies.find(m => m.id.toString() === movieId.toString());
        return movieReviews.map(r => ({ ...r, movieId, movieTitle: movie?.title || 'Unknown Movie' }));
    });

    return (
        <div className="animate-vault-open">
            <h2 className="text-2xl font-display font-bold text-white mb-8">Review Moderation</h2>
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Author</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Movie</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rating</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Comment</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {allReviews.length > 0 ? allReviews.map((r) => (
                            <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={r.userAvatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                                        <span className="text-sm font-bold text-white">{r.userName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-gray-400 font-medium">{r.movieTitle}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs text-gray-500 italic line-clamp-1 max-w-xs">"{r.text}"</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => deleteReview(r.movieId, r.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-20 text-center text-gray-600 font-mono text-[10px] uppercase tracking-widest">No review metadata detected</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MovieManager = () => {
    const { movies, deleteMovie, toggleSection, addMovie, updateMovie } = useMovies();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    const handleSave = (data) => {
        if (editingMovie) {
            updateMovie(editingMovie.id, data);
        } else {
            addMovie(data);
        }
        setEditingMovie(null);
    };

    return (
        <div className="animate-vault-open">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-white">Movie Database</h2>
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all"
                >
                    <Plus size={18} />
                    New Entry
                </button>
            </div>

            <AddMovieForm 
                key={isFormOpen ? 'new' : editingMovie?.id || 'closed'}
                isOpen={isFormOpen || !!editingMovie} 
                onClose={() => { setIsFormOpen(false); setEditingMovie(null); }}
                onSave={handleSave}
                editingMovie={editingMovie}
            />

            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Movie</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Data Sector</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rating</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {movies.map((m) => (
                            <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img src={m.poster} className="w-10 h-14 rounded-lg object-cover border border-white/10 shadow-lg" alt="" />
                                        <div>
                                            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{m.title}</h4>
                                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{m.language} • {m.certification}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        className="glass-panel bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                                        value={m.section}
                                        onChange={(e) => toggleSection(m.id, e.target.value)}
                                    >
                                        <option value="New">New Release</option>
                                        <option value="Trending">Trending</option>
                                        <option value="Featured">Featured</option>
                                        <option value="Upcoming">Upcoming</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-mono text-primary font-black">{m.rating}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'upcoming' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.status || 'Active'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => setEditingMovie(m)}
                                            className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all"
                                        ><Edit size={16} /></button>
                                        <button 
                                            onClick={() => { if(window.confirm('Delete data permanently?')) deleteMovie(m.id); }}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                                        ><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Analytics = () => {
    const { movies } = useMovies();
    const stats = [
        { label: 'Total Movies', value: movies.length, icon: Film, color: 'text-primary' },
        { label: 'Active Users', value: '1,284', icon: Users, color: 'text-green-500' },
        { label: 'Avg Rating', value: '4.8', icon: BarChart3, color: 'text-yellow-500' },
        { label: 'Pending Reviews', value: '12', icon: MessageSquare, color: 'text-pink-500' },
    ];

    return (
        <div className="animate-vault-open">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <s.icon className={`${s.color}`} size={24} />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Status</span>
                        </div>
                        <h3 className="text-3xl font-display font-black text-white">{s.value}</h3>
                        <p className="text-sm text-gray-400 font-medium">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-display font-bold text-white mb-6">Trending Movies Engagement</h3>
                    <div className="h-64 flex items-end gap-2 px-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-t-lg hover:bg-primary/40 transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-display font-bold text-white mb-6">Top Contributing Users</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Sherly', activity: '48 reviews', rank: 1 },
                            { name: 'Sridhar', activity: '35 reviews', rank: 2 },
                            { name: 'Shruthi Ranjani', activity: '29 reviews', rank: 3 },
                            { name: 'Muthu Lakshmi', activity: '24 reviews', rank: 4 }
                        ].map((u, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-primary-magenta/20 flex items-center justify-center font-bold text-primary">
                                        #{u.rank}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{u.name}</h4>
                                        <p className="text-xs text-gray-500">{u.activity}</p>
                                    </div>
                                </div>
                                <ShieldCheck size={18} className="text-green-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'moderation', label: 'Moderation', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 pt-28 fixed h-full bg-dark">
        <div className="mb-12">
            <h1 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-4 px-4">CORE SYSTEMS</h1>
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.5rem] font-display font-black text-[10px] uppercase tracking-widest transition-all ${
                            activeTab === item.id 
                            ? 'bg-primary text-black shadow-[0_10px_30px_rgba(0,242,255,0.3)] scale-[1.05]' 
                            : 'text-gray-500 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>

        <div className="mt-auto">
            <div className="glass-panel p-6 rounded-3xl mb-8 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protocol Active</span>
                </div>
                <p className="text-[10px] text-gray-600 font-mono leading-relaxed">System monitoring all transmissions. End-to-end encryption verified.</p>
            </div>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-display font-bold text-xs text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest border border-red-500/10"
            >
                <LogOut size={16} />
                Disconnect
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-80 p-12 pt-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto py-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                   <h1 className="text-4xl font-display font-black text-white uppercase tracking-tighter">System Console</h1>
                   <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-2 px-1">Authority Level: [ADMINISTRATOR]</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 border border-white/5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Sync: Verified</span>
                    </div>
                </div>
            </div>

            {/* Conditional Sub-views */}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'movies' && <MovieManager />}
            {activeTab === 'users' && <UserManager />}
            {activeTab === 'moderation' && <Moderation />}
            
            {activeTab === 'settings' && (
                <div className="flex flex-col items-center justify-center py-40 glass-panel rounded-[3rem]">
                    <Settings size={48} className="text-gray-600 mb-6" />
                    <h2 className="text-2xl font-display font-bold text-white mb-2 text-center uppercase">System Settings</h2>
                    <p className="text-gray-500 font-mono tracking-widest text center max-w-sm mx-auto">Core parameters locked. Access requires Level 10 Clearance.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
