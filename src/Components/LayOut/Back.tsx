import { Outlet} from "react-router-dom"
import React,{ CSSProperties } from 'react';
import { AuthProvider } from "./AuthProvider";


const background ={
    backgroundColor:"#e3e3e3" ,
    
    
}as CSSProperties  
  
function Back() {
  return (<body style={background}>
    <div  className="big_div back-phone"  >
                                

    <AuthProvider><Outlet/></AuthProvider>



   </div>
  </body>)
}

export default Back
