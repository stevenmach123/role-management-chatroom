import { Navigate, NavLink, Outlet } from 'react-router-dom'

import { CSSProperties, useContext} from "react"
import './UserLayout.css'


const div = {
  border:'1px solid none'
} as CSSProperties
export function UserLayout() {

  
  return (
  
    <div>
    <section className="relative bottom-4">
      <nav className="navbar navbar-expand p-0 text phone" >
         <ul  className="navbar-nav p-0">     
            {/*<li><NavLink className="nav-link" to='.' end >w</NavLink> </li> */}
            <Navigate to="board"></Navigate>
            <li className='nav-item'><NavLink  to="board" className="nav-link">Board</NavLink></li>
            <li className='nav-item'><NavLink  to="chatroom" className="nav-link">ChatRoom</NavLink></li>
        </ul>
      </nav>

    </section>
      <section className="flex justify-center relative bottom-4">
        <Outlet ></Outlet>
      </section>
    </div>


  )
}





