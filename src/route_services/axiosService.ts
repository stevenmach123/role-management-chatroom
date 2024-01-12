import axios from 'axios'
import { user_mode,t_role, properties } from '../model';
import {res1,auth1} from './type'
const axios0=   axios.create({
    baseURL: `http://localhost:${properties.ser_port.toString()}/`,withCredentials:true,
    headers: {
      "Content-type": "application/json"
    }
  });

const axios1=   axios.create({
  baseURL: `https://us-central1-chatroom-de811.cloudfunctions.net/chat-app2/`,withCredentials:true,
  headers: {
    "Content-type": "application/json"
  }
});

const getData =()=>{
    return axios1.get('/hi')
}


const getAll =(header:{[key:string]:string|string[]|undefined}  )=>{
  return axios1.get<user_mode[]>('/getall',{headers:header})
}
const putStudent =(student:user_mode,)=>{
   return axios1.put<string>('/student',student)
    
}
const getStudent =(param_obj:URLSearchParams)=> {
    const param  = new URLSearchParams(param_obj)
    return axios1.get<user_mode>(`/student/?${param}`) 
  
   //return axios1.get<unknown>(`/getStudent?${param}`)
 }
 const getNStudent =(param_obj:URLSearchParams,header:{[key:string]:string|undefined}) =>{
    return axios1.get<user_mode>(`/normal_student/?${param_obj}`,{headers:header})
 }

const postStudent =(obj:any,header:{[key:string]:string|undefined}) =>{
  return axios1.post<res1>('/student',obj,{headers:header})
}
const postStudentUp = (obj:any)=>{
  return axios1.post<string>('/student_update',obj)
}

const deleteStudent = (id:string,header:{[key:string]:string|undefined})=>{
  return axios1.delete<string>(`/student/${id}`,{headers:header}) 
 }
 const deleteUser = (id:string)=>{
  return axios1.delete<string>(`/delete_user/${id}`)
 }

 const putOStudent = (uid:string)=>{
    return axios1.put<auth1>(`/o_student/${uid}`)
 }
 
 const getAllTypes=()=>{
  return axios1.get<string[]>('/types')
 }
 const postRegis =(param_obj:URLSearchParams,)=>{
  return axios1.post<user_mode[]>(`/regis/${param_obj}`)
 }
 const postTypes = (types:string[])=>{
    return axios1.post<string>('/types',types)
 }
 const deleteAllTypes =()=>{
    return axios1.delete<string>('/types')
 }

const deleteType  = (type:string)=>{
  return axios1.delete<string>(`/type/${type}`)
}
const delete_indi_structure = (param_obj:URLSearchParams)=>{
  return axios1.delete<string>(`/msg/indi/?${param_obj}`)
}













const ser1 ={
    getData,getAll,putStudent,getStudent,postStudent,postStudentUp,getAllTypes,postTypes,postRegis,deleteStudent,deleteUser,deleteType,deleteAllTypes,getNStudent,putOStudent,delete_indi_structure
}




export const dec ={hi:true};
export {ser1,axios1}


/* WORKED 
 return axios1.get<unknown>(`/getStudent/?${param}`)
router1.get('/getStudent/) or 
router1.get('/getStudent') 
//SAME 
axios1.get<unknown>(`/getStudent?${param}`)
router1.get('/getStudent/') 


*/

/* WORKED 
  const param  = new URLSearchParams(param_obj) 
   return axios1.get<unknown>(`/getStudent/${param}`) 
   outer1.get('/getStudent/:obj') 
*/