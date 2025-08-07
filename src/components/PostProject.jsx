import React from 'react'
import services from '../appwrite/config'
import {Link} from 'react-router-dom'



function PostProject({$id ,titlle,featuredImage}) {
  
  return (
    <Link to= {`/post/${$id}`}>
      <div className='max-h-96 w-80 bg-black flex  flex-col space-y-2 rounded-lg p-4 hover:scale-105 transition-all duration-300 ease-in-out flex-wrap'>
        <div className='h-56 w-full flex items-center justify-center '>
            <img src={services.getFileView(featuredImage)} alt={titlle} className='h-full w-full flex items-center justify-center text-white object-cover' />
        </div>
        <div>
            <h2 className='text-white'>{titlle}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostProject
