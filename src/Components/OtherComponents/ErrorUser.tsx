import React from 'react'
import { NavLink, useAsyncError, useRouteError } from 'react-router-dom'

export default function ErrorUser() {
  const x = useRouteError() as unknown as any;
    console.log("error user",x)
  
  return (
    <div>
        <NavLink to="/home/intro">Return to users page</NavLink> <br></br>
       <p>Error User&nbsp;</p> <br></br>

       {x  && typeof x =='object' && <section> {Object.entries(x).map((ob)=>(
        <li key={ob[0]}><>{ob[0]}</>:&nbsp; <>{ob[1]}</></li>
       )) 
    
       }</section>
       }
       

    </div>
  )
}
