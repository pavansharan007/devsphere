import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { Form, Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error,setError] = useState('')

    const userSignup = async(data) => {
        setError('')
        try {
            await authService.logout();
            const user=await authService.createAccount(data)
            if(user){
                const user = await authService.getCurrentUser()
                if(user){
                    dispatch(login(user))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)

        }
    }
  return (
    <div className='flex flex-col items-center justify-center  ' style={{minHeight: '80vh'}}>
        <div className='justify-center'>
        <h1 className='text-white text-2xl'> Sign Up</h1>
        
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit(userSignup)}>
            <div className='space-y-4  mt-4'>
                <Input
                label='Name'
                type='text'
                placeholder='Enter your name'
                {...register(
                    'name',
                    { required: true }
                )}
                />
                <Input
                label='email'
                type='email'
                placeholder='Enter your email'
                {...register(
                    'email',
                    {
                        required:true,
                        validate:(value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) || 'Invalid email format' 
                    }
                )}
                />
                <Input
                label='password'
                type='password'
                placeholder='enter your password'
                {...register(
                    'password',
                    {
                        required:true,
                        validate:(value) =>value.length >=6 || 'Password must be at least 6 characters long' 
                    }
                )}
                />
                <p className='text-white m-3'>Already Have An account ? <Link to ='/login' className='hover:underline hover:text-yellow-500' style={{textDecoration:'underline'}}>Login</Link></p>
                <div className='justify-center flex'><button type="submit" className='text-black bg-white w-full h-10 rounded-sm'>Create Account</button></div>
            </div>
        </form>
        </div>
    </div>
  )
}



export default Signup
