import { Navigate, NavLink, Outlet } from "react-router-dom"
import { CSSProperties, MutableRefObject, RefObject } from "react"
import { URLSearchParams } from "url"
import './NavBar.css'
import { AuthP } from './AuthProvider';
import { checkPermit, colorRole } from "../../route_services/service_funs";

const nolink = {
    textDecoration:"none",
    color:"black",
    fontSize:"3.2rem",
    marginRight:"2rem",

} as CSSProperties
const text = {
    fontSize:"2.7rem"
}as CSSProperties 
interface myProps{
    dec:MutableRefObject<boolean>
}
function NavBar() {
  const {user,logout} = AuthP()

  return (
    <>
     <nav  className="navbar navbar-expand" style={text}>     
        <div className="navbar-brand"><NavLink style={nolink} to={`intro/${user?.current?.name}`}>Home</NavLink></div>
       
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
        
       
       

        <ul  className="navbar-nav ms-auto x">
            <li style={{color:colorRole(user?.current?.role)}} className="my-auto nav-item"> 
                Welcome {user?.current?.name}
            </li>
            <li className="nav-item"> 
                <div className="dropdown"> 
                    <div className="user_img dropdown-toggle"  data-bs-toggle="dropdown"> <img className="tuser_img" src="/user_img.png" alt="image" /></div>
                    <div className="dropdown-menu menu">
                    <NavLink className="dropdown-item" to={`myinfo/${user?.current?.name}`}>My info</NavLink>
                    <NavLink className="dropdown-item" to={`updateinfo/${user?.current?.name}`}>Update info</NavLink>
                    <a onClick={logout} style={{color:'red'}} className="dropdown-item" href="#">Logout</a>
                    </div>
                </div> 
                

            </li>
            

        </ul> 
      
        
    </nav>
    
    </>
  )
}

export default NavBar
