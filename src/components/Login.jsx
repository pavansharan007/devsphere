import React,{useState} from 'react'
import { Form, Link,useNavigate } from 'react-router-dom'
import {login,logout} from '../store/authSlice'
import {Button, Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/auth'


function Login() {
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit}=useForm();
    const [error, setError] = useState('');
    
    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if(session){
                const user = await authService.getCurrentUser();
                if(user){
                    dispatch(login(user))
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='w-full  rounded-xl border-white/10'>
            
            <h2> Sign In </h2>
            <p className='text-center text-base text-white'>
                Don't have an account?
                <Link to ='/signup' className='text-white hover:underline'> Sign Up</Link>
            </p>
            {error && <p className='text-red-500 text-center'>{error}</p>  }
            <form onSubmit={handleSubmit(login)}>
                <div className='space-y-4'>
                    <Input 
                    label='Email'
                    type='email'
                    placeholder='Enter your email'
                    {...register('email', {required: true,
                        validate: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email format' }
                    )}
                    />
                    <Input
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                    {...register('password', {required: true})}
                    />
                    <button className='text-white'> Log In</button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default Login
