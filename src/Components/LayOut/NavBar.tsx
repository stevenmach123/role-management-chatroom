import {NavLink } from "react-router-dom"
import React,{ CSSProperties, MutableRefObject, RefObject } from "react"
import './NavBar.css'
import { AuthP } from './AuthProvider';
import { checkPermit, colorRole } from "../../route_services/service_funs";

const nolink = {
    textDecoration:"none",
    color:"black",
    
    marginRight:"-0.1rem",

} as CSSProperties

const div = {
    border:'1px solid red'
}

function NavBar() {
  const {user,logout} = AuthP()

  return (
    <div >
     <nav  className="phone navbar navbar-expand text" >     
        <div className="navbar-brand"><NavLink style={nolink} className="phone home-text"  to={`intro/${user?.current?.name}`}>Home</NavLink></div>
       
        <ul  className="navbar-nav">{ 
        user?.current?.role && (
            checkPermit(user.current.role,1)? 
             <>
                <li className="nav-item">
                <NavLink  to="add" className="nav-link">Add</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink  to="users" className="nav-link">Users</NavLink>
                </li>
            </>:checkPermit(user.current.role,...[2,3])?
            <>
                <li className="nav-item">
               {/*<NavLink  to="userss/usersetting" className="nav-link">Setting</NavLink> try (2) */}
                <NavLink  to="userss" className="nav-link">Setting</NavLink>  
                </li>
                <li className="nav-item">
                    <NavLink  to="chatroom" className="nav-link">ChatRoom</NavLink>
                </li> 

            </>
        :
            null

        )}</ul>
        
      
       

        <ul  className="navbar-nav ms-auto">
           
            <li className=" my-auto nav-item"> 
                <div className="relative  dropdown btn-group"> 
                    <div className=" user_img phone dropdown-toggle" data-toggle="dropdown" data-bs-toggle="dropdown"> <img className="tuser_img" src="/user_img.png" alt="image" /></div>
                    <div className="dropdown-menu dropdown-menu-end menu x">
                        <NavLink className="dropdown-item" to={`intro/${user?.current?.name}`} style={{color:colorRole(user?.current.role)}} >{user?.current.name}</NavLink>
                        <NavLink className="dropdown-item" to={`myinfo/${user?.current?.name}`}>My info</NavLink>
                        <NavLink className="dropdown-item " to={`updateinfo/${user?.current?.name}`}>Update info</NavLink>
                        <a onClick={logout} style={{color:'red'}} className="dropdown-item" >Logout</a>
                    </div>
                </div> 
                

            </li>
            

        </ul> 
      
        
    </nav>
    
    </div>
  )
}

export default NavBar
