import React from 'react'
import { identifyRole2 } from '../../route_services/service_funs';
import { AuthP } from '../LayOut/AuthProvider';
import '../UserLayOut/User.css'
export default function MyInfo() {
    const {user} = AuthP()
    const v = {
        /*border:'1px solid red', */
        width:'fit-content',
        margin:'auto'
        
      }
    
  return (
    <section style={v} className='bb'>
      <div className="content-choice">
       <p className="topic">Student Full Information</p>
        <div className="ml-4 list-decimal">
            <li>Me is &nbsp;{user?.current.name}</li> 
            <li>Id: {user?.current.id}</li>
            { user?.current.pass && <li>Pass: {user?.current.pass}</li> }
            { user?.current.email && <li>{user?.current.email}</li>  }
            <li>Role:  {identifyRole2(user?.current.role)}</li> 
            { user?.current.class && <li>Class: {user?.current.class}</li>   }
            { user?.current.manage &&<>
              <li>Groups manage: </li> 
              {
                 user?.current.manage.length?
                <> 
                    <div className="ml-4 list-disc">{
                    user?.current.manage.map((u:string)=>
                        <li>{u}</li>  
                    )
                        
                    }</div>
            
                </>:<span>No group assigned yet</span>
             }
            </>}
            
        </div>
      </div>
    
    </section>
  )
}
