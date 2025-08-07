import React ,{useState,useEffect}from 'react'
import {useSelector} from 'react-redux'
import services from '../appwrite/config'
import PostProject from '../components/PostProject'
function AllPosta() {
    const [posts,setPosts]=useState([])
    useEffect(() => {
    services.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const authstatus = useSelector((state) => state.auth.user);
  if(!authstatus){
    return <p className="text-red-500">You must be logged in to view posts.</p>;
  }
  return (
    <div>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostProject {...post} />
            </div>
          ))}
        </div>
      </div>
  )
}

export default AllPosta
