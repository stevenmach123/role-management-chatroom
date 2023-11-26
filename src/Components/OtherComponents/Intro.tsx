import React from 'react'
import { NavLink,json,useLoaderData } from "react-router-dom";
import { identifyRole,checkPermit,identifyRole2, colorRole } from "../../route_services/service_funs";
import { AuthP } from "../LayOut/AuthProvider";

export const loaderIntro = ({params,request}:any)=>{

    if(params.info !== 'undefined')
      return 'good'
    else
      throw json("no username",{status:400})
    
    
    
 
}
export default function Intro() {
  const x = useLoaderData() as any
  const {user} = AuthP()

  return (<>
    
      <h2>WELCOME {user?.current?.name} TO MY SCHOOL</h2>
      <h3>Your role is <span style={{color:colorRole(user?.current?.role)}}>{identifyRole2(user?.current?.role)}</span>  </h3><br></br>
      {checkPermit(user?.current?.role,1) ? 
        <>
        <h3>Responsibility</h3>
        <ul style={{fontSize:'1.3rem'}}>
          <li>Manage full user information</li>
          <li>Manage users' chat activity in ChatRoom</li>
          <li>Change user group and personal information</li>  
        </ul>

        <h3>Find users info that need</h3>
        <NavLink to="/home/users"><button className="btn btn-outline-warning btn-lg">Find users</button></NavLink>
     
      </>
      :checkPermit(user?.current?.role,2)?
        <>
          <h3>Responsibility</h3>
          <ul style={{fontSize:'1.3rem'}}>
            <li>Manage user in groups assigned</li>
            <li>Manage users' chat activity in ChatRoom</li>
            <li>Join any group you want ^^</li>  
          </ul>

        </> :
      checkPermit(user?.current?.role,3)?
        <>
          <h3>Responsibility</h3>
          <ul style={{fontSize:'1.3rem'}}>
            <li>Join any group you want ^^</li>  
          </ul>

        </>:null
    

     }
     
  </>)
  
 


  
}
