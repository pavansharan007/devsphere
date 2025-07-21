import React from 'react'
import services from '../appwrite/config'
import {Link} from 'react-router-dom'



function PostProject({$id ,title,featuredImage}) {
  return (
    <Link to= {`/post/${$id}`}>
      <div className='h-32 w-80 bg-black
      '>
        <div className='h-20 w-full '>
            <img src={services.getFilePreview({featuredImage})} alt={title} className='h-full w-full object-cover' />
        </div>
        <div>
            <h2>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostProject
