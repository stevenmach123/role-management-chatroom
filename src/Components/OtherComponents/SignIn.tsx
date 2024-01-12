import { isAxiosError } from 'axios';
import React, { Component,CSSProperties,useEffect,useState  } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { axios1, ser1 } from '../../route_services/axiosService';
import { AuthP } from '../LayOut/AuthProvider';
import Sign from './Sign';



const img = {
  maxWidth:'2rem',
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
    fontSize:'0.8rem'
    
}   as CSSProperties  

const tt ={
  padding:"0.6rem 1rem " 
} as CSSProperties

const log2 = {
  position:"relative",

   /*left:"50%",  with absolute, still coordinate with parent */ 
} as CSSProperties

const  Login = ()=>{
    const linku = useLocation()
    const [inIndex, setInIndex] = useState();
    const {user,setfresh,signin,signinG,signinF,f} = AuthP()
    const [err,setErr]  = useState<boolean>(false)  
    const navigate = useNavigate()
    
   
    useEffect(()=>{
      setTimeout(()=>{ 
        linku.state = {}
        setInIndex(linku.state)
      },3000)

    },[])
  
   const submitForm =async (e:any)=>{
      e.preventDefault()
      const name = e.target.name.value
      const pass = e.target.pass.value
      if(!name || !pass)
        return
      const x = new URLSearchParams()
      x.set('name',name);x.set('pass',pass)
      try{
        f?.setGenLoading(true)
       let res = await ser1.getStudent(x)
         
        if(signin)
          await signin(res.data)
          
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
      finally{
        f?.setGenLoading(false)
      }

   }
    //console.log(linku) 
     console.log(user) 
  
    return (
      <section  className="flex flex-col justify-center items-center   h-full">
          {linku.state?.success ?  
            <Sign info={'success'} message={<p>Register user success </p>} />
              
          :null}
         {err && <Sign info={'error'} error={err} message={ <p>Username and/or Password not correct </p>} />}
          
         <div style={{opacity:f?.gen_loading?1:0}} className="wrapper">
            <div className='sign'><Sign  message={<>Loading</>}></Sign></div>
          </div>

        <form  onSubmit={submitForm} className="w-1/2 relative">  {/* try absolute here, with (2) when no relative/absolute */}
            <div className="form-group pb-2">
                <label className="pb-2" >Username</label> <br/>
                <input className="w-full text-black"  name="name" />
                
            </div>
            <div  className="form-group pb-2 ">
                <label className="pb-2" >Password</label>   <br/>
                <input className="w-full text-black" name="pass" />
                
            </div> 
           
             {/*(2)  with/without absolute.    with absolute:child elements still relative to this box. But this big box is relative to closet relative friend/parent element   */} {/*without absolute:child is not relative to this box.But, this big box relative to closet friend/parent element */}
              <div style={log2} className='text-sm '> Need Account?  <NavLink to="/signup"  className="underline font-bold  decoration-orange-400  text-orange-400  " > Sign Up</NavLink ></div> 
              <div>
                <button style={log}  type="submit" className="btn btn-outline-primary"  >SignIn</button>  {/* position:relative interfere transform. Display:block - make nav-link wrap button (become div), so transform work normal  */}
              </div>
            
  
        </form>
         { /* before  <div  className="relative w-1/2"> is here*/ }
         <div  className="w-1/2 flex gap-3 pt-2 relative">
          <div onClick={signinG} style={img}> <img src="/google_img.png"/> </div>
          <div onClick={signinF} style={img}> <img src="/facebook_img.jpeg"/></div>
        </div>
      </section>
    )

}

export default Login


