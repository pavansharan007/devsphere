import { useEffect, useState } from 'react'
import React from 'react'
import services from '../appwrite/config'
import authService from '../appwrite/auth'
import PostProject from './PostProject'
import { useSelector } from 'react-redux'

function MyProjects(post) {
  const[posts, setPosts] = useState([])
  
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
  return (
    <div>
      <div className='flex flex-wrap justify-center'>
        {posts.map((post) => (
          <div key ={post.$id} className='p-2 '>
            <PostProject {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProjects
