import React,{useCallback} from 'react'
import {Button,Input,Select,TextEditor} from '../components/index';
import {useForm} from 'react-hook-form'
import services from '../appwrite/config';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PostForm({post}) {
    const {register, handleSubmit,watch,setValue,control,getValues} =useForm({
        defaultValues: {
            titlle: post?.titlle || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
        }
    })
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


    console.log(user.$id);
    console.log(post);
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4 text-black"
                {...register("titlle", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <TextEditor
                name='content'
                control={control}
                className='text-white'
                label='Content :'
                defaultValues={getValues('content')}
                />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
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
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}



