import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import services from '../appwrite/config'
import parse from 'html-react-parser'
import Loader from '../components/Loader'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.auth.user)

    const isAuthor = post && user ? post.userid === user.$id : false

    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        services.deletePost(post.$id).then((status) => {
            if (status) {
                services.deleteFile(post.featuredImage)
                navigate('/')
            }
        })
    }

    return post ? (
        <div className='py-12 min-h-screen bg-[#0a0a0a] text-white'>
            <div className='max-w-5xl mx-auto px-6'>
                
                {/* Header Section with Actions */}
                <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
                    <div>
                        <h1 className='text-4xl font-extrabold tracking-tight text-white mb-2'>
                            {post.titlle}
                        </h1>
                        <p className='text-gray-400 flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                            Project Case Study
                        </p>
                    </div>

                    {isAuthor && (
                        <div className='flex items-center gap-3'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className='px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm'>
                                    Edit Project
                                </button>
                            </Link>
                            <button 
                                onClick={deletePost}
                                className='px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm'
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Featured Image Hero */}
                <div className='relative group mb-12'>
                    <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000'></div>
                    <div className='relative bg-[#161616] rounded-2xl overflow-hidden border border-white/10'>
                        <img
                            src={services.getFileView(post.featuredImage)}
                            alt={post.title}
                            className='w-full object-cover max-h-[500px]'
                        />
                    </div>
                </div>

                {/* Project Details Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                    
                    {/* Left Column: Description */}
                    <div className='lg:col-span-2 space-y-10'>
                        <section>
                            <h2 className='text-xl font-bold text-white mb-4 flex items-center gap-2'>
                                <span className='w-8 h-[1px] bg-blue-500'></span>
                                Project Description
                            </h2>
                            <div className='text-gray-300 leading-relaxed text-lg bg-[#161616]/50 p-6 rounded-2xl border border-white/5'>
                                {post.content}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Metadata Sidebar */}
                    <div className='space-y-6'>
                        <div className='bg-[#161616] border border-white/10 p-6 rounded-2xl'>
                            <h3 className='text-sm font-bold uppercase tracking-widest text-gray-500 mb-6'>Project Info</h3>
                            
                            <div className='space-y-6'>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase font-bold mb-2'>Tech Stacks</p>
                                    <div className='flex flex-wrap gap-2'>
                                        {post.techstacks.split(',').map((tech, index) => (
                                            <span key={index} className='px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-blue-400'>
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className='pt-4 border-t border-white/5'>
                                    <p className='text-xs text-gray-500 uppercase font-bold mb-3'>Links</p>
                                    <div className='flex flex-col gap-3'>
                                        <a 
                                            href={post.demourl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className='flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group'
                                        >
                                            <span className='text-sm font-medium'>Live Demo</span>
                                            <span className='text-blue-500 group-hover:translate-x-1 transition-transform'>→</span>
                                        </a>
                                        <a 
                                            href={post.githuburl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className='flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group'
                                        >
                                            <span className='text-sm font-medium'>Source Code</span>
                                            <span className='text-gray-400 group-hover:translate-x-1 transition-transform'>→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default Post