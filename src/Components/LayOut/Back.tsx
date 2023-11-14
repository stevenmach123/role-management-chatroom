import { Outlet,Routes} from "react-router-dom"
import { CSSProperties } from 'react';
import { AuthProvider } from "./AuthProvider";


const big_div ={
    display: "block",
    justifyContent:"center",
    width: "60%",
    minWidth:"27rem",
    fontSize:'2rem',
    margin:"auto",
    height:"100vh",
    overflow:"visible",
    backgroundColor: "#76a2d9",
    boxShadow: "2px 2px 10px #999" ,
    padding:'20px',
    color:"white",

    
}as CSSProperties 
const background ={
    backgroundColor:"#e3e3e3" ,
    
    
}as CSSProperties  
  
function Back() {
  return (<body style={background}>
    <div style={big_div} >
                                

    <AuthProvider><Outlet/></AuthProvider>



   </div>
  </body>)
}

export default Back
