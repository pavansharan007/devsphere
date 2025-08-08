import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import services from '../appwrite/config'
import parse from 'html-react-parser'
import Loader from '../components/Loader'
function Post() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const user = useSelector((state) =>state.auth.user)

    const isAuthor =post && user ? post.userid === user.$id : false

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
    <div className='py-8 text-white'>
        <div className='w-full max-w-7xl mx-auto px-4 text-white'>
            <div className='w-full flex justify-center relative items-center rounded-xl p-2'>
                <img
                src={services.getFileView(post.featuredImage)}
                alt={post.title}
                className='rounded-xl'
                />

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to ={`/edit-post/${post.$id}`}>
                        <button className='bg-green-500 mr-3 rounded-sm border border-black'>
                            Edit
                        </button>
                        </Link>
                        <button className='bg-red-500 rounded-sm border border-black' onClick={deletePost}>Delete</button>
                    </div>
                )}

            </div>
            <div className= 'mb-2  items-center justify-left space-x-4 '>
                <h1 className='text-white '><span className='text-lg font-bold'>Project Name :</span> {post.titlle}</h1>
            </div>
            
            <div className='text-white mb-2' >
                <h1 className='font-bold text-white'>Live Demo url :</h1>
                <a href={post.demourl} className='px-4' target="_blank" rel="noopener noreferrer">
                        {post.demourl}
                </a>
            </div>
            <div className='text-white mb-2'>
                <h1 className='font-bold text-white'>Github Url :</h1>
                <a href={post.demourl}  className='px-4' target="_blank" rel="noopener noreferrer">
                        {post.githuburl}
                </a>
            </div>
            <div className='text-white mb-2'>
                <h1 className='text-lg font-bold'>Tech Stacks :</h1>
                <div className='px-4'>{post.techstacks}</div>
            </div>
            <div className='text-white mb-2'>
                <h1 className='text-lg font-bold'>Project Description :</h1>
                <div className='px-4'>{post.content}</div>
            </div>

        </div>
    </div>
  ):false;
}

export default Post
