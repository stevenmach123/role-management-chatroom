import { ChangeEvent, CSSProperties, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddUser.css'
import { Form, json, useActionData } from 'react-router-dom';
import { name_check, user_mode, password_check } from '../../model';
import { ser1,dec, } from '../../route_services/axiosService';
import { construct_role } from '../../route_services/service_funs';

const display= "w-1/2 mx-auto"
const but_pos ={
    position:"absolute",
    left:"calc(50% - 40px)",
    
} as CSSProperties

 interface er_ar  {
  name?:string;
  class?:string;
  other?:string;
  pass?:string;
  
 }
 

let student:user_mode ={};

export default function AddUser() {
    let fres = useActionData() as any|undefined;
    let [err_ar,setEr] = useState<er_ar|undefined>(fres);
    const success = useRef<HTMLLabelElement>(null)
    const [role,setRole] = useState<string>() 
  
    const password_ref = useRef<HTMLInputElement>(null)
    const name_ref =useRef<HTMLInputElement>(null)
    
   
  
    const Timy =  async(div_ref:RefObject<HTMLLabelElement>)=>{
      const div = div_ref.current // not the new one, when new state triggered to render new html
      
     
      const time =(time:any)=>{ 
        return new Promise((resolve)=>{
        setTimeout(resolve,time)
        })
      }
      //console.log(div?.className);
      await time(100);
      if(!div_ref.current){
          console.log("mydi ",div_ref.current);
      }
      div_ref.current?.classList.remove('off'); 
      div_ref.current?.classList.remove('display'); 
      div_ref.current?.classList.add('display');
      await time(1300)
      
      let l =0; 
      while(l<2 && fres?.sucess ){  // !error WORKED. div_ref.current WORKED. div = div_ref.current NOT WORKED
        console.log("time2");
        //await Promise.all([time2(1200),div?.classList.add('off'),time2(1200),div?.classList.remove('off')])
        div_ref.current?.classList.add('off')
        await time(1100)  
        div_ref.current?.classList.remove('off')
        await time(1100)   
        l++
      }
    
    }
    
    const submitted = ()=>{
       
      ser1.putStudent(student).then(r=>{
            console.log("post suceed ")
            setEr(undefined);
            Timy(success)   
      }).catch((e):any=>{
        if(e?.response){
            //error_ref.current ={}
            //error_ref.current["same"] =Object.assign([],r.data)[0];
            //setDummy(0);
            if(e.response.status ===409 || e.response.status===402 ){
              setEr({other:e.response.data}) 
            }
            else{
              setEr({other:"user post is weird"}) 
            }
            console.log('post error'); 
          
        }
        else {
          setEr({other:"No server response"}) 
        }
        console.log(e);

      });
      
  }
  
  
    console.log("state00",err_ar); 
  
    //console.log("dum ",dum);
    //console.log("div ",success.current?.className)  // always go before
    useEffect(()=>{ 
      student.class = ""; 
    },[])
    
    
    useEffect( ()=>{
     
      if(fres  && fres?.sucess) //not undefined  // if(!error) WORKED success.current WORKED
          submitted()
                    
      return()=>{
      
        console.log("effect return", fres ); 
      }
    },[fres])
    
    const password_input= (e:any)=>{
        const val = e.target.value 
        let s = !err_ar?new Map():new Map(Object.entries(err_ar));     
        
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
   const name_input = (e:any) =>{
    const val = e.target.value 
    let s = !err_ar?new Map():new Map(Object.entries(err_ar));     
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
   
 
    
    return (
    
    <div className="div_big">
    
      <Form className={`mb-5 ${display}`}  method="post" > 
        <div className={`form-group`}>  
          <label>Name <span>{err_ar && name_ref.current?.value?<>{err_ar.name?    
            <i style={{color:'red'}} className="bi bi-x"></i>:
            <i style={{color:'green'}} className="bi bi-check"></i> 
            }</>
          :null    
          }</span></label>
          <input ref={name_ref} className="form-control" name="name" onChange={name_input}></input>
          {/*  <small style={{color:'red'}} >{fres?.name?fres.name:null}</small>  */}
          <small className={err_ar?.name && name_ref.current?.value ?'instruction':'offscreen'}>
          <li>Must only alphabets </li> 
          <li>Up only to 2 words</li>
          </small>
        </div> 
        
      


        <div className={`form-group mb-3`}>   
          <label>Password <span>{
            err_ar && password_ref.current?.value?<>{err_ar.pass?<i style={{color:'red'}} className="bi bi-x"></i>
                    : <i style={{color:'green'}} className="bi bi-check"></i>  
                  }</>:null
          }</span>
          </label> 
          <input ref={password_ref} onChange={password_input} className="form-control" name="pass" ></input>
          <small className={err_ar?.pass && password_ref.current?.value ?'instruction':'offscreen'}>{
           <>
            <li>Must contain at least a characters</li>
            <li>At least a number </li>
            <li>At lease a special character</li>  
           </>
         }</small> 

        </div>

        <div className="input-group mb-2">
            <select name="role" onChange={e=>setRole(e.target.value)} value={role} className="custom-select  text-black" id="is01">
                <option value="choose">Roles...</option>
                <option value="3">User</option>
                <option value="2">Group Manager</option>
            
            </select> 
            
        </div>

        
        <div><button  style={but_pos} className ="btn btn-outline-success" type="submit">Submit</button></div> 
      </Form>
     
      <div  className="relative">{ 
      fres?.sucess && !err_ar?.other ?<label  ref={success} className={`suc_label`} >{fres.sucess}</label>:null
      }
      </div>

     <div  className="relative"> {
       fres?.sucess && err_ar?.other?<small className="same_label"   >{ err_ar.other}</small>:null
    }</div>  

    <div className= "relative">{
       (fres?.name || fres?.pass) &&  <small className="same_label">Some information need to be corrected</small>
    }</div>
    <div className= "relative">{ 
        fres?.role &&   <small className="same_label">Role is not selected</small>
    } </div>
    
     
    </div>
  )
}
/*typeof error=='object'*/ 


export async function loader({request}:{request:Request}){
  const x = await request.formData()
  const name = x.get("name")?.toString();
  const pass =x.get("pass")?.toString()
  const role = x.get('role')?.toString();
  console.log(role)
 
  const id_check = /^\d+$/gm
  student.admit =false;  
  const error:any ={}
   if(!Number(role)){
      error['role'] = 'role not valid'
   }
   if(!name || !name_check.test(name) ){
    error["name"] ="name not valid" 
   }
   if(!pass || !password_check.test(pass)){
    error["pass"] = "pass not valid"
   }
 
  
  if(Object.keys(error).length > 0)
      return error
   
 
  

  //throw new Response("ss",{status:400})
  let irole = [parseInt(role as string)]
  student.name =name;
  student.pass = pass
  student.role =construct_role(irole)
  return {sucess:"Submission is valid, new student added"}
    

}



/*
export async function loader({request}:{request:Request}){
    
    const x = await request.formData()
    const name = x.get("name")?.toString();
    const id = x.get("id")?.toString();
    const clas =x.get("class")?.toString();
    const gmail= x.get("gmail")?.toString();

    const name_check = /^([a-zA-z]+|[a-zA-z]+\s[a-zA-z]+)+$/gm
    const gmail_check= /^[a-zA-z]+@[a-zA-z]+[.][a-zA-z]{2,}$/gm
    const class_check = /^[a-zA-z]+[-]\d+$/gm
    const password_check = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]*$/gm
    const error:any = {}
    student ={admit:false};
    
    
    if(!name || !name_check.test(name)){
      error["name"] ="name not valid"
    }
    if(!id || !password_check.test(id)){
        error["id"] = "id not valid"
    }
    if(!clas || !class_check.test(clas)){
      error["class"] = "class not valid"
    }
    if( !gmail || !gmail_check.test(gmail)){
      error["gmail"] = "gmail not valid"
    }
    if(Object.keys(error).length > 0)
        return error;
    //submited(x);
    student.name =name;
    student.class=clas;
    student.email= gmail;
    student.id=Number(id);

    return {sucess:"no error"}
    
}

*/






/*

<small className="instruction">{err_ar?
           <p  >{ 
            err_ar.pass?<><i style={{color:'red'}} className="bi bi-x"></i>
            Must contain at least a characters
            <li>At least a number </li>
            <li>At lease a special character</li></>:
            <i style={{color:'green'}} className="bi bi-check"></i>  
           }</p>:null  
 }</small> 
*/

/*
ex1:
const x = document.querySelector('.btn-group button[name=size]:focus')   
     
ex2:  
const ee = document.querySelectorAll('.btn-group button[name=size]')    
ee.forEach(f=>{console.log((f as HTMLButtonElement).value)}) or f.getAttribute('value')
ex3:
 const Hel = (e:any)=> {
      e.preventDefault()
      const x = document.querySelector('.btn-group') as HTMLElement 
      const z = x.childNodes
      z.forEach(x=>{
        console.log((x as HTMLButtonElement).value)
      })

   }
ex5:
const Hel = (e:any)=> { 
      const x = document.querySelector('.btn-group') as HTMLElement 
      const z = x.children
      for(let i=0;i<z.length;i++){
        console.log(z.item(i)?.firstElementChild) vs firstChild
      }
    }
*/





/*BOTH WAY WORKED AS EXPECTED 

const Doy =async ()=>{
    let my_e = 0;
    const x=  useRef(range(0,2).pipe(
      map(async v=>{
          console.log(++my_e)
          
      })
    ))
    return x;
  }
  
  WAY1:
 const ti =Doy()
   ti.then(x=>{
      if(prev_Doy.current !== x.current){
        prev_Doy.current  = x.current;
        x.current.subscribe();
      }  
  WAY2:
    ti.then(x=>{
      const t=  x.current.subscribe();
      t.remove()
    })


*/

/*WORKED 

console.log("effect")
      setTimeout(()=>{
       const div = success?.current  as HTMLElement
        div?.classList.add('display')
      },10);

*/


/*CASE 1 AWAIT 
  const Timy =  async(div_ref:RefObject<HTMLLabelElement>)=>{
    div?.classList.remove('off'); 
    div?.classList.remove('display'); 
    div?.classList.add('display'); // Go faster than html render
    await timer(1300)
    
    let l =0; 
    while(l<7 && div_ref.current){    
       div?.classList.add('off')
      div?.classList.remove('off') //HIT remove('off') instantly, so  see stuff overtime
      await time(1100)  
    }
    //
  }
*/

/*
 const Timy =  async(div_ref:RefObject<HTMLLabelElement>)=>{
    //
    while(l<7 && div_ref.current){
       
       div?.classList.add('off')
        await time(1100) 
        div?.classList.remove('off') //HIT add('off') instantly, so no see stuff overtime
       
    }
 }

*/




/* NOT KINNA WORK, decision.state = null, when error being re-render 2nd time

 useEffect(()=>{
        
        return ()=> {
         console.log("effect return2",decisions.state);
          if(current_type.length>0){
            ser1.postTypes(current_type).then(res=>{
                (decisions.state as MutableRefObject<boolean>).current =true;
                  console.log("types sucess ",res.data);
              
            },err=>console.log("types error ",err));
            current_type =[]
          }
        }
    },[decisions.state])

*/






///---------------------


/* NOT WORK 
  //Dispite, useRef do shallow copy, but  error is new object when re-rendered, so error can't reflect on useRef(error), such error value of first render   

     const error = useActionData() as any|undefined;
    const error_ref = useRef<any|undefined>(error);
    console.log(erre_ref.current ) // always undefined, value of the component first render


    2nd example 

      let r  ={l:11}
     let r_ref = useRef(r);
      r_ref.current.l = Math.floor(Math.random() * 100); //current.l constantly change, but no reflect on r.As r is new object for every re-render
    console.log(r_ref.current," ",r);

    2.2 example
     let r  ={l:11}
     let r_ref = useRef(r);
      r.l = Math.floor(Math.random() * 100);
    console.log(r_ref.current," ",r);
*/




/* NO CHANGE 
--EX1
 let [dum,setDum]  =useState<any>({});
useEffect( ()=>{
      dum["k"]="hi";
      setDum(dum); //setDum(x=>x);

},[dum])

--EX2 infinite change
 let [dum,setDum]  =useState<any>({});
useEffect( ()=>{
      dum["k"]="hi";
      setDum({...dum});

},[dum])

---EX3 print 3 state00 instead of 2, cuz error is still in same state

useEffect( ()=>{
      
  setDum(x=>x);

},[error]) 

---EX4
//ff is button function
<button onClick={ff}>a</button>

const ff  =()=>{
      dum = {id:Math.round(Math.random()*100)};
      setDum(x=>{ 
        console.log(x) // old state
        return dum; //new state
      })
    }

*/







 /*useEffect big example 

let error = useActionData() as any|undefined; 
let error_ref = useRef(error);
let [x,setDummy] = useState(0);


const submitted = ()=>{
  if(!error && error!== undefined){

  const t = student.class!.split('-')[0];
  console.log(student);
  if(!current_type.find(type=>type===t)){
    current_type.push(t);
  }
  
  ser1.postStudent(student).then(r=>{
      if(r.data && Object.assign([],r.data).length ===2 ){
        error_ref.current ={}
        error_ref.current["same"] =Object.assign([],r.data)[0];
        //setDummy(0);
        
        console.log(r.data);
        
        
      }
    
  }).catch((e):any=>{
    console.log(e);
  });


  }
}



useEffect( ()=>{
      
  submitted()
  if(success.current){ 
      Timy(success)
              
  }
  //console.log("fi");
  return()=>{
    console.log("effect return");
   
  }
   
},[error])

  
console.log("state00 ",error_ref," ",error);


return (
  <div className="div_big">
     <Form className="mb-5"   method="post" > 
      <div className={`form-group ${display}`}>  
        <label>Name</label>
        <input className="form-control" name="name" ></input>
        <small style={{color:'red'}} >{error_ref.current?.name?error_ref.current.name:null}</small>
      </div> 
      <div className={`form-group ${display}`}>   
        <label>Id</label> 
        <input className="form-control" name="id" ></input>
        <small className="form-text">We never share your id</small><br></br>
        <small style={{color:'red'}} >{error_ref.current?.id?error_ref.current.id:null}</small>

      </div>
      <div className={`form-group ${display}`}>   
        <label>Class</label> 
        <input className="form-control" name="class" ></input>
        <small style={{color:'red'}} >{error_ref.current?.class?error_ref.current.class:null}</small>

      </div>
      <div ref={em} className={`form-group ${display}`}> 
      <label>Email</label> 
      <input className="form-control" name="gmail" ></input>
      <small className="form-text text-muted">We never share your email</small><br></br>
      <small style={{color:'red'}} >{error_ref.current?.gmail?error_ref.current.gmail:null}</small>
      </div> 
      <div><button style={but_pos} className ="btn btn-outline-success" type="submit">Submit</button></div>
     
    </Form>
    <div  className="position-relative">
      {
      !error_ref.current && typeof error_ref.current=='object'?<label  ref={success} className="suc_label" >submission is valid, new student added</label>:null
    }</div>

      <div  className="position-absolute"> 
      <small className='same_label'>{error_ref.current?.same?error_ref.current.same:null}</small>
      </div>
  
   
  </div>
)

*/