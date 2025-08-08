import React,{useCallback} from 'react'
import {Button,Input,Select,TextEditor} from '../components/index';
import {useForm} from 'react-hook-form'
import services from '../appwrite/config';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Textarea from './Textarea';
import Loader from './Loader';
export default function PostForm({post}) {
    const {register, handleSubmit,watch,setValue,control,getValues} =useForm({
        defaultValues: {
            titlle: post?.titlle || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
            demourl : post?.demourl || '',
            githuburl : post?.githuburl || '',
            techstacks: post?.techstacks || '',
        }
    })
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [loader, setLoader] = React.useState(false);

    
    if (!user) {
        return <p className="text-red-500">You must be logged in to create or edit a post.</p>;
    }
    console.log(post);
    const submit = async (data) => {
     
        if (post) {
            const file = data.image[0] ? await services.uploadFile(data.image[0]) : null;

            if (file) {
                services.deleteFile(post.featuredImage);
            }

            const dbPost = await services.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
            console.log(file);
        } else {
            const file = await services.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await services.createPost({ ...data, userid: user.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            console.log(file);
        }
        
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "titlle") {
                setValue("slug", slugTransform(value.titlle), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex  justify-center flex-wrap">
        <div className='grid cols-1  justify-center  md:grid-cols-2  '>
        <div className="w-full px-8 space-y-4 ">
            <Input
                label="Project Name:"
                placeholder="Title"
                className="mb-4 flex flex-col  text-black"
                {...register("titlle", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4 flex flex-col w-1/2 text-black"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <Input
            label="Live Demo url"
            placeholder="https://yourproject.vercel.app"
            type="url"
            className="mb-4 flex flex-col w-1/2 text-black"
            {...register("demourl", { required: true})}

            />
            <Input
            label="Github repo"
            type="url"
            placeholder="https://github.com/you/yourproject"
            className="mb-4 flex flex-col w-1/2 text-black"
            {...register("githuburl",{required:true})}
            />
            <Input
            label="Tech Stacks"
            placeholder="Enter the tech stacks used in your project"
            className="mb-4 flex flex-col w-1/2 text-black"
            {...register("techstacks",{required:true})}
            />
        </div>
        <div className="w-full pl-8">
            <Textarea
                label="Project Description :"
                placeholder="What does your project do?who is it for? How does it work?"
                className='mb-4'
                {...register("content", { required: true })}
            />
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4 flex flex-col w-1/2 text-black"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={services.getFileView(post.featuredImage)}
                        alt={post.titlle}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status :  "
                className="mb-4 "
                {...register("status", { required: true })}
            />
            <div className={`flex justify-center text-white ${post ? "bg-green-500" : "bg-blue-500"}`}>
                <button type="submit" className="w-full" onClick={() => setLoader(true)}>
                    {loader ? <Loader /> :null}
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </div>
        </div>
    </form>
  )
}



