import React, { useCallback } from 'react'
import { Button, Input, Select, TextEditor } from '../components/index';
import { useForm } from 'react-hook-form'
import services from '../appwrite/config';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Textarea from './Textarea';
import Loader from './Loader';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            titlle: post?.titlle || '',
            content: post?.content || '',
            slug: post?.slug || '',
            status: post?.status || 'active',
            demourl: post?.demourl || '',
            githuburl: post?.githuburl || '',
            techstacks: post?.techstacks || '',
        }
    })
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [loader, setLoader] = React.useState(false);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg">
                    You must be logged in to create or edit a post.
                </p>
            </div>
        );
    }

    const submit = async (data) => {
        setLoader(true);
        try {
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
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
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
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    {post ? "Edit Project" : "Add New Project"}
                </h1>
                <p className="text-gray-400 mt-1">Fill in the details to showcase your work.</p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl shadow-sm space-y-4">
                        <Input
                            label="Project Name"
                            placeholder="My Awesome App"
                            className="bg-[#1e1e1e] border-white/5 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            {...register("titlle", { required: true })}
                        />
                        <Input
                            label="Slug"
                            placeholder="project-slug"
                            className="bg-[#1e1e1e] border-white/5 text-white italic opacity-80"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <Textarea
                            label="Project Description"
                            placeholder="What does your project do? How does it work?"
                            className='bg-[#1e1e1e] border-white/5 text-white min-h-[200px]'
                            {...register("content", { required: true })}
                        />
                    </div>

                    <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Live Demo URL"
                            placeholder="https://..."
                            type="url"
                            className="bg-[#1e1e1e] border-white/5 text-white"
                            {...register("demourl", { required: true })}
                        />
                        <Input
                            label="GitHub Repo"
                            type="url"
                            placeholder="https://github.com/..."
                            className="bg-[#1e1e1e] border-white/5 text-white"
                            {...register("githuburl", { required: true })}
                        />
                        <div className="md:col-span-2">
                            <Input
                                label="Tech Stacks"
                                placeholder="React, Node.js, Appwrite..."
                                className="bg-[#1e1e1e] border-white/5 text-white"
                                {...register("techstacks", { required: true })}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl shadow-sm space-y-4">
                        <Input
                            label="Featured Image"
                            type="file"
                            className="bg-[#1e1e1e] border-white/5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />

                        {post && (
                            <div className="w-full relative group">
                                <img
                                    src={services.getFileView(post.featuredImage)}
                                    alt={post.titlle}
                                    className="rounded-xl object-cover w-full aspect-video border border-white/10"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-xs text-white">
                                    Current Image
                                </div>
                            </div>
                        )}

                        <Select
                            options={["active", "inactive"]}
                            label="Visibility Status"
                            className="bg-[#1e1e1e] border-white/5 text-white"
                            {...register("status", { required: true })}
                        />

                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                                post 
                                ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                                : "bg-blue-600 hover:bg-blue-500 text-white"
                            } disabled:opacity-50`}
                        >
                            {loader ? <Loader /> : (post ? "Update Project" : "Publish Project")}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}