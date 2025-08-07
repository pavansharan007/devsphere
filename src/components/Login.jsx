import React,{useState} from 'react'
import { Form, Link,useNavigate } from 'react-router-dom'
import {login as authlogin} from '../store/authSlice'
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
            await authService.logout();
            const session = await authService.login(data);
            if(session){
                const user = await authService.getCurrentUser();
                if(user){
                    dispatch(authlogin(user))
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex flex-col  items-center justify-center ' style={{minHeight: '80vh'}}>
        <div  className=''>
        <div className=' border rounded-xl border-white/10'>
            
            <h2 className='text-white items-center text-2xl justify-center'> Sign In </h2>
            
            {error && <p className='text-red-500 text-center'>{error}</p>  }
            <form onSubmit={handleSubmit(login)}>
                <div className='space-y-4 mt-3 justify-center'>
                    <Input 
                    label='Email'
                    type='email'
                    className='text-white bg-black'
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
                    
            <p className='text-center text-base mt-3 mb-3 text-white'>
                Don't have an account?
                <Link to ='/signup' className='text-white hover:underline hover:text-teal-500' style={{textDecoration:'underline'}}> Sign Up</Link>
            </p>
            
                    <button className='text-black w-full h-10 bg-white rounded-sm border '> Log In</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
