import { axios1 } from "./axiosService"
import { color_role, t_role } from "../model"

  const firebaseConfig = {
    apiKey: "AIzaSyAb-6DFnFLdWVQWt_upc8wNHSXYPINl_iU",
    authDomain: "chatroom-de811.firebaseapp.com",
    projectId: "chatroom-de811",
    storageBucket: "chatroom-de811.appspot.com",
    messagingSenderId: "251906167695",
    appId: "1:251906167695:web:2e0df37d3398811b48b1fa",
    measurementId: "G-GLZ4K7DZ4Q"
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
    const roles = r as  {[key:string]:number}
    if(roles){
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
    const roles = r as  {[key:string]:number}
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

    let i =0  
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
    }while(Array.from(id).find(d=> d ===uid) )
    
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
const openModal = (target:string)=>{
  
  const wrapper = document.querySelector(`.wrapper#${target}`)
  const modal = document.querySelector(`.modall#${target}`)
  wrapper?.classList.add('active')
  modal?.classList.add('active')
  
}
const closeModal = (target:string)=>{
  const wrapper = document.querySelectorAll('.wrapper')
  const modal = document.querySelector(`.modall#${target}`)
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

export {generateId,construct_role,firebaseConfig,colorLogic,openModal,closeModal,upperOne,toen}