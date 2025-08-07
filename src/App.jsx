import React,{use, useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import {Header,Footer} from './components'
import './App.css';
import { Outlet } from 'react-router-dom';
import conf from './conf/conf';

function App() {
  console.log("Appwrite Project:", (conf.appwriteUrl));
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
  const checkUser = async () => {
    try {
      const session = await authService.getCurrentSession(); // Create this function if needed
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, []);


  return !loading ? (
    <div className="min-h-screen  bg-black flex flex-col">
      
        <Header />
        <div className="border-t-2 border-white opacity-10"></div>
        <div className='flex-1'><Outlet /></div>
        
        <Footer />
      

    </div>
  ) : null;
}

export default App;
