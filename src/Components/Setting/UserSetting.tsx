import React,{useEffect} from 'react'
import  '../UserLayOut/UserLayout.css'
import '../UserLayOut/User.css'
import { AuthP, auth } from '../LayOut/AuthProvider';
import { colorLogic, construct_role, openModal, openModalTimeOut } from '../../route_services/service_funs';
import { user_mode } from '../../model';
import { ser1 } from '../../route_services/axiosService';
import { Navigate, useLoaderData } from 'react-router-dom';
import Sign from '../OtherComponents/Sign';
import FetchService from '../../route_services/FetchService';
import { res1 } from '../../route_services/type';
import { mock_error_api } from '../../route_services/service_funs2';

export default function UserSetting() {
   const {user,vvv} = AuthP()
   const x = useLoaderData()
   const f = FetchService()
   const Focus_class = (e:any)=> {
    e.preventDefault()
    
    const ee = document.querySelectorAll('.btn-group.classy .btn:focus') 
    const ex = document.querySelectorAll('.btn-group.classy .btn')    
  
    let selected:any;
    ex.forEach(f=>{
      (f as HTMLButtonElement).classList.remove("active");
      (f as HTMLButtonElement).style.removeProperty('background-color');
      (f as HTMLButtonElement).style.removeProperty('color');
      (f as HTMLButtonElement).style.color = (f as HTMLButtonElement).style.borderColor

    })
    ee.forEach(f=>{
      (f as HTMLButtonElement).classList.add("active");
      selected = (f as HTMLButtonElement).value;
      (f as HTMLButtonElement).style.color = "black";
      (f as HTMLButtonElement).style.backgroundColor = (f as HTMLButtonElement).style.borderColor
      
    })      
  }  
  const Confirm = async()=>{
  
    const classy = document.querySelector(".btn-group.classy .btn.active")
    try{
    if(!classy)
        throw "missing a choice "

    
    const param = new URLSearchParams() 
    param.set('name',user?.current.name)
    param.set('id',user?.current.id)
    const token = (await vvv?.getIdTokenResult())?.token;
    const stu = await f.fun<user_mode,object,{}>({endpoint:'getNStudent',datas:param,params:{'id_token':token}})

    const val_class = (classy as HTMLButtonElement).value
    const old_class = stu?.class
  
    const ref= await f.fun<res1,object,{}>({endpoint:'postStudent',datas:{id:user?.current.id,class:val_class,},params:{'id_token':token}})
    const new_class = (ref as any).student.class
    if(new_class)
      await f.fun({endpoint:'postTypes',datas:[new_class]})
    
    if(old_class !==new_class && old_class){
      const types = await f.fun<string[],{},{}>({endpoint:'getAllTypes'})
      let cond = types?.find(type => type ===old_class)
      if(!cond)
        await f.fun({endpoint:'deleteType',datas:old_class})
    }

    }
    catch(e:any){
        mock_error_api({error:e,where:'user setting'})
  
    }
    finally{
      openModalTimeOut('user_update_notice','suc_wrapper',1200)
    }
  }













  const support =() =>{
    let cool_start:any;
    console.log("user setting support",user)
    try{
      cool_start = setInterval(async ()=>{
      const ec = document.querySelectorAll(`.btn-group.classy .btn`)
      ec.forEach(f=>{ 
        (f as HTMLButtonElement).classList.remove("active");
        (f as HTMLButtonElement).style.removeProperty('background-color');
        (f as HTMLButtonElement).style.removeProperty('color');
        (f as HTMLButtonElement).style.color = (f as HTMLButtonElement).style.borderColor
      })

      
      ec.forEach(f=>{
        if((f as HTMLButtonElement).value === user?.current?.class){
          (f as HTMLButtonElement).classList.add('active');
          (f as HTMLButtonElement).style.color = "black";
          (f as HTMLButtonElement).style.backgroundColor = (f as HTMLButtonElement).style.borderColor
        }
        })   
    
      if(ec)
        clearInterval(cool_start)

      })
    }catch(e){
      clearInterval(cool_start)
      console.log('support usersetting error',e)
    }
  }
    

  useEffect(()=>{
    console.log("hi user")
    support()
  },[user?.current])   

  return (
    <section className="bb sec-box2 div_adjust self-center">  
        <div  id="user_update_notice" className="sign suc_wrapper"><Sign info='success' message={<>Updated</>}></Sign></div>

       <div className="content-choice" >   
        <p className="topic">Student Information </p> 
        <div className="ml-4 list-decimal">
          <li>Me is &nbsp;{user?.current?.name}</li> 
          <li>Class {user?.current.class}</li>
        </div>
  
       </div>
    
       <div className="content-choice" >    
             <p className="topic">Class</p> 
             <div onClick={Focus_class} className='btn-group classy ml-4 flex justify-around flex-wrap '>
              <button name="class" style={{borderColor:colorLogic('lion'),color:colorLogic('lion')}} value='lion'  className="btn but-size btn-outline-primary">Lion</button>
              <button name="class" style={{borderColor:colorLogic('cobra'),color:colorLogic('cobra')} }  value="cobra" className="btn but-size btn-outline-primary">Cobra</button>
              <button  name="class" style={{borderColor:colorLogic('dragon'),color:colorLogic('dragon')}} value="dragon" className="btn but-size btn-outline-primary">Dragon</button>
              <button name="class" style={{borderColor:colorLogic('shark'),color:colorLogic('shark')}} value="shark" className="btn but-size btn-outline-primary">Shark</button>
              </div> <br></br>

       </div>
       <div className="confirm-but">
           <button onClick={Confirm} className="btn btn-success">Confirm</button> 
        </div>

       
    </section>
     
    
  )
}
