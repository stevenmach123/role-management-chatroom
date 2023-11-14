import axios from 'axios'
import { user_mode,t_role, properties } from '../model';

const axios1=   axios.create({
    baseURL: `http://localhost:${properties.ser_port.toString()}/`,withCredentials:true,
    headers: {
      "Content-type": "application/json"
    }
  });

const getData =()=>{
    return axios1.get('/hi')
}


const getAll =(header:{[key:string]:string|string[]|undefined}  )=>{
  return axios1.get<unknown>('/getall',{headers:header})
}
const putStudent =(student:user_mode,)=>{
   return axios1.put<unknown>('/student',student)
    
}
const getStudent =(param_obj:URLSearchParams)=> {
    const param  = new URLSearchParams(param_obj)
    return axios1.get<unknown>(`/student/?${param}`) 
  
   //return axios1.get<unknown>(`/getStudent?${param}`)
 }
 const getNStudent =(param_obj:URLSearchParams,header:{[key:string]:string|undefined}) =>{
    return axios1.get<unknown>(`/normal_student/?${param_obj}`,{headers:header})
 }

const postStudent =(obj:any,header:{[key:string]:string|undefined}) =>{
  return axios1.post<unknown>('/student',obj,{headers:header})
}
const postStudentUp = (obj:any)=>{
  return axios1.post<unknown>('/student_update',obj)
}

const deleteStudent = (name:string,header:{[key:string]:string|undefined})=>{
  return axios1.delete<unknown>(`/student/${name}`,{headers:header}) 
 }

 const putOStudent = (uid:string)=>{
    return axios1.put<unknown>(`/o_student/${uid}`)
 }
 
 const getAllTypes=()=>{
  return axios1.get<unknown>('/types')
 }
 const postRegis =(param_obj:URLSearchParams,)=>{
  return axios1.post<unknown>(`/regis/${param_obj}`)
 }
 const postTypes = (types:string[])=>{
    return axios1.post<unknown>('/types',types)
 }
 const deleteAllTypes =()=>{
    return axios1.delete<unknown>('/types')
 }

const deleteType  = (type:string)=>{
  return axios1.delete<unknown>(`/type/${type}`)
}
const delete_indi_structure = (param_obj:URLSearchParams)=>{
  return axios1.delete<unknown>(`/msg/indi/?${param_obj}`)
}













const ser1 ={
    getData,getAll,putStudent,getStudent,postStudent,postStudentUp,getAllTypes,postTypes,postRegis,deleteStudent,deleteType,deleteAllTypes,getNStudent,putOStudent,delete_indi_structure
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