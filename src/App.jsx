import React,{use, useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import {Header,Footer} from './components'
import './App.css';
import { Outlet } from 'react-router-dom';
import conf from './conf/conf';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
    .then((user) => {
      if(user){
        dispatch(login({user}));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => {
      setLoading(false);
    })
  },[])
  return !loading ? (
    <div className="min-h-screen bg-black flex flex-col justify-center" style={{margin: 0, padding: 0}}>
      
        <Header />
        <Outlet />
        <Footer />
      

    </div>
  ) : null;
}

export default App;
