import React, {CSSProperties} from 'react'
import { NavLink } from 'react-router-dom';
import { Outlet,Navigate } from 'react-router-dom';
import { checkPermit } from '../../route_services/service_funs';
import { AuthP } from '../LayOut/AuthProvider';

const div ={
  border:"1px solid none"
}
const bor = {
   
} as CSSProperties
export default function UserSettingLayout() {
  const {user} = AuthP()
  return (
    <> {checkPermit(user?.current?.role,2)?  
          <nav style={div} className="navbar navbar-expand bottom-4 " >
          <ul  className="navbar-nav">      
              {/* <li className='nav-item'><NavLink  to="." className="nav-link">MySetting</NavLink></li> */}     {/*try(2)*/}
              <li className='nav-item'><NavLink  to={`usersetting/${user?.current.name}`} className="nav-link">MySetting</NavLink></li>    
              <li className='nav-item'><NavLink  to="board" className="nav-link">GroupManage</NavLink></li>
          </ul>
          </nav>
      :null
    }
   <Navigate to={`usersetting/${user?.current.name}`}></Navigate> 
 
    <div style={bor} className="flex justify-center relative bottom-5"> <Outlet/></div>
    


    </>
  )
}
