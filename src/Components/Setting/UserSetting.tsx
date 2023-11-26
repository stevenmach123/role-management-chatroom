import React,{useEffect} from 'react'
import  '../UserLayOut/UserLayout.css'
import '../UserLayOut/User.css'
import { AuthP, auth } from '../LayOut/AuthProvider';
import { colorLogic, construct_role } from '../../route_services/service_funs';
import { user_mode } from '../../model';
import { ser1 } from '../../route_services/axiosService';
import { Navigate, useLoaderData } from 'react-router-dom';

export default function UserSetting() {
   const {user,vvv} = AuthP()
   const x = useLoaderData()
   
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
    const stu = await ser1.getNStudent(param,{'id_token':token}) 

    const val_class = (classy as HTMLButtonElement).value
    const old_class = (stu.data as user_mode).class
    const ref= await ser1.postStudent({id:user?.current.id,class:val_class,},{'id_token':token})
    const new_class = (ref.data as any).student.class
    if(new_class)
      await ser1.postTypes([new_class])

    if(old_class !==new_class && old_class){
      const types = await ser1.getAllTypes();
      let cond = (types.data as string[]).find(type => type ===old_class)
      if(!cond)
        await ser1.deleteType(old_class)
    }


    }
    catch(e:any){
        console.log('user setting',e)
        if(e?.response.status ===415)
          Navigate({to:'/signin'})
        
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
    support()
  },[user])   

  return (
    <section className="bb sec-box2">  
     
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
