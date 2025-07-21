import React from 'react'
import {LogoutBtn,Logo} from '../index';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const authStatus=useSelector((state) =>state.auth.status)
  const navigate = useNavigate();
  const navItems =[
    {label: 'Home', path: '/',active: true},
    {label:' Signup', path: '/signup',active:!authStatus},
    {label: 'Login', path: '/login',active:!authStatus},
    {label:'All Projects', path: '/all-post',active:authStatus},
    {label: 'Create Project', path: '/add-post',active:authStatus},
    
  ]

  return (

    <div className=' w-screen h-8 flex justify-between'>
      <div className='border border-white'>
        <Logo />
      </div>
      <div className=''>
        <ul className='flex flex-row gap-4'>
        {navItems.map((item) => 
          item.active ? (
            <li key={item.label} className='list-none text-white'>
              <button className='inline-block duration-300 hover:bg-gray-400 text-white' onClick={() => navigate(item.path)}>{item.label}</button>
            </li>
          ) : null
        )}
        {authStatus && (
          <li className='list-none'>
            <LogoutBtn />
          </li>
        )}
        </ul>
      </div>
      
    </div>
  )
}


export default Header
