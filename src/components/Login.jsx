import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authlogin } from '../store/authSlice'
import { Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import Loader from './Loader'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError('');
        setLoading(true);
        try {
            await authService.logout();
            const session = await authService.login(data);
            if (session) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(authlogin(user));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] px-4'>
            {/* Background Aesthetic Blur */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-teal-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className='w-full max-w-md z-10'>
                <div className='bg-[#111111] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm'>
                    
                    {/* Header Section */}
                    <div className='flex flex-col items-center mb-10'>
                        <div className='mb-4 transform hover:scale-105 transition-transform duration-300'>
                            <Logo width="50px" />
                        </div>
                        <h2 className='text-white text-3xl font-semibold tracking-tight'>Welcome Back</h2>
                        <p className='text-gray-400 mt-2 text-sm text-center'>
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {error && (
                        <div className='mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20'>
                            <p className='text-red-500 text-sm text-center font-medium'>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(login)}>
                        <div className='space-y-5'>
                            {/* Email Input */}
                            <div>
                                <Input
                                    label='Email'
                                    type='email'
                                    className='bg-[#0a0a0a] border-white/5 text-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200'
                                    placeholder='name@example.com'
                                    {...register('email', {
                                        required: 'Email is required',
                                        validate: (value) =>
                                            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email format'
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <Input
                                    label='Password'
                                    type='password'
                                    className='bg-[#0a0a0a] border-white/5 text-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200'
                                    placeholder='Enter your password'
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className='group relative w-full flex justify-center items-center py-3 px-4 mt-4 text-sm font-bold rounded-lg text-black bg-white hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed'
                            >
                                {loading && (
                                    <span className="mr-2">
                                        <Loader />
                                    </span>
                                )}
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <p className='text-center text-sm mt-8 text-gray-400'>
                        Don't have an account?{' '}
                        <Link 
                            to='/signup' 
                            className='text-white font-medium hover:text-teal-400 underline underline-offset-4 transition-colors'
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className='mt-8 text-center text-xs text-gray-600 tracking-widest uppercase'>
                    Protected by Secure Authentication
                </p>
            </div>
        </div>
    )
}

export default Login
