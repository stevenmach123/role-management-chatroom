import { isAxiosError } from 'axios';
import React, { Component,CSSProperties,useEffect,useState  } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { axios1, ser1 } from '../../route_services/axiosService';
import { AuthP } from '../LayOut/AuthProvider';



const img = {
  maxWidth:'3rem',
  display:'inline-block',
  pointerEvents:'auto',
  cursor:'pointer',
  
} as CSSProperties
const div = {
  border:"1px solid red",
  
} as CSSProperties

const log = {
  justifySelf:'center',
    position:"relative",
    left:"50%",
    width:"fit-content",
    transform:"translateX(-50%)",
    
}   as CSSProperties  

const tt ={
  padding:"0.6rem 1rem " 
} as CSSProperties

const log2 = {
  position:"absolute",

   /*left:"50%",  with absolute, still coordinate with parent */ 
} as CSSProperties

const  Login = ()=>{
    const linku = useLocation()
    const [inIndex, setInIndex] = useState();
    const {user,setfresh,signin,signinG,signinF} = AuthP()
    const [err,setErr]  = useState<boolean>(false)  
    const navigate = useNavigate()
    
   
    useEffect(()=>{
     
      setTimeout(()=>{
        
        linku.state = {}
        setInIndex(linku.state)
      },5000)
    },[linku])
   const submitForm =async (e:any)=>{
      e.preventDefault()
      const name = e.target.name.value
      const pass = e.target.pass.value
      if(!name || !pass)
        return
      const x = new URLSearchParams()
      x.set('name',name);x.set('pass',pass)
      try{
       let res = await ser1.getStudent(x)
        if(signin)
           signin(res.data)
          
        navigate('/home')
        //setUser(res.data)
        if(user ){
          user.current = res.data         
        
        }
      }
      catch(e:any){
        
          if(e?.response){
            console.log(e.response.status,e.response.statusText)
            if(e.response.status === 400 || e.response.status ===401)
              setErr(true)
          }
          else if(e.request)
           console.log(e.request)
          else
            console.log('No response')
      }

   }
    //console.log(linku) 
     console.log(user) 
  
    return (
      <section  className="flex flex-col justify-center items-center   h-full">
          {linku.state?.success ?  
            <div style={tt}  className={`flex justify-between  items-center gap-x-6 text-xl bg-green-400`}> 
              <i style={{color:'green',fontSize:'200%'}} className="bi bi-check"></i>
              <p>Register user sucess </p>
            </div>
          :null}
          {err && <div style={tt}  className={`flex justify-between  items-center gap-x-6  text-xl bg-red-300`}> 
            <i style={{fontSize:'200%'}} className="bi bi-x text-red-600"></i>
            <p>Username and/or Password not correct </p> 
          </div>
          }

       

        <form  onSubmit={submitForm} className="w-1/2 pb-3 relative">  {/* try absolute here, with (2) when no relative/absolute */}
            <div className="form-group pb-2">
                <label className="pb-2" >Username</label> <br/>
                <input className="w-full text-black"  name="name" />
                
            </div>
            <div  className="form-group pb-2">
                <label className="pb-2" >Password</label>   <br/>
                <input className="w-full text-black" name="pass" />
                
            </div>  
            <div  className="relative flex"> {/*(2)  with/without absolute.    with absolute:child elements still relative to this box. But this big box is relative to closet relative friend/parent element   */} {/*without absolute:child is not relative to this box.But, this big box relative to closet friend/parent element */}
              <button style={log}  type="submit" className="btn btn-outline-primary"  >SignIn</button>  {/* position:relative interfere transform. Display:block - make nav-link wrap button (become div), so transform work normal  */}
              <p style={log2} className='text-2xl '> Need Account?  <NavLink to="/signup"  className="underline font-bold  decoration-orange-400  text-orange-400 hover:text-orange-400 " > Sign Up</NavLink ></p>

            </div> 
  
        </form>
         { /* before  <div  className="relative w-1/2"> is here*/ }
         <div className="w-1/4 flex gap-3 relative right-7">
          <div onClick={signinG} style={img}> <img src="/google_img.png"/> </div>
          <div onClick={signinF} style={img}> <img src="/facebook_img.jpeg"/></div>
        </div>
      </section>
    )

}

export default Login


/* 
const [error,setError] = setState<string>("")
const [load,setLoad]  = setState<boolean>(true)

load?<section>loading...</section>:
error?</section>:<section>loading...</section>



if 
*/