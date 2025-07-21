import React ,{useState,useEffect}from 'react'
import services from '../appwrite/config'
import PostProject from '../components/PostProject'
function AllPosta() {
    const [posts,setPosts]=useState([])
    useEffect(() => {
        
    },[])
    services.getAllPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    
  return (
    <div className='w-full py-8'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-wrap'>
          {posts.map((post) => {
            <div key={post.$id} className='w-1 p-2'><PostProject post={post} /></div>
          })}
        </div>
      </div>
    </div>
  )
}

export default AllPosta
