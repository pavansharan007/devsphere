import React,{useCallback} from 'react'
import {Button,Input,Select,TextEditor} from '../components/index';
import {useForm} from 'react'
import services from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PostForm(post) {
    const {register, handleSubmit,watch,setValue,control,getValues} =useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
        }
    })
    const userData = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    const submit =async (data) => {
        if(post){
            const file =data.image[0] ? services.uploadFile(data.image[0]):null;

            if(file){
                services.deleteFile(post.featuredImage);
            }
            const update=await services.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if(update){
                navigate(`/post/${update.$id}`);
            }
        }else{
            const file =await services.uploadFile(data.image[0]);
            if(file){
                const fileId= file.$id
                data.featuredImage = fileId;
                const update =await services.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(update){
                    navigate(`/post/${update.$id}`);
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g,'-')
                .replace(/\s/g, '-')

            return ''
        }
    },[])

    React.useEffect(() => {
        const subscription = watch((value,{name}) => {
            if(name==='title'){
                setValue('slug', slugTransform(value.title,{shouldValidate: true}));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                label='Title :'
                placeholder='Enter post title'
                className='mb-2'
                {...register('title', { required: true })}
                />
                <Input
                label='Slug :'
                placeholder='slug'
                className='mb-2'
                {...register('slug', { required: true })}
                onInput={(e) => {
                    setValue('slug', slugTransform(e.target.value), { shouldValidate: true });
                }}
                />
                <TextEditor
                name='content'
                control={control}
                label='Content :'
                defaultValues={getValues('content')}
                />
            </div>
            <div className='w-1/3 px-2'>
                <Input
                type='file'
                label='Featured Image :'
                className='mb-2'
                accept='image/png, image/jpeg ,image/jpg, image/webp, image/gif'
                {...register('image', { required: !post })}
                />
                {post && (
                    <div className='mt-2'>
                        <img src={services.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
                    </div>
                )}
                <Select
                options={['active','inactive']}
                label='Status'
                className='mb-4'
                {...register('status',{required:true})}
                />
                <button type='submit' className='w-full'>{post ? 'Update' : 'Submit'}</button>
            </div>
                
        </form>
    </div>
  )
}



