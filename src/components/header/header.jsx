import React from 'react'
import {LogoutBtn,Logo} from '../index';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { path } from 'framer-motion/client';


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

    <div className='w-full  h-16 flex justify-between items-center'>
      <div className='flex items-center gap-1 pl-4'>
        <Logo /> <h1 className='text-white text-2xl '>DevSphere</h1>
      </div>
      <div className=''>
        <ul className='flex flex-row gap-4 pr-4 flex-wrap'>
        {navItems.map((item) => 
          item.active ? (
            <li key={item.label} className='list-none text-white flex items-center'>
              <button className=' duration-300 hover:bg-vercel-color2 w-full h-auto  text-white' onClick={() => navigate(item.path)}>{item.label}</button>
            </li>
          ) : null
        )}
        {authStatus && (
          <li className='list-none flex-shrink-0'>
            <div className='inline-block '>
               <LogoutBtn />
            </div>
           
          </li>
        )}
        </ul>
      </div>
      
    </div>
  )
}


export default Header
