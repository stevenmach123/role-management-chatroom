import { Navigate, NavLink, Outlet } from 'react-router-dom'

import { CSSProperties, useContext} from "react"
import './UserLayout.css'

const text={
  fontSize: "2.5rem"
} as CSSProperties
export function UserLayout() {

  
  return (
  
    <>
    <header>
      <nav className="navbar navbar-expand" style={text}>
         <ul  className="navbar-nav">     
            {/*<li><NavLink className="nav-link" to='.' end >w</NavLink> </li> */}
            <Navigate to="board"></Navigate>
            <li className='nav-item'><NavLink  to="board" className="nav-link">Board</NavLink></li>
            <li className='nav-item'><NavLink  to="chatroom" className="nav-link">ChatRoom</NavLink></li>
        </ul>
      </nav>

    </header>
      <section className="flex justify-center">
        <Outlet ></Outlet>
      </section>
    </>


  )
}





