import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import services from '../appwrite/config'
import PostProject from '../components/PostProject'

// Custom Modern SaaS Loader Component
const CustomSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    <p className="text-gray-400 text-sm font-medium animate-pulse tracking-wide">
      Loading projects...
    </p>
  </div>
);

function AllPosta() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authstatus = useSelector((state) => state.auth.user);

  useEffect(() => {
    services.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (!authstatus) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0a0a0a]'>
        <div className='bg-red-500/10 border border-red-500/20 p-6 rounded-2xl'>
          <p className="text-red-500 font-medium">You must be logged in to view posts.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      {/* SaaS Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Community <span className="text-blue-500">Showcase</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Explore the latest projects built by developers around the world. 
          Get inspired and share your own work.
        </p>
        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-10"></div>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <div 
                key={post.$id} 
                className="group relative bg-[#111111] border border-white/10 rounded-3xl p-4 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
              >
                <PostProject {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-3xl border border-dashed border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <span className="text-2xl text-gray-500">📁</span>
            </div>
            <h3 className="text-white text-xl font-semibold">No projects yet</h3>
            <p className="text-gray-500 mt-2">Be the first one to contribute to the gallery.</p>
          </div>
        )}
      </div>

      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  )
}

export default AllPosta