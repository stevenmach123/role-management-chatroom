import React,{ CSSProperties, useEffect } from 'react';
import NavBar from "./NavBar"
import { Navigate, Outlet } from 'react-router-dom';
import { AuthP } from './AuthProvider';



const v = {
  border:'1px solid none',
  height:'99vh',
  display:'flex',
  flexDirection:'column'
} as CSSProperties

function Home() {
  const {user} = AuthP()
  useEffect(()=>{
   /* if(setSocket)
      setSocket(io(`http://localhost:${properties.soc_port}`,{query:{customid:user?.current.id} }));  */
      
  },[])

  return (<section style={v}> 
    <NavBar ></NavBar>
    <Navigate to={`intro/${user?.current.name}`}></Navigate>
    <Outlet></Outlet> 
  </section>)
}

export default Home
