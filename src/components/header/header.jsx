import React from 'react'
import {LogoutBtn,Logo} from '../index';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { path } from 'framer-motion/client';
import HamNav from './HamNav';

function Header() {
  const authStatus=useSelector((state) =>state.auth.status)
  const navigate = useNavigate();
  const navItems =[
    {label: 'Home', path: '/',active: true},
    {label:' Signup', path: '/signup',active:!authStatus},
    {label: 'Login', path: '/login',active:!authStatus},
    {label:'All Projects', path: '/all-post',active:authStatus},
    {label: 'Create Project', path: '/add-post',active:authStatus},
    {label : 'My Projects',path:'/myprojects',active:authStatus}
  ]

  return (
    <>
    <div className='flex items-center pl-4'>
      <HamNav />
      <div className='w-full  h-16 flex items-center justify-center'>
     
      <div className='flex items-center  justify-center gap-1 pl-4'>
        <Logo /> <h1 className='text-white text-2xl '>DevSphere</h1>
      </div>
      
      
    </div>
    </div>
    
    </>
  )
}


export default Header
