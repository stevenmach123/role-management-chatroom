import React,{useState,CSSProperties,useRef} from 'react'
import { name_check, password_check } from '../../model';
import { ser1 } from '../../route_services/axiosService';
import  './AddUser.css';
import { AuthP } from '../LayOut/AuthProvider';
import { useNavigate } from 'react-router-dom'

const submitted = ()=>{
   /* ser1.postStudent().catch(e=>{
        
    }) */
}

interface er_ar  {
    name?:string;
    class?:string;
    other?:string;
    pass?:string;
    
   }
   
export default function UpdateInfo() {
    let [err_ar,setEr] = useState<er_ar>({}); 
    const [success,setSuccess] = useState<boolean>(false)
    const success_msg_ref  = useRef<string>('') 
    const {user} = AuthP()


    const password_ref = useRef<HTMLInputElement>(null)
    const name_ref =useRef<HTMLInputElement>(null)
    
  const submit =async (e:any)=>{
      e.preventDefault()
     setSuccess(false)
     setEr({})
     const err = {}  as any
     const pas =password_ref.current?.value
     const name = name_ref.current?.value
    
    try {
     if (pas && name){
        if(!password_check.test(pas))
            err.pass = 'pass not valid'
        if (!name_check.test(name))
            err.name = 'name not valid'
        if(Object.entries(err).length){
            console.log('h1')
            setEr(err) 
            return 
        }
        else {
            console.log('h2')
            await ser1.postStudentUp({name:user?.current.name,id:user?.current.id,new_name:name,new_pass:pas  })
            setSuccess(true)    
            success_msg_ref.current = "Username and Password are updated success !"
        
        }
     }
     else if(pas|| name ){
        if(pas && !password_check.test(pas)){  
            console.log('h3')
            err.pass ='pass not valid' 
            setEr(err) 
            
        }
        else if(pas && password_check.test(pas)){
            console.log('h4')
            await ser1.postStudentUp({name:user?.current.name,id:user?.current.id,new_pass:pas  })
            success_msg_ref.current = "Password is updated success !" 
            setSuccess(true)
          
        }
        else if(name && !name_check.test(name)){
            console.log('h5')
            err.name ='name not valid' 
            setEr(err) 
        }
        else if(name && name_check.test(name)){
            console.log('h6')
            await ser1.postStudentUp({name:user?.current.name,id:user?.current.id,new_name:name})
            success_msg_ref.current = "Username is updated success !" 
            setSuccess(true)
            
        }
        
    }
    }catch(e:any){
        console.log("student_update",e)
        if(e.response){
            if(e.response.status === 400 || e.response.status ===409){
                err.other = e.response.data
                setEr(err)
            }
        }
        
    }
   
    
  }
  const but_pos ={
    position:"absolute",
    left:"calc(50% - 40px)",
    
} as CSSProperties

  return (<>
    <div>
      <div>Note: Can choose to update 1 or both field</div>
      <form onSubmit={submit} className="mb-5 w-1/2 mx-auto">
        <div className='form-group'> 
        <label>Name</label>
        <input ref={name_ref} className="form-control" name="name" ></input>
        <small className={ err_ar?.name && name_ref.current?.value  ?'instruction':'offscreen'}>
          <li>Must only alphabets </li> 
          <li>Up only to 2 words</li>
          </small>
        </div>
        
        <div className='form-group mb-3'> 
        <label>Password </label>
        <input ref={password_ref}  className="form-control" name="pass" ></input>
        <small className={err_ar?.pass && password_ref.current?.value ?'instruction':'offscreen'}>        
            <li>Must contain at least a characters</li>
            <li>At least a number </li>
            <li>At lease a special character</li>    
        </small> 

        </div>

        <div><button  style={but_pos} className ="btn btn-outline-success" type="submit">Submit</button></div> 

      </form>

    <div className= "relative">{
       (err_ar?.name || err_ar?.pass) &&  <small className="same_label">Some information need to be corrected</small>
    }</div>
    
    <div className ="relative">
        {err_ar?.other &&   <small className="same_label">{err_ar.other}</small> }
    </div>
    <div className ="relative">
        {success &&   <small className="same_label success">{success_msg_ref.current}</small> }
    </div>


    </div>
   </>)
}
