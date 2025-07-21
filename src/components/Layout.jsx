import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Layout({children,authenticated=true}) {
    const navigate =useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus=useSelector(state => state.auth.status)

    useEffect(()=>{
        if(authenticated && authStatus !==authenticated){
            navigate('/login')
        }else if(!authenticated && authStatus!==authenticated){
            navigate('/')
        }
        setLoading(false);
    },[authStatus,navigate,authenticated])
  return loading ? (
    <h1>loading</h1>
  ) : <>{children}</>
}

