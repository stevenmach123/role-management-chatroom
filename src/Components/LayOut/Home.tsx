import React, { ChangeEvent,CSSProperties, useRef,useEffect } from 'react';
import NavBar from "./NavBar"
import {ser1} from '../../route_services/axiosService'
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthP } from './AuthProvider';
import { io,Socket } from "socket.io-client";
import { properties } from '../../model';


const v = {
  border:'1px solid red'
}

function Home() {
  const {setSocket,user} = AuthP()
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
