import React from 'react'
import services from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostProject({ $id, titlle, featuredImage }) {
  
  return (
    <Link to={`/post/${$id}`} className="block group">
      {/* Card Container */}
      <div className='relative w-full overflow-hidden bg-[#111111] border border-white/10 rounded-2xl transition-all duration-500 ease-out hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]'>
        
        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Wrapper with Aspect Ratio Control */}
        <div className='aspect-video w-full overflow-hidden bg-[#0a0a0a]'>
            <img 
              src={services.getFileView(featuredImage)} 
              alt={titlle} 
              className='h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110' 
            />
        </div>

        {/* Content Section */}
        <div className='p-5 relative'>
            <div className='flex items-center justify-between'>
                <h2 className='text-white font-semibold text-lg tracking-tight group-hover:text-blue-400 transition-colors duration-300'>
                    {titlle}
                </h2>
                
                {/* Modern SaaS Icon (Right Arrow) */}
                <div className='text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="currentColor" 
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            </div>
            
            {/* Optional: Add a "View Project" label that appears on hover */}
            <p className='text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                View Details
            </p>
        </div>
      </div>
    </Link>
  )
}

export default PostProject