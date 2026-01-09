import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Form, Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import Loader from './Loader'

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false);

    const userSignup = async (data) => {
        setError('')
        setLoader(true) // Ensure loader is set here to match your logic
        try {
            await authService.logout();
            const user = await authService.createAccount(data)
            if (user) {
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(login(user))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] px-4'>
            {/* SaaS Card Container */}
            <div className='w-full max-w-md bg-[#161616] border border-white/10 p-8 rounded-2xl shadow-2xl'>
                
                <div className='flex flex-col items-center mb-8'>
                    <div className='mb-4'>
                        <Logo width="60px" />
                    </div>
                    <h1 className='text-white text-3xl font-bold tracking-tight'>Create account</h1>
                    <p className='text-gray-400 mt-2 text-sm'>Start your journey with us today.</p>
                </div>

                {error && (
                    <div className='bg-red-500/10 border border-red-500/50 p-3 rounded-lg mb-6'>
                        <p className='text-red-500 text-sm text-center font-medium'>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(userSignup)} className='mt-4'>
                    <div className='space-y-5'>
                        <div>
                            <Input
                                label='Full Name'
                                type='text'
                                placeholder='John Doe'
                                className="bg-[#1e1e1e] border-white/5 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                {...register('name', { required: true })}
                            />
                        </div>

                        <div>
                            <Input
                                label='Email Address'
                                type='email'
                                placeholder='name@company.com'
                                className="bg-[#1e1e1e] border-white/5 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                {...register('email', {
                                    required: true,
                                    validate: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email format'
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label='Password'
                                type='password'
                                placeholder='••••••••'
                                className="bg-[#1e1e1e] border-white/5 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                {...register('password', {
                                    required: true,
                                    validate: (value) => value.length >= 6 || 'Password must be at least 6 characters long'
                                })}
                            />
                        </div>

                        <div className='pt-2'>
                            <button
                                type="submit"
                                disabled={loader}
                                className='group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 disabled:opacity-70'
                            >
                                {loader ? (
                                    <div className="flex items-center gap-2">
                                        <Loader /> <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <div className='mt-8 text-center'>
                    <p className='text-gray-400 text-sm'>
                        Already have an account?{' '}
                        <Link 
                            to='/login' 
                            className='text-white font-medium hover:text-blue-400 underline underline-offset-4 transition-colors'
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Subtle background glow for SaaS aesthetic */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"></div>
            </div>
        </div>
    )
}

export default Signup