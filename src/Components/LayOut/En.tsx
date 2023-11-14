
import { Navigate, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
let x =0;
export default function En() {
    const find = useLocation()
    const t = useNavigate()
   console.log(find)
    return (<>
          {/*  <>{find.state?.user?<Navigate to="home"/>:<> login<Navigate to="home/intro"/></> } </> */}
        <Navigate to="signin"/>   
        <Outlet></Outlet>
      
    </>)
}


/*
<>{find.state?.user?<Navigate to="/home"/>: <Navigate to="login"/>}

*/

/* 
    + when
      <Route  path="/" element={<En/>} >
          <Route path"login" element={<Login/>} /> 
           <Route path="home" element={<Home/>} /> 
    </Route> 
    + Outlet/Routes is activate to position the output 
    
    CASE1: 
    let x =0 
    function En(){
        const find = useLocation() 
        console.log(find) 
        return (<>  en {x++} 
             <Navigate to="login"/>
            <Outlet/>
        </>)
    }
    + When from <En> -> <Login> click to <Home>, then re-render <En>
    + Good think is <Outlet> take effect, while <Navigate> is skipped. 
    + No useEffect 
    => SINCE touch <Navigate to="/login" twice or more, no re-render <En>


    CASE 2:
    <button><NavLink to="/home" state={{user:"good"}} replace>Home</NavLink></button>      
 
    console.log(find) 
    function En(){
        {find.state?.user?<Navigate to="/home"/>: <Navigate to="/login"/>}
        return <Outlet/>
    }
    +{path:'/home',search:{user:'hello'} } (1)
        - re-render <En>, touch  <Navigate to="/home"/>, Outlet trig state (1)
    + {path:'/home',search:null } (2)
        - re-render <En>, touch  <Navigate to="/login"/> Outlet trig state (2)
    +  {path:'/login',search:null }  (3)
        - re-render <En>, touch  <Navigate to="/login"/> , Outlet trig state (3) 

    => SINCE touch <Navigate to="/login" twice or more, no re-render <En>
    CASE 2.2 
    <button><NavLink to="/home" state={{userx:"good"}} replace>Home</NavLink></button>      
     function En(){
        {find.state?.user?<Navigate to="home"/>: <Navigate to="/login"/>}
        return <Outlet/>
     }

     +{path:'/home', state:{userx:'hello'} } (1) 
        - re-render <En>, touch   <Navigate to="/login"/> ,Outlet trig state (1)
        - No more re-render, since touch <Navigate to="/login"/> twice 
     + click {path:'/home/intro', state:null } (1) 
        - touch <Navigate to="/login"/> again

    CASE 3: 
    <button><NavLink to="/home" state={{user:"good"}} replace>Home</NavLink></button>      
    useEffect(()=>{
        console.log("//",find)
        if(find?.state?.user){
            t("/home")
        }
        else{
            t("/login") 
        } 
    } ,[])

    function En(){
           <Outlet/>
    }
    + At beginning, in useEffect() touch t('/login'), re-render {path:'/login', state:null } 
    + Click  button, re-render {path:'/home', state:{user:'good'} },useEffect() no trigger. :) 
    + Can freely in <Home> paths 
    * When refresh:
        + Start with previous state path {path:'/home', state:{user:'good'} }, in useEffect(), touch t('/home'), re-render {path:'/home', state:null }  
        + refresh again, Start with {path:'/home', state:null }, touch t('/login') -> re-render {path:'/login'}
    
*/