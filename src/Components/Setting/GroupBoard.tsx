import React,{useState,MouseEvent,useEffect} from 'react'
import  '../UserLayOut/UserLayout.css'
import '../UserLayOut/User.css';
import { useSearchParams, Outlet, NavLink, useLocation, useParams, Navigate, useNavigate, useResolvedPath, useOutletContext } from 'react-router-dom';
import { AuthP, auth } from '../LayOut/AuthProvider';
import { identifyRole, identifyRole2, checkPermit, sort_sup } from '../../route_services/service_funs';
import { Sleep, user_mode, } from '../../model';
import { ser1 } from '../../route_services/axiosService';
import Alert from 'react-bootstrap/Alert'
import FetchService from '../../route_services/FetchService';
import { mock_error_api } from '../../route_services/service_funs2';
import { res1 } from '../../route_services/type';

const color_rad = (color:string)=> `linear-gradient(to bottom right,${color} 30%,rgb(222, 209, 170) 80%)`
export const GroupBoard:React.FC = ()=> {
  const [type_ram,setType]  = useSearchParams();  

  const {cate,user,myusers,my_spec_user} = AuthP()
  const cate_ar = user?.current?.manage &&  user?.current?.manage.length >0 ?  Object.entries(cate as unknown as {[key:string]:string}).filter(v=> (user.current.manage as Array<string>).includes(v[0])) :[] 

  const myusers2 = myusers?myusers.filter(x=>cate_ar.find(v=>identifyRole(x.role) !==1 && identifyRole(x.role) !== -1 && x?.class === v[0] )) :[]
  const current_users = type_ram.get("type") ? myusers2.filter(u=>u.class === type_ram.get('type') ).sort((a,b)=>sort_sup(user,a,b)):myusers2.sort((a,b)=>sort_sup(user,a,b))
  const navi  =useNavigate()
  const current_path = useResolvedPath('.',{relative:'route'});
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

//// Navigate handle 
useEffect(()=>{
    
    const user_exist = myusers2.find(u=>u.class === type_ram.get('type'))
    const spec_user_exist  = myusers2.find(x=>x.id === my_spec_user?.id)
    const name = spec_user_exist?.name
    const id = spec_user_exist?.id

    console.log("spec_user_exist",my_spec_user?.id,myusers2,spec_user_exist)
    if(type_ram.get('id') === my_spec_user?.id && !spec_user_exist?.class){
      if(type_ram.get('type') )
        user_exist?navi(`${current_path.pathname}?type=${type_ram.get('type')}`): navi(`${current_path.pathname}`)
      else
          navi(`${current_path.pathname}`)
    }
    else if(type_ram.get('id') === my_spec_user?.id  ){
      
      const no_type_ram = new URLSearchParams(type_ram)
      name && no_type_ram.set('name',name); id &&no_type_ram.set('id',id)
      const type_ram_refine = new URLSearchParams(no_type_ram)
      no_type_ram.delete('type')
      if(type_ram.get('type'))
        user_exist?navi(`${current_path.pathname}/${type_ram.get('name')}?${type_ram_refine} `):navi(`${current_path.pathname}/${type_ram.get('name')}?${no_type_ram} `) 
      else  
        navi(`${current_path.pathname}/${type_ram.get('name')}?${no_type_ram} `)  
    }
    else if(!user_exist && type_ram.get('type')){
      const no_type_ram = new URLSearchParams(type_ram)
      no_type_ram.delete('type')
      if(no_type_ram.size ===0)
        navi(`${current_path.pathname}`) 
      else if(type_ram.get('name'))
       navi(`${current_path.pathname}/${type_ram.get('name')}?${no_type_ram}`)
      
    }
  
},[my_spec_user])



/////







const FillUsers = current_users.map((u,i)=>{ 
  
  return (
    <div key={u.name} className='px-2 py-1'> 
      <NavLink  id={u.name}  className={`linking unactive ${({isActive}:any)=>isActive?"active":""}`}  to={`${u.name}?${clickUser(u)}${fix()}`}  ><div  className='tar_block' >{u.id === user?.current?.id?<>Myself</>:<>{u.name}</>}</div> </NavLink>
    </div>
  )
})
  
  return (
    <div className="bb div_adjust self-center">
      <section className="con">
          {Mycategories}
          <div  className='text-decoration-underline' style={{fontSize:"1rem"}} onClick={(e)=>typeFind(e,null)}  >Cancel filter</div>
      </section>
      <div className='sec-box div_adjust'>{
        myusers2.length ===0?<>No students found</> :<>
          <div className="item-box one">
          
            {FillUsers}
          </div> 
          <div className="item-box two ">
            <Outlet /> 
          </div>
          </>
    }</div>
      
      
      
    </div>
  )
}


export const Useri:React.FC = ()=>{
    const x = useLocation()
    const [param,setPram]  = useSearchParams()
     
    const [student,setStu] = useState<user_mode>()
    const {vvv,user,my_spec_user} = AuthP()
    const {loading,fun,error} =FetchService()
    const support = async()=>{
      const ram = new URLSearchParams()
      try{
        if(!param.get('name') || !param.get('id') )
          throw 'Missing properties' 
        
        
        ram.set('name',param.get('name') as string)
        ram.set('id',param.get('id') as string)
        const token = await vvv?.getIdToken()
        const stu =await fun<user_mode,string,{}>({endpoint:'getNStudent',datas:ram.toString(),params:{'id_token':token}})
       
        console.log("mystu",stu)
        stu && setStu(stu)
      
      }catch(e:any){
         mock_error_api({error:e,where:'user'})
             
      }
    }
    useEffect(()=>{
       console.log('hello')
       support()  
    },[x])

    

    const kick = async (e:any)=>{
      try{
       const token = await vvv?.getIdToken()
      if(identifyRole(student?.role) ===3){
        
        const myusers = await fun<res1,object,{}>({endpoint:'postStudent',datas:{class:'',id:student?.id},params:{'id_token':token}})
        let my_type =student?.class as string
        const cate_exist = myusers?.allstudent?.find(u=>my_type === u?.class)
        if(!cate_exist && my_type)
          await fun({endpoint:'deleteType',datas:my_type})  

      }
      else {
        const v =document.querySelector('.warn-admin') as HTMLElement;
        v.classList.add('active');
        (e.target as HTMLButtonElement).disabled = true;
        await Sleep(2000);
        v.classList.remove('active');
        (e.target as HTMLButtonElement).disabled = false;
       }
      }catch(e:any){
        mock_error_api({error:e,where:"useri"})
      } 

  
    }
    
    return(<div>{
      error?<>{error}</>:
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

    }</div>)

} 



