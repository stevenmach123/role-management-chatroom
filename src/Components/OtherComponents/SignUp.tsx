import React, { Component,CSSProperties,useState ,useRef } from 'react'
import { Navigate, NavLink,useNavigate } from 'react-router-dom'; 

import { isNumber } from 'lodash';
import { name_check, user_mode, password_check } from '../../model';

import { ser1 } from '../../route_services/axiosService';
import { construct_role } from '../../route_services/service_funs';
import { AxiosError } from 'axios';
import { AuthP } from '../LayOut/AuthProvider';

const sign = {
    display:"block",
    position:"relative",
    left:"50%",
    width:"fit-content",
    transform:"translateX(-50%)",
     
}   as CSSProperties  
const sign2 = {
    position:"absolute",
    top:"0%"
  } as CSSProperties 
const instruction = {
    display:"block",
    backgroundColor:"#455d7a",
    color:"white",
    padding: "0.2rem 0rem 0rem 1rem"
} as CSSProperties 


const border ={
    border:"1px solid red"
    
}  as CSSProperties 
const tt ={
    padding:"0.6rem 1rem " 
 } as CSSProperties
 const icon = {
    fontSize:"200%",    
 } as CSSProperties 



type er_ar = {
    name?:string;
    pass?:string;
    role?:string; 
    other?:string;
} 


function SignUp() {
 const [role,setRole] = useState<string>('choose')

 const [err_ar,setEr] = useState<er_ar>({})
 const [err_note,setErr_note]  = useState<er_ar>({}) 
 const count_er  = Object.keys(err_note).length;
 const [success,setSuccess ] =  useState<boolean>(false) 
 const  name_ref = useRef<HTMLInputElement>(null)
 const password_ref = useRef<HTMLInputElement>(null)
 const handle = (e:any)=>{
    setRole(e.target.value)
    
 }


 const name_input = (e:any) =>{
    const val = e.target.value 
    let s = new Map(Object.entries(err_ar));     

      console.log(name_check)
     if(!val || !name_check.test(val)){
      s.set('name',"name not valid") 
      let t = Object.fromEntries(s.entries()) 
      setEr(t)   
     }
     else{
      s.delete("name"); 
      let t = Object.fromEntries(s.entries()) 
      setEr(t) 
     }
   }

const password_input= (e:any)=>{
    const val = e.target.value 
    let s = new Map(Object.entries(err_ar));     

    
    if(!val || !password_check.test(val)){ 
       s.set('pass',"pass not valid")
       let t = Object.fromEntries(s.entries())
       setEr(t)  
    }
    else{         
      s.delete("pass"); 
      let t = Object.fromEntries(s.entries())
      setEr(t)  
    }
     
}

 const submitForm = async (e:any)=>{
    e.preventDefault()
    const name_i = e.target.name.value
    const pass_i = e.target.pass.value
   
    let eu:er_ar ={}
    if(!name_i|| !name_check.test(name_i)){
        eu.name = "name not valid" 
    }
    if(!pass_i || !password_check.test(pass_i) ){
        eu.pass = "pass not valid" 
    }
    
    if(!Number(role)){
        eu.role = "Select a role..."
    }
    if(Object.entries(err_ar).length ){  
         setErr_note(eu);return
    }
   

    try{
    let irole = [parseInt(role)]
    let student:user_mode = {name:name_i,pass:pass_i,role:construct_role(irole)  }
    
     await ser1.putStudent(student)
     
     setErr_note({})
     setSuccess(true)
     console.log('good')
    }
    catch(e:any){
        if(e?.response ){
            if(e.response.status ===409 )
                eu.name = "user is already exist"
            else 
                eu.other = "user is weird"
        }else
            eu.other ="No server response" ;
        console.log(e)
        setErr_note(eu)
    }

 }
 const checkInfo = ():boolean=>{
    console.log(err_note)
    let result = false;
    for(let [k,v] of Object.entries(err_note)){
        if(k !=='role' ){
            if(k ==='name' && (err_note['name'] as string).indexOf('exist') >=0 ){
                return false
            }
            else
                result=true
        }
        
    }
    return result
 } 

  return (<>{success?<Navigate to="/signin" state={{success:"An account registered successfully"}} />:
   
    <section  className="flex flex-col justify-center items-center  h-full ">
       {count_er?
        <div style={tt} id="dam" className={`flex justify-between  items-center text-xl ${err_note?.other?"bg-orange-300":"bg-red-300"}`}> 
            <i  style={icon} className="bi bi-x text-red-600 mr-3" />
            <div>
                {err_note?.role && <p>Role is not selected</p>}
                {err_note?.name && err_note.name.indexOf('exist') >=0 && <p>Username existed</p>}
                {checkInfo()?<p>Some information need to be corrected</p> :null }
            </div>
       </div>
       :null}

       <form onSubmit={submitForm} className="w-1/2 relative">
            <div className="form-group pb-2">
                <label className="pb-2">Username<span>{
                    name_ref.current?.value ?<>{
                        err_ar?.name ?  <i style={{color:'red'}} className="bi bi-x"></i>:
                        <i style={{color:'green'}} className="bi bi-check"></i> 
}                   </>: null
                    }</span>
                
                </label> 
                <br/>
                <input ref={name_ref} onChange={name_input} className="w-full text-black"  name="name" />
                {err_ar?.name && name_ref.current?.value && <small style={instruction}>
                    <li>Must only alphabets </li> 
                    <li>Up only to 2 words</li>
                </small>}
            </div>

            <div  className="form-group pb-2">
                <label className="pb-2">Password<span>{  
                    password_ref.current?.value ?<>{
                        err_ar?.pass   ?   <i style={{color:'red'}} className="bi bi-x"></i>:
                        <i style={{color:'green'}} className="bi bi-check"></i>
                    }</>: null
                    }</span>
            
                </label>  
                
                 <br/>
                <input ref={password_ref} onChange={password_input} className="w-full text-black" name="pass" />
                {err_ar?.pass && password_ref.current?.value && <small style={instruction}>
                <li>Must contain at least a characters</li>
                <li>At least a number </li>
                <li>At lease a special character</li>  
                </small>}
            </div> 
         

            <div className="input-group mb-2">
            
                <select onChange={handle} value={role} className="custom-select text-black" id="is01">
                    <option value="choose">Roles...</option>
                    <option value="3">User</option>
                    <option value="2">Group Manager</option>
                    <option value="1">Admin</option>
                </select> 
                
            </div>
           
            
        <div  className="relative">
            <button type="submit" style={sign} className="btn btn-outline-primary"  >Sign Up</button> 
            <span  style={sign2} ><NavLink to="/signin" className="text-2xl underline font-bold  decoration-orange-400  text-orange-400 hover:text-orange-400 " > Login</NavLink> </span>
        </div>

        {/*<div style={border} className="relative">
            <div style={border} className="relative">dfdf </div>
            <div style={border} className="absolute">dsd</div>
        </div>  */}

    </form>
    </section>
    }</>)
}

export default SignUp
/*
const [err_note,setErr_note] = useState<er_ar>(undefined)
const [err_ar,setEr]  = useState<er_ar>({}) // {name:/used with constant onChange/ ,myoption:/check valid when submitForm   / }
handleInput1 =(val:string )=>{
    let regex1 
    let ar = Object.entries(err_ar)
    if(regex1.test(val)){
        if(ar.find(x=>x[0] !== 'name'))
            ar.push(['name',"val"])
        setEr(Object.fromEntries(ar))
    }
    else{
        ar.filter(x=>x[0] !=='name')
        setEr(Object.fromEntries(ar)) 
    }
}

EXAMPLE 1:
submitForm(e:any){
    let name_i = e.target.name
     
    let eu =  Object.assign({},err_ar)
    if(!myoption.valid()){
        eu.myoption = ""
    }
    if(Object.keys(eu)){
        setErr_note(eu)
        return 
    }
    let student = {name:name_i ,myoption: myoption_i }
    await ser1.post(student).then(r=>{
        setErr_note({})
    }).catch(e=>{
        if(e?.respond){
            //eu.other
        }
        else{
            //eu.other = "No server response"
        }
        setErr_note(eu)
    })   
}
HTML:
<>
{err_note && !Object.keys(err_note):<>success</>?
    <>
    <small>{err_note?.myoption?<>err_note.myoption</>:null }</small>
    <small>{err_note?.other?<>err_note.other</>:null}</small>
    </>
}
</>


EXAMPLE 2:
const [err_note,setErr_note] = useState<er_ar>({})
const [err_ar,setEr]  = useState<er_ar>({}) 

submitForm(e:any){
    let name_i = e.target.name 
    
    let eu =  Object.assign({},err_ar)  
     if(!myoption.valid()){
        eu.myoption = ""
    }
    if(Object.keys(eu)){
        setErr_note(eu)
        return 
    } 
    setErr_note({success:"no ui error"})
} 
useEffect(()=>{
    if(err_ar.success){
        await ser1.post(student).then(r=>{
            setErr_note(obj=>{obj.done=""; return obj })
        }).catch(e=>{
            if(e?.respond){
                setErr_note(obj=>{obj.other=""; return obj })
            }
            else{
                setErr_note(obj=>{obj.other="No server respond"; return obj })
            }
        })
    }
},err_note) 

HTML:
<>{err_note.success && err_note.done ?success: 
    err_note.success && err_note.other?<>{err_note.other}<>:
    <>
        <small>{err_note?.myoption?<>err_note.myoption</>:null }</small>
    </>

}</>

*/