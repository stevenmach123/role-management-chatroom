import { Navigate, NavLink, Outlet } from 'react-router-dom'

import { CSSProperties, useContext} from "react"
import './UserLayout.css'


const div = {
  border:'1px solid orange'
} as CSSProperties
const div2 = {
  border:'1px solid aliceblue'
} as CSSProperties
export function UserLayout() {


  return (
  
    <div  className='div_adjust items-center'>
    <section className="relative self-start">
      <nav  className="navbar navbar-expand p-0 text phone nav_adjust" >
         <ul   className="navbar-nav">     {/*nav_adjust here is also fine*/}
            {/*<li><NavLink className="nav-link" to='.' end >w</NavLink> </li> */}
            <Navigate to="board"></Navigate>
            <li className='nav-item '><NavLink  to="board" className="nav-link">Board</NavLink></li>
            <li className='nav-item'><NavLink  to="chatroom" className="nav-link">ChatRoom</NavLink></li>
        </ul>
      </nav>
    </section>

      
    <Outlet ></Outlet>
     

    </div>


  )
}





