import React,{useState,useEffect} from 'react'
import services from '../appwrite/config'
import PostProject from '../components/PostProject'

function Home() {
    const [posts,setPosts] = useState([])

    useEffect(() => {
        services.getPost().then((posts) => {
          if(posts){
            setPosts(posts.documents)
          }
        })
    },[])

    if(posts.length === 0){
      return (
        <div className='w-full py-8 text-center'>
          <h1 className='text-white hover:text-gray-400'>Login to read all Posts</h1>
        </div>
      )
    }
  return (
    <div>
      <div className='w-full py-8'>
        <div className='flex flex-wrap'>
          {posts.map((post) =>
            <div key={post.$id} className='p-2'>
              <PostProject {...post} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
