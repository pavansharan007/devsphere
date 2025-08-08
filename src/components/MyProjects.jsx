import { useEffect, useState } from 'react'
import React from 'react'
import services from '../appwrite/config'
import authService from '../appwrite/auth'
import PostProject from './PostProject'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function MyProjects(post) {
  const[posts, setPosts] = useState([])
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  useEffect(() => {
    services.getMyPosts(user.$id).then((posts) => {
      if(posts){
        setPosts(posts.documents);
      }
    })
  },[])
  console.log(posts)
  if(posts.length === 0){
    return (
      <div className='flex flex-col items-center justify-center text-white' style={{minHeight:'60vh'}}>
        <h1 className=' px-6 text-4xl md:text-5xl lg:text-7xl flex justify-center'>You Have No Projects Yet</h1>
     
        <p className='mb-5  px-6 text-4xl md:text-5xl lg:text-7xl flex justify-center'>Start Creating a new project</p>
        <button
            className="bg-black text-white font-semibold px-6 py-3 border border-white rounded-md hover:bg-gray-900 transition"
            onClick={() => navigate('/add-post')}
          >
            Create Project {' > '}
          </button>
      </div>
  
  )
  }
  return (
    <div>
      <div className='grid cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center '>
        {posts.map((post) => (
          <div key ={post.$id} className='p-2 sm:w-30 sm:h-30'>
            <PostProject {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProjects
