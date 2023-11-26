import React,{ useEffect } from 'react';
import NavBar from "./NavBar"
import { Navigate, Outlet } from 'react-router-dom';
import { AuthP } from './AuthProvider';



const v = {
  border:'1px solid red'
}

function Home() {
  const {user} = AuthP()
  useEffect(()=>{
   /* if(setSocket)
      setSocket(io(`http://localhost:${properties.soc_port}`,{query:{customid:user?.current.id} }));  */
      
  },[])

  return (<> 
    <NavBar ></NavBar>
    <Navigate to={`intro/${user?.current.name}`}></Navigate>
    <Outlet></Outlet> 
  </>)
}

export default Home
