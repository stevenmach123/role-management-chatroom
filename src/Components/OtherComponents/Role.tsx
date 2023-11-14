import React,{useState,CSSProperties} from 'react'
import { ser1 } from '../../route_services/axiosService';
import { construct_role } from '../../route_services/service_funs';
import { AuthP } from '../LayOut/AuthProvider';
import { useNavigate } from 'react-router-dom';


const c ={
    border:'',
    display:'flex',
    alignItems:'center',
    flexDirection:'column'
} as CSSProperties
export default function Role() {
  const [role,setRole] = useState<any>() 
  const {user,vvv} = AuthP()
  const navigate = useNavigate()
  const Confirm = async (e:any)=>{
    e.preventDefault()
    const token =await  vvv?.getIdToken()
    const obj:any ={}
    
    try{ 

    if(Number(role)){
        obj['id'] = user?.current.id ; obj['role'] = construct_role([parseInt(role)])
        await ser1.postStudent(obj,{'id_token':token})
        navigate('/home')
    }
    }catch(e:any){
        if(e?.response){
            if(e?.response.status ===415)
                navigate('/signin')
        }  
        console.log('role ',e)
         
    }
  }
  return (  
    <section  className="flex flex-col justify-center items-center  h-full  ">

         <p>New Account created, give yourself a role :)</p>
         <form onSubmit={Confirm} style={c}>
            <div className="input-group mb-2">
                <select name="role" onChange={e=>setRole(e.target.value)} value={role} className="custom-select  text-black" id="is01">
                    <option value="choose">Roles...</option>
                    <option value="3">User</option>
                    <option value="2">Group Manager</option>
                    <option value="1">Admin</option>
                
                </select> 
                
            </div>
          <button type="submit" className='btn btn-success' >Confirm</button>

        </form>

    </section>
  )
}
