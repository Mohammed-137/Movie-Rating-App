import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, MoreVertical, Filter, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ movieId }) => {
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem(`comments_${movieId}`);
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const navigate = useNavigate();





  const handleAuthAction = (action) => {
    if (!user) {
        navigate('/login');
        return;
    }
    action();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    handleAuthAction(() => {
      const comment = {
        id: Date.now(),
        user: user.name || user.email || 'Anonymous User',
        text: newComment,
        likes: 0,
        dislikes: 0,
        userAction: 'none', // 'none', 'liked', 'disliked'
        date: 'Just now', // Simplified for demo
        timestamp: Date.now()
      };

      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));

      setNewComment('');
      setIsFocused(false);
    });
  };

  const handleCancel = () => {
    setNewComment('');
    setIsFocused(false);
  };

  const handleCommentLike = (commentId) => {
    handleAuthAction(() => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                let newLikes = comment.likes;
                let newDislikes = comment.dislikes;
                let newAction = comment.userAction;

                if (comment.userAction === 'liked') {
                    newLikes--;
                    newAction = 'none';
                } else {
                    if (comment.userAction === 'disliked') {
                        newDislikes--;
                    }
                    newLikes++;
                    newAction = 'liked';
                }
                return { ...comment, likes: newLikes, dislikes: newDislikes, userAction: newAction };
            }
            return comment;
        });
        setComments(updatedComments);
        localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
    });
  };

  const handleCommentDislike = (commentId) => {
    handleAuthAction(() => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                let newLikes = comment.likes;
                let newDislikes = comment.dislikes;
                let newAction = comment.userAction;

                if (comment.userAction === 'disliked') {
                    newDislikes--;
                    newAction = 'none';
                } else {
                    if (comment.userAction === 'liked') {
                        newLikes--;
                    }
                    newDislikes++;
                    newAction = 'disliked';
                }
                return { ...comment, likes: newLikes, dislikes: newDislikes, userAction: newAction };
            }
            return comment;
        });
        setComments(updatedComments);
        localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
    });
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
    setActiveMenuId(null);
  };

  const handleReport = (commentId) => {
    alert(`Comment ${commentId} reported to admin.`);
    setActiveMenuId(null);
  };

  const toggleMenu = (commentId) => {
    handleAuthAction(() => {
        setActiveMenuId(activeMenuId === commentId ? null : commentId);
    });
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto mt-6 text-white pb-10">
      {/* Header: Count & Sort */}
      <div className="flex items-center gap-8 mb-6">
        <h3 className="text-xl font-bold">{comments.length} Comments</h3>
        <button 
            onClick={() => handleAuthAction(() => {})}
            className="flex items-center gap-2 font-semibold text-sm hover:bg-gray-800 px-2 py-1 rounded"
        >
          <Filter size={20} />
          Sort by
        </button>
      </div>

      {/* Add Comment Input */}
      <div className="flex gap-4 mb-8">
        <div className="flex-shrink-0">
           {user ? (
             <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-lg">
               {user.email[0].toUpperCase()}
             </div>
           ) : (
             <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
               <User size={24} />
             </div>
           )}
        </div>
        <div className="flex-grow">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => handleAuthAction(() => setIsFocused(true))}
              className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 transition-colors placeholder-gray-400"
              placeholder="Add a comment..."
            />
            {isFocused && (
              <div className="flex justify-between items-center mt-2">
                 <div className="text-gray-400 text-sm">
                   {!user && <span className="text-xs italic mr-2">Commenting as Guest</span>}
                 </div>
                 <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-full hover:bg-gray-800 font-semibold text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className={`px-4 py-2 rounded-full font-semibold text-sm text-black ${newComment.trim() ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    >
                      Comment
                    </button>
                 </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group relative">
            <div className="flex-shrink-0">
               <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                 {comment.user.charAt(0).toUpperCase()}
               </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-white">{comment.user}</span>
                <span className="text-gray-400 text-xs">{comment.date}</span>
              </div>
              <p className="text-white text-sm mb-2">{comment.text}</p>
              <div className="flex items-center gap-4 text-gray-400">
                <button 
                    onClick={() => handleCommentLike(comment.id)}
                    className={`flex items-center gap-1 hover:bg-gray-800 p-1 rounded-full transition-colors ${comment.userAction === 'liked' ? 'text-blue-500' : ''}`}
                >
                  <ThumbsUp size={16} fill={comment.userAction === 'liked' ? "currentColor" : "none"} />
                  <span className="text-xs">{comment.likes || 0}</span>
                </button>
                <button 
                    onClick={() => handleCommentDislike(comment.id)}
                    className={`flex items-center gap-1 hover:bg-gray-800 p-1 rounded-full transition-colors ${comment.userAction === 'disliked' ? 'text-blue-500' : ''}`}
                >
                  <ThumbsDown size={16} fill={comment.userAction === 'disliked' ? "currentColor" : "none"} />
                </button>
                <button 
                    onClick={() => handleAuthAction(() => {})}
                    className="text-xs font-semibold hover:bg-gray-800 px-2 py-1 rounded-full"
                >
                  Reply
                </button>
              </div>
            </div>
            
            {/* 3-Dots Menu */}
            <div className="opacity-0 group-hover:opacity-100 p-2 relative">
               <button 
                 onClick={() => toggleMenu(comment.id)}
                 className="hover:bg-gray-800 p-2 rounded-full"
               >
                 <MoreVertical size={20} />
               </button>

               {/* Dropdown Menu */}
               {activeMenuId === comment.id && (
                   <div className="absolute right-0 top-10 bg-gray-800 rounded-lg shadow-xl py-2 w-32 z-10 border border-gray-700">
                      {/* Show delete only if it's the current user's comment OR if it feels like 'self delete' implies general delete for this mock */}
                      {(comment.user === user?.email || !user) && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex items-center gap-2 text-red-400"
                          >
                            Delete
                          </button>
                      )}
                      <button 
                        onClick={() => handleReport(comment.id)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm flex items-center gap-2"
                      >
                        Report
                      </button>
                   </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
