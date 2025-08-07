import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import services from '../appwrite/config'
import parse from 'html-react-parser'

function Post() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()
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
            <div className= 'mb-6 flex flex-row items-center justify-left space-x-4 '>
                <h1 className='text-white '><span className='text-lg font-bold'>Title :</span> {post.titlle}</h1>
            </div>
            <span className='text-lg font-bold'>Content :</span>
            <div className='browser-css '>{parse(post.content)}</div>
        </div>
    </div>
  ):false;
}

export default Post
