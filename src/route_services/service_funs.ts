import { axios1, ser1 } from "./axiosService"
import { color_role, f2, t_role, user_mode } from "../model"

import { MutableRefObject } from 'react';
import { NavigateFunction,Path } from "react-router-dom";
import { Url } from "url";

  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }

export const checkPermit = (roles:{[key:string]:number},...allowedRoles:number[]):boolean=>{
    console.log(roles)
    
    try{
      let result = Object.values(roles).map(r=>allowedRoles.includes(r) ).find(x=>x===true)
      if(result)
        return true 
      else 
        return false;
    }catch(e){
       console.log('checkPermit',e)
       return false
    }

}
export const identifyRole2 =(roles:{[key:string]:number}):string=>{
  if(!roles)
     return '' 
   const result = t_role.get(Math.min(...Object.values(roles)))
   if(result)
      return result
   else 
      return ''
}
export const identifyRole  = (r:any):number=>{
  try{
    const roles:{[key:string]:number} = r;
    if(roles  && Object.entries(roles).length !==0){
       return Math.min(...Object.values(roles))
    }
    throw 'bad identifyRole' 
  } catch(e){
    console.log(e)
    return -1
  }
}
export const colorRole = (r:any):string =>{
   try{
    const roles:{[key:string]:number} = r 
    const idx = identifyRole(roles)
    if(idx === 1   || idx===2)
      return color_role.get(idx) as string      
    else 
      throw 'bad color'
   } catch(e){
      return 'white'
   } 
}


const generateId = async (num:number):Promise<string>=>{
    const id = (await axios1.get('/id')).data
   
    let i =0 ; let loop =0
    let uid:string="";
    do{
        i =0;
        while(i < num){
            let d = Math.floor(Math.random() * 10) 
            if(d===0 && i ===0 ) 
                d =1
            uid += d.toString()
            i++
        }
        ++loop
    }while(Array.from(id).find(d=> d ===uid) && loop<5000 )
    if(loop ===5000 ){
      throw 'max user exceed'
    }
    return uid
  }

const construct_role = (val:number[])  =>{
      let roles:{[key:string]:number} ={ }
      let de = new Set([3]);
      
      try{
        val.forEach(val=>de.add(val))
        de.forEach(ro=>{
          let role = t_role.get(ro)
          if(role){
            roles[role] = ro 
          }
          else
            throw "bad"
        })

        return roles
      }
      catch(e){
        return undefined 
      }
      
  }
  const colors:{[key:string]:string} = {yellow:"#f9f425",red:"#f93125",blue:"#14c6eb",pink:'#f747f7'}
  export function upperOneLetter(x:string|undefined):string{
      if(x)
        return x.substring(0,1).toUpperCase()
      else 
        return ''
  }
  

  const colorLogic = (group_name:string):string=>{
    const random_select = Math.floor(Math.random()*4);
    const colors_ar = Object.entries(colors)
    if(group_name ==="shark"){
       return colors['blue']
    }else if(group_name ==="lion"){
        return colors['yellow']
    }else if(group_name ==="dragon" ){
        return colors['red']
    }else if(group_name ==="cobra"){
      return colors['pink']
    }else{
      console.log(colors_ar)
      const color =  colors_ar[random_select][1] 
      return color
    }
      
}

///
  
const sort_sup = (user:React.MutableRefObject<any>|undefined,a:user_mode,b:user_mode)=>{
  if(a.id ===user?.current.id)
    return -1
  if(b.id ===user?.current.id)
    return 1;
  return (a.name as any) - (b.name as any)
}



  




///

const openModalTimeOut = (target:string,wrap:string='wrapper',ms:number=1000)=>{
  
  const wrapper = document.querySelector(`.${wrap}#${target}`)
  const wrappers = document.querySelectorAll(`.${wrap}#${target}`)

  const modal = document.querySelector(`.${wrap} .modall#${target}`)
  wrapper?.classList.add('active')
  modal?.classList.add('active')
  
  setTimeout(()=>{
    modal?.classList.remove('active')
    wrappers.forEach(f=>{
      (f as HTMLElement).classList.remove('active')
    })
  },ms)
}

const openModal = (target:string,wrap:string='wrapper')=>{
  
  const wrapper = document.querySelector(`.${wrap}#${target}`)
  const modal = document.querySelector(`.${wrap} .modall#${target}`)
  wrapper?.classList.add('active')
  modal?.classList.add('active')
  
}
const closeModal = (target:string,wrap:string='wrapper')=>{
  const wrapper = document.querySelectorAll(`.${wrap}`)
  const modal = document.querySelector(`.${wrap} .modall#${target}`)
  wrapper.forEach(f=>{
    (f as HTMLElement).classList.remove('active')
  })
  modal?.classList.remove('active')
  
}
const upperOne =(a:any)=>{
  const b =  a.toString() as string
  const c = b.toLowerCase()
  if(c.charAt(0)){
    return c.charAt(0).toUpperCase() +c.slice(1,c.length)  
  }
  return c
}
const toen ={t:''} 

export {generateId,sort_sup,construct_role,firebaseConfig,colorLogic,openModal,closeModal,openModalTimeOut,upperOne,toen}