import React from 'react'
import authService from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../store/authSlice'
function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div>
      <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded w-3'>Logout</button>
    </div>
  )
}

export default LogoutBtn
