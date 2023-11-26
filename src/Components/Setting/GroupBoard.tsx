import React,{useState,MouseEvent,useEffect} from 'react'
import  '../UserLayOut/UserLayout.css'
import '../UserLayOut/User.css';
import { useSearchParams,Outlet,NavLink,useLocation,useParams, Navigate } from 'react-router-dom';
import { AuthP, auth } from '../LayOut/AuthProvider';
import { identifyRole, identifyRole2, checkPermit } from '../../route_services/service_funs';
import { Sleep, user_mode } from '../../model';
import { ser1 } from '../../route_services/axiosService';
import Alert from 'react-bootstrap/Alert'

const color_rad = (color:string)=> `linear-gradient(to bottom right,${color} 30%,rgb(222, 209, 170) 80%)`
export const GroupBoard:React.FC = ()=> {
  const [type_ram,setType]  = useSearchParams();  

  const {cate,user,myusers} = AuthP()
  const cate_ar = user?.current?.manage &&  user?.current?.manage.length >0 ?  Object.entries(cate as unknown as {[key:string]:string}).filter(v=> (user.current.manage as Array<string>).includes(v[0])) :[] 
  const myusers2 = myusers?myusers.filter(x=>cate_ar.find(v=>identifyRole(x.role) !==1 && identifyRole(x.role) !== -1 && x?.class === v[0] )) :[]
  const current_users = type_ram.get("type") ? myusers2.filter(u=>u.class === type_ram.get('type') ).sort((a,b)=>(a.name as any)-(b.name as any)):myusers2.sort((a,b)=>(a.name as any)-(b.name as any))
  
  const Mycategories = cate_ar.map(cat=>
    <div key={cat[0]} style={type_ram.get('type')===cat[0]?{backgroundImage:color_rad(cat[1]),color:"black"}:{border:`1px solid ${cat[1]}`,color:cat[1]}} onClick={(e)=>typeFind(e,cat[0])} className="cate">{cat[0]}</div>  
  )
  const typeFind = (e:MouseEvent,type:string|null)=>{
    
    setType(cur_type=>{
        if(type)
            cur_type.set("type",type);
        else
            cur_type.delete("type"); 
        return cur_type
    })

}  
const clickUser = (user:user_mode) =>{
  if(user?.id && user?.name){
     const pram = new URLSearchParams()
    pram.set('name',user.name)
    pram.set('id',user.id)
    
      return pram
  }
  return null
}
const fix = ()=>{
  //${type_ram.get('type')?"&type="${type_ram.get('type')}:''}  }`

  
  if(type_ram.get('type'))
    return '&type=' + type_ram.get('type')
  else 
    return ''
}
const FillUsers = current_users.map((u,i)=>{ 
  if(u.name === user?.current?.name && u.id === user?.current?.id)
   return null
  return (
    <div key={u.name} className='px-2 py-1'> 
      <NavLink  id={u.name}  className={`linking unactive ${({isActive}:any)=>isActive?"active":""}`}  to={`${u.name}?${clickUser(u)}${fix()}`}  ><div  className='tar_block' >{u.name}</div> </NavLink>
    </div>
  )
})
  
  return (
    <div className="bb">
     
      <section className="con">
          {Mycategories}
          <div  className='text-decoration-underline' style={{fontSize:"1rem"}} onClick={(e)=>typeFind(e,null)}  >Cancel filter</div>
      </section>
      <div className='sec-box'>
          <div className="item-box one">
           
            {FillUsers}
          </div> 
          <div className="item-box two">
            <Outlet/> 
          </div>

      </div>
      
      
      
    </div>
  )
}


export const Useri:React.FC = ()=>{
    const x = useLocation()
    const [param,setPram]  = useSearchParams()
     const [error,setError] = useState<boolean>(false)
     const [loading,setLoading] = useState<boolean>(true)
    const [erMsg,setEr] = useState<any>('')
    const [student,setStu] = useState<user_mode>()
    const {vvv,user} = AuthP()
    
    const support = async()=>{
      const ram = new URLSearchParams()
      setLoading(false)
      setError(false)
      setEr('')
      
      try{
        if(!param.get('name') || !param.get('id') ){
          
          throw 'Missing properties' 
        }
        
        ram.set('name',param.get('name') as string)
        ram.set('id',param.get('id') as string)
        const token = await vvv?.getIdToken()
        const stu = await ser1.getNStudent(ram,{'id_token':token})
        setLoading(false)
        setEr(false)
        console.log(stu.data)
        setStu(stu.data as user_mode)
      
      }catch(e:any){
         setError(true) 
         setLoading(false)    
         if(typeof e ==='string')
            setEr(e)
         else if(e.response){
           setEr(e.response.data)
           if(e.response.status ===415)
             Navigate({to:'/signin'})
         }
         else{
            setEr(JSON.stringify(e))
         }
             
         
      }
    }
    useEffect(()=>{
       console.log('hello')
       support()  
    },[x])

    const kick = async (e:any)=>{
      try{
       const token = await vvv?.getIdToken()
      if(identifyRole(student?.role) ===3)
        ser1.postStudent({class:'',id:student?.id},{'id_token':token})
      else {
        const v =document.querySelector('.warn-admin') as HTMLElement;
        v.classList.add('active');
        (e.target as HTMLButtonElement).disabled = true;
        await Sleep(2000);
        v.classList.remove('active');
        (e.target as HTMLButtonElement).disabled = false;
       }
      }catch(e:any){
        if(e?.response.status ===415 )
          Navigate({to:'/signin'})
      } 

  
    }
    
    return(<>{
      !Array.from(param.keys()).length?null: 
      loading?<>Loading...</>:
      error?<>{erMsg}</>:
      <section className='px-4 py-2 list-decimal'>
      <div className="content-choice" >    
        <p className="topic">Student Information </p>
        <li>Name: {student?.name}</li>
        <li>Id: {student?.id}</li>
       {student?.class && <li>Class: {student?.class}</li> }
        <li>Role: {identifyRole2(student?.role as {[key:string]:number})}</li>
      <button onClick={e=>kick(e)} className="btn btn-danger" style={{fontSize:'2rem'}}>Kick User</button>
      <Alert className='warn-admin' variant='danger'>Can't kick ones with same or higher role</Alert>
      </div>
      </section>
    }</>)

} 



