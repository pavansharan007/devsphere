import React from 'react'
import { useEffect, useState } from 'react';
import services from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import PostProject from './PostProject';
import { useSelector } from 'react-redux';

// Custom Loader to match your SaaS theme
const SaaSLoader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-10 h-10 border-2 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
    <p className="text-gray-500 text-sm mt-4 font-medium tracking-wide">Loading feed...</p>
  </div>
);

function HomePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.user);

  useEffect(() => {
    services.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  // Unauthorized State
  if (!authStatus) 
    return (
      <div className='flex flex-col items-center justify-center py-20 px-6 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-sm' >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">🔒</span>
        </div>
        <h1 className='text-white text-2xl font-bold tracking-tight mb-2'>Project Vault Protected</h1>
        <p className='text-gray-400 mb-6 text-center max-w-xs'>Please login to explore the amazing projects created by our community.</p>
        <button 
            onClick={() => navigate('/login')}
            className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
        >
            Login to View
        </button>
      </div>
    );  

  // Loading State
  if (loading) return <SaaSLoader />;

  return (
    <div className="w-full">
      {/* Header for the Feed section */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Recent Orbits</h2>
        </div>
        <button 
            onClick={() => navigate('/all-post')}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
            View all →
        </button>
      </div>

      {/* Modern Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.slice(0, 6).map((post) => ( // Show top 6 on Home
            <div 
                key={post.$id} 
                className="transform transition-all duration-300 hover:translate-y-[-8px]"
            >
              <PostProject {...post} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-[#111111] rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">The galaxy is empty... for now.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePost