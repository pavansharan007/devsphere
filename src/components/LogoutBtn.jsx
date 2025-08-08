import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../store/authSlice'
import Loader from './Loader'
function LogoutBtn() {
  const dispatch = useDispatch();
  const [loader,setloader]=useState(false);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    setloader(true);
  };

  return (
    <div className='flex items-center justify-center'>
      <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded flex items-center'>{loader? <Loader/> : null}{" "} Logout</button>
    </div>
  )
}

export default LogoutBtn
