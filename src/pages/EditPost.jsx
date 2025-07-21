import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/config'
import PostForm from '../components/PostForm'
function EditPost() {
    const [post,setPosts]=useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(slug){
            services.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }else{
                    navigate('/')
                }
            })
        }

    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <div className='w-full max-w-7xl mx-auto px-4'>
            <PostForm post={post} />
        </div>
    </div>
  ) : null
}

export default EditPost
