import React, {CSSProperties} from 'react'
import { NavLink } from 'react-router-dom';
import { Outlet,Navigate } from 'react-router-dom';
import { checkPermit } from '../../route_services/service_funs';
import { AuthP } from '../LayOut/AuthProvider';


const bor = {
  border:"1px solid red",
  
} as CSSProperties
const bor2 = {
  border:"1px solid yellow",
  
} as CSSProperties


export default function UserSettingLayout() {
  const {user} = AuthP()
  return (
    <section className='div_adjust'> 

    {checkPermit(user?.current?.role,2)?  
          <nav  className="navbar navbar-expand bottom-4 nav_adjust" >
          <ul  className="navbar-nav nav_adjust">      
              {/* <li className='nav-item'><NavLink  to="." className="nav-link">MySetting</NavLink></li> */}     {/*try(2)*/}
              <li className='nav-item'><NavLink  to={`usersetting/${user?.current.name}`} className="nav-link">MySetting</NavLink></li>    
              <li className='nav-item'><NavLink  to="board" className="nav-link">GroupManage</NavLink></li>
          </ul>
          </nav>
      :null
    }
   <Navigate to={`usersetting/${user?.current.name}`}></Navigate> 
     <Outlet/>
    


    </section>
  )
}
