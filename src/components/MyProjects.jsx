import { useEffect, useState } from 'react'
import React from 'react'
import services from '../appwrite/config'
import authService from '../appwrite/auth'
import PostProject from './PostProject'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// Custom Minimalist Spinner for SaaS feel
const MiniLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

function MyProjects(post) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true) // Added for initial fetch state
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.$id) {
      services.getMyPosts(user.$id).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false)
      })
    }
  }, [user?.$id])

  // Initial Loading State
  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><MiniLoader /></div>
  }

  // Empty State Modernized
  if (posts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[80vh] bg-[#0a0a0a] px-4'>
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative text-center space-y-6 max-w-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-4">
             <span className="text-4xl text-gray-400">📂</span>
          </div>
          <h1 className='text-white text-3xl md:text-5xl font-bold tracking-tight'>
            You haven't launched <br /> any projects yet
          </h1>
          <p className='text-gray-400 text-lg md:text-xl font-medium'>
            Build something amazing today and showcase it to the world.
          </p>
          <div className="pt-4">
            <button
              className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
              onClick={() => navigate('/add-post')}
            >
              Create Your First Project &rarr;
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-6 lg:px-12">
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">My Workspace</h1>
            <p className="text-gray-400 mt-2">Manage and monitor all your active projects.</p>
          </div>
          <button 
            onClick={() => navigate('/add-post')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <span>+</span> New Project
          </button>
        </div>
        <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      {/* Modern Card Grid */}
      <div className="max-w-7xl mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <div 
              key={post.$id} 
              className='transition-all duration-300 hover:translate-y-[-5px]'
            >
              <PostProject {...post} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  )
}

export default MyProjects