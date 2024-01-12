import { isAxiosError } from "axios";
import { Suspense, useEffect,useState} from "react";
import { Await, defer, json, Path, useActionData, useAsyncError, useAsyncValue, useLoaderData, useLocation, useParams, useResolvedPath, } from "react-router-dom"
import {ser1 } from "../../route_services/axiosService";
import ErrorUser from "../OtherComponents/ErrorUser";
import "./User.css"

import {useOutletContext,useNavigate,useSearchParams,Navigate} from 'react-router-dom'
import { AuthP, auth } from '../LayOut/AuthProvider';
import { construct_role,colorLogic, identifyRole,identifyRole2, openModal,closeModal, upperOne, toen, openModalTimeOut, } from "../../route_services/service_funs";
import { pro, Sleep, user_mode,vx,f2 } from "../../model";
import  '../LayOut/Back.css';
import { mock_error_api } from "../../route_services/service_funs2";
import { res1 } from "../../route_services/type";
import Sign from '../OtherComponents/Sign';
import { where } from 'firebase/firestore';

let height_manage:number = 0;
export async function loader(seg:any){
  
  //throw json("bonjo error",{status:402});
  //throw {error:"dd"};
  
  //return ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data); return json("xx",{status:400}) ;return json(JSON.stringify({error:'hi'}),{status:400})  })   //not good
   //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data);throw json({error:'hi'},{status:200}) }) })  // remember have errorElement={<></>} or x.catch()
  //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data); /*return {data:"bad made up",error:404} }*/   }) })
  //return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{return json(JSON.stringify({error:'hi'}),{status:200})    }) })  

  await Sleep(1)

  
  return defer({mt:ser1.getNStudent(seg.params?.obj,{'id_token':toen.t}).then(x=>{console.log("-",x.data); return x.data ; throw json({error:'hi'},{status:200}) }  )
  .catch((e:any) =>{
  
    if(isAxiosError(e)){
      return e
    }
    else {
      console.log("ya",e)
      return {error:"resolved"}
    }
  })
  }) 
  


}
type props = {rx:number}


export  const User:React.FC<props> =  ({rx}:props) =>{
  const param = useParams();
  const {search} = useLocation();
  const x =useLoaderData() as unknown as any
  const {class_template,vvv,user} = AuthP()
  const [stu,setStu] = useState<any>()
  
  const {support_set_users,users,f,current_path} = useOutletContext<vx>()
  const navigate = useNavigate()
  const [type_ram,setType] = useSearchParams()

  const [mshow,setMshow] = useState<boolean>(true);
  const [mshow2,setMshow2] = useState<boolean>(false);

   const Focus_class = (e:any)=> {
    e.preventDefault()
    
    const ex = document.querySelectorAll('.btn-group.classy .btn')    
  
    
    ex.forEach(f=>{
      (f as HTMLButtonElement).classList.remove("active");
      (f as HTMLButtonElement).style.removeProperty('background-color');
      (f as HTMLButtonElement).style.removeProperty('color');
      (f as HTMLButtonElement).style.color = (f as HTMLButtonElement).style.borderColor

    })
    if(!e?.target)
      return 
  
      (e.target as HTMLButtonElement).classList.add("active");
    
      (e.target as HTMLButtonElement).style.color = "black";
      (e.target as HTMLButtonElement).style.backgroundColor = (e.target as HTMLButtonElement).style.borderColor
      
        
  }   
  const Focus_class2 = (e:any) =>{
    e.preventDefault()
    const ex = document.querySelectorAll('.btn-group.role .btn') 
 
  
    setMshow2(false)  
    ex.forEach(f=>{
      (f as HTMLButtonElement).classList.remove("active")
    })
    if(!e?.target.value)
      return
    (e.target as HTMLButtonElement).classList.add('active')
    if(e.target.value ==='2'){
        setMshow2(true)
    }
        

  }






   if(x.mt){
    x.mt.then((t:any)=>{ 
      
      if(t.ok){
        //console.log("success")
        //console.log(t.json()) not work, not sure why even t.ok = true/false
      }
      else{
        //console.log("unsuccessful")
        if(t.response || t.request){
            console.log(t)
            return "no no"
        }
      }
     // return t.clone().json()
     return ''
   }).then((data:any) => {
     console.log(data) ;
   
    })
    .catch((e:any)=>console.log("mt error ",e));
    
   }   

   const support =()=>{
    let cool_start:any;
    let count =0;
    try{
      cool_start = setInterval(async ()=>{
      if(count===10)
        clearInterval(cool_start)
      
      const student =(await x.mt) as user_mode
      setStu(student)
      //setMshow(true);
      setMshow2(false)
      const ec = document.querySelectorAll(`.btn-group.classy .btn`)
      const er = document.querySelectorAll(`.btn-group.role .btn`) 
      const manages  =document.querySelectorAll('.manage-choice .manage-class')
      manages.forEach(f=>{
        (f as HTMLInputElement).checked = false
      })

      ec.forEach(f=>{ 
        (f as HTMLButtonElement).classList.remove("active");
        (f as HTMLButtonElement).style.removeProperty('background-color');
        (f as HTMLButtonElement).style.removeProperty('color');
        (f as HTMLButtonElement).style.color = (f as HTMLButtonElement).style.borderColor
      })
      er.forEach(f=>{ 
        (f as HTMLButtonElement).classList.remove("active");
      })
      console.log('tick',er.length,ec.length)
      
      
      ec.forEach(f=>{
        if((f as HTMLButtonElement).value === student?.class && student?.class){
          (f as HTMLButtonElement).classList.add('active');
          (f as HTMLButtonElement).style.color = "black";
          (f as HTMLButtonElement).style.backgroundColor = (f as HTMLButtonElement).style.borderColor
        }else if(!(f as HTMLButtonElement).value && !student?.class){
          console.log((f as HTMLButtonElement).value,student.class);
          (f as HTMLButtonElement).classList.add('active');
        }
        })   
      
      if(student.role){
        const v = student.role  
        er.forEach(f=>{
          if((f as HTMLButtonElement).value === Math.min(...Object.values(v)).toString() ){
            (f as HTMLButtonElement).classList.add('active');
            if((f as HTMLButtonElement).value ==='2')
              setMshow2(true)              
          }
         } )
        if(identifyRole(student.role) ===2 && student.manage){
            manages.forEach(x=>{
              const f = x as HTMLInputElement
              if(student.manage?.includes(f.id))
                f.checked = true
            })
        }
       

        

      }
      //await Sleep(1)
      const box = document.querySelector('.manage-choice') 
      if(box && !mshow){
          console.log("shrink");
          (box as HTMLElement).style.maxHeight = '0px' 
      }
      
 
      
      count++
     

      if(er.length && ec.length )
          clearInterval(cool_start)
    },200)
  
     
    }catch(e){
      
      clearInterval(cool_start)
      console.log('support user error',e)
    }
  
   }
   useEffect(()=>{   
      support()
   },[x.mt])
   

   const Del = async (id:string)=>{
        
    try{    
        const token= await vvv?.getIdToken()
        await f?.fun<string,string,{}>({endpoint:'deleteStudent',datas:id,params:{'id_token':token},note:"deleteStudent"})
        await f?.fun<string,string,{}>({endpoint:'deleteUser',datas:id})
        
        const us_users = await support_set_users()
        
        let my_type =stu?.class as string
        let users_exist =us_users?.find(u=> u.class === my_type)
        if(users_exist){
          if(!type_ram.get('type')){
             navigate(`${current_path.pathname}`)
          }
          else if( type_ram.get('type')){
               navigate(`${current_path.pathname}?${type_ram}`)
          }
         

        }else{
          
          await f?.fun<string,string,{}>({endpoint:'deleteType',datas:my_type})
          if( !type_ram.get('type')){
             navigate(`${current_path.pathname}`) 
          }
          else if(type_ram.get('type') === my_type ){
              navigate(`${current_path.pathname}`)
          }else 
             navigate(`${current_path.pathname}?${type_ram}`)
        
        }
        let ob_ram = new URLSearchParams({id:id}) 
        
        f?.fun({endpoint:'delete_indi_structure',datas:ob_ram,note:'indi_structure'})
      

          
    }  
    catch(e:any){
      mock_error_api({error:e,'where':'user'})
    }
    
         
}


    const Confirm  = async (e:any)=>{
      e.preventDefault()

      const classy = document.querySelector(".btn-group.classy .btn.active")
      const role = document.querySelector(".btn-group.role .btn.active")
      const manages = document.querySelectorAll('.manage-choice .manage-class')
      const token= await vvv?.getIdToken()
      let bodies ={} as any
      bodies['class'] = ''
      bodies['role'] = '3'
      bodies['manage'] =[]
     
      try{
        if(!classy || !role)
          throw "missing one choice"  
        
        bodies['class'] = (classy as HTMLButtonElement).value
        bodies['role'] = construct_role([parseInt((role as HTMLButtonElement).value )])
      let temp_manage:string[] =[]
      manages.forEach((x)=>{
        let f = x as HTMLInputElement
        if(f.checked)
          temp_manage.push(x.id)
      })
      bodies['manage'] = temp_manage

      const param = new URLSearchParams() 
      param.set('name',stu?.name)
      param.set('id',stu?.id)
      bodies['name'] =  stu?.name  
      bodies['id'] = stu?.id
      openModal('user_load_notice')
      f?.setGenLoading(true)
      let student =  await f?.fun<user_mode,{},{}>({endpoint:'getNStudent',datas:param,params:{'id_token':token},note:'confirm user'}) 
      const old_class = student?.class
      const ref= await f?.fun<res1,{},{}>({endpoint:'postStudent',datas:bodies,params:{'id_token':token},note:'confirm user' }) 
      const new_class = ref?.student.class
    
  
      new_class &&  await ser1.postTypes([new_class])
      
      
      if(old_class !==new_class && old_class){
          const types = await f?.fun<string[],{},{}>({endpoint:'getAllTypes'})
          let cond = types?.find(type => type ===old_class)
          if(!cond){
            console.log(await f?.fun({endpoint:'deleteType',datas:old_class}))
           
          }
          
      }
      
      support_set_users()
      
      }
      catch(e:any){
          mock_error_api({error:e,where:'confirm user'})
      }finally{
       closeModal('user_load_notice')
       f?.setGenLoading(false)
       openModalTimeOut('user_update_notice','suc_wrapper',1000)
      }

    }

   useEffect(()=>{
       const box = document.querySelector('.manage-choice') 
       console.log(mshow,height_manage)
       if(box){
        height_manage = Math.max(height_manage,box.clientHeight)
         if(mshow)

          (box as HTMLElement).style.maxHeight = height_manage.toString()+"px"
        else
          (box as HTMLElement).style.maxHeight ='0px';  
       }
      
    },[mshow]) 
   
  
    

    const pa2 = new URLSearchParams(param.obj)
    const pa = new URLSearchParams(search)
    
   
  return (
    <div  style={{position:'absolute',top:'0',bottom:'0',overflowY:'scroll',width:'100%',border:'2px solid none'}}>
     
    
      <Suspense fallback={<section className="sign"><Sign info="loading" message={<>Loading...</>}></Sign> </section>  }>
      <Await resolve={x.mt} errorElement={<ErrorUser></ErrorUser>} >
      {(student)=>(
      <section className="px-4 py-2 relative"> 
        
         <div   id="user_load_notice" className="wrapper wrap2">
          <div className="sign absolute left-1/2 -translate-x-1/2 "><Sign message={<>Processing...</>}></Sign></div>
        </div>
        <div  id="user_update_notice" className="sign suc_wrapper"><Sign info='success' message={<>Updated</>}></Sign></div>
    

         <div className="content-choice" >    
             <p className="topic">Student Information </p>
             <div className="ml-4 list-decimal">
              {student?.error && <li>ok throw:{student?.error}-{student?.data}</li> }
              {student?.body && <li>ok throw: {String(student.ok)}</li> }
              <li>Me is &nbsp;{pa2.get('name')}</li> 
              <li>Id: {student?.id}</li>
              {student?.pass && <li>Pass: {student?.pass}</li>}
              {student?.class && <li>Class: {student?.class}</li>}
              <li>Role: {identifyRole2(student?.role)}</li> 
              {student?.email && <li>{student?.email}</li> }
            </div>
        </div>
      
        { typeof colorLogic === 'function' && 
        <section style={{display: identifyRole(user?.current.role) < (identifyRole(student?.role) )?'block':'none'  }}>
        <div  className="content-choice" >    
             <p className="topic">Class</p> 
              <div onClick={Focus_class} className='btn-group classy ml-4 flex justify-around flex-wrap '>
                {
                class_template?.map(myclass=>(
                  <button name="class" style={{borderColor:colorLogic(myclass),color:colorLogic(myclass)}} value={myclass}  className="btn but-size btn-outline-primary">{upperOne(myclass)}</button>
                ))
                }
                <button name="class"  value="" className="btn but-size btn-outline-light">None</button>
               

              </div> <br></br>
          
        </div>
      
      
      <div className="content-choice relative"> 
          <p className="topic">User role</p>
        
          <div  onClick={Focus_class2
          }  className='btn-group role ml-4' > 
            <button name="role" value="3" className="btn but-size btn-outline-light">User</button>
            <button name="role" value="2" className="btn but-size btn-outline-info">Group Manager</button> 
          </div>
        
          <div style={{color:'#E4A11B',display:mshow2?'inline-block':'none',width:'fit-content',border:'',transform:'translate(0,15%)'}}>
              <button onClick={e=>setMshow(!mshow)} style={{display:!mshow?'block':'none'}} className="no_button" ><i style={{fontSize:'2.5rem'}} className="bi bi-caret-down"></i></button>
              <button onClick={e=>setMshow(!mshow)} style={{display:mshow?'block':'none'}} className="no_button"><i style={{fontSize:'2.5rem'}} className="bi bi-caret-up"></i></button>
            </div>
          
           <div style={{display:mshow2?'grid':'none'}} className="ml-4 manage-choice">{
            class_template?.map((myclass)=>
            <div className="choice">
                  <input id={myclass} key={myclass} className="form-check-input manage-class" type="checkbox" value={myclass} />
                  <span>{upperOne(myclass)}</span>
            </div>)

          
            }</div>
      
        
      </div>

     

    
         
      </section> }

      <div className="text-md text-red-500 underline decoration-solid decoration-2 decoration-red-500"> 
        SENSITIVE ZONE
      </div>

      <button onClick={e=>{openModal('delete')}} className="btn but-size btn-danger"> 
          Delete User
      </button>
      
        <div className="confirm-but">
            <button onClick={Confirm} className="btn but-size btn-success">Confirm</button> 
        </div>


        <div onClick={e=>closeModal('delete')} className="wrapper" id="delete">
        
          <div className="modall" id="delete">
              <div className="modal-header">
                <div className="context">Are you sure delete {student?.name} ?</div>
                <button className="close" onClick={e=>closeModal('delete')} >x</button>
            </div>
            <div className="context"><button onClick={e=>{closeModal('delete');Del(student.id)}}className="btn btn-success">Yes</button></div>
          </div>  
        </div>
       


        


       </section>
      )}
      </Await>
      </Suspense>  
    </div>
  )
}

/* WORKED
const pa = new URLSearchParams(param as unknown as string/URLSearchParams)
console.log(pa.get('name'));


NOT WORKED
    const pa = new URLSearchParams(param.toString() as unknown as string)

        
*/

/*
    return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data);return json({error:"hello"},{status:400}) ;return x.data }  ) })

*/

/* give error in x=useRouteError() as undefined
 defer({mt:ser1.getStudent(seg.params.obj).then(x=> throw json({error:"mi"},status:401) )

*/

/*
  return defer({mt:ser1.getStudent(seg.params.obj).then(x=>{console.log("-",x.data);return json({error:'hi'},{status:402})  }) 
  let x = useActionData()
  x.mt.then()  //trig error of {body:,bodyUsed:,ok:false}
   <Await resolve={x.mt}  > // no errorElement also trig error 

   /// Extra 
  if defer({//.then(x=> throw json({error:'hi'},{status:402})   ) })
    x.mt.then() //trigg error of {body:,bodyUsed:,ok:true}
*/

/*
 defer({//.then(x=> throw json({error:'hi'},{status:402}))  }).catch(e=>{
    if(e?.response){
        console.log(e.request,e.response)
    }
    else 
      console.log(e) // give error of {body:,bodyUsed:,ok:false} 
      
    return json({error:'hi ok'},{status:200})
  }

 })
  
*/

/*
defer({//.then(x=> return json({error:'hi'},{status:402}))  }) 
  x.mt.then() //no give error , but still  {body:,bodyUsed:,ok:false} 
  <Await resolve={x.mt} errorElement={<ErrorUser></ErrorUser>} > 
     {mt?.ok && <li>Error: {String(mt.ok)}</li> }  //pass
  </Await>


*/