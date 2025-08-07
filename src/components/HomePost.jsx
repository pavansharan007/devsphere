import React from 'react'
import { useEffect, useState } from 'react';
import services from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import PostProject from './PostProject';

import { useSelector } from 'react-redux';

  
function HomePost() {
    const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    services.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const authStatus = useSelector((state) => state.auth.user);
  if(!authStatus) 
    return (
      <div className='flex flex-col items-center justify-center ' >
        <h1 className='text-white text-2xl'>Please login to view projects</h1>
      </div>
    );  

  return (
    <div>
      <div>
        
      </div>
    </div>
  )
}

export default HomePost
