import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import services from '../appwrite/config'
import parse from 'html-react-parser'

function Post() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()
    const useData = useSelector((state) =>state.auth.user)

    const isAuthor =post && user ? post.userId === user.$id : false

    useEffect(() => {
        if(slug){
            services.getPost(slug).then((post) => {
                if(post)setPost(post)
                else navigate('/')
            })
        }else {
            navigate('/')
        }
    },[slug,navigate])

    const deletePost = () => {
        services.deletePost(post.$id).then((status) => {
            if(status){
                services.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }
  return post ? (
    <div className='py-8'>
        <div className='w-full max-w-7xl mx-auto px-4'>
            <div className='w-full flex justify-center relative border rounded-xl p-2'>
                <img
                src={services.getFilePreview(post.featuredImage)}
                alt={post.title}
                className='rounded-xl'
                />

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to ={`/edit-post/${post.$id}`}>
                        <button className='bg-green-500 mr-3'>
                            Edit
                        </button>
                        </Link>
                        <button className='bg-red-500 ' onClick={deletePost}>Delete</button>
                    </div>
                )}

            </div>
            <div className='w-full mb-6'>
                <h1>{post.title}</h1>
            </div>
            <div className='browser-css'>{parse(post.content)}</div>
        </div>
    </div>
  ):false;
}

export default Post
