import { user_mode } from "../model";
import { axios1 } from "./axiosService";
import { endprams } from "./type";

export const fetch_fun= async <T ,data extends object|string|number|boolean,param extends object> (endpoint:endprams,datas?:data,params?:param):Promise<T>=>{
    let result:T;
    if(endpoint  === 'getAll'){
        result = (await axios1.get<T>('/getall',{headers:params})).data
    }else if(endpoint ==='putStudent'){
        result = (await axios1.put<T>('/student',datas)).data       
    }
    else if(endpoint==='getStudent'){
        const param  = new URLSearchParams(datas as string)
        result = (await axios1.get<T>(`/student/?${param}`)).data

    }
    else if(endpoint==='getNStudent'){
        let param_obj:string = datas  as string
        console.log("here getNStudent")
        result = (await axios1.get<T>(`/normal_student/?${param_obj}`,{headers:params})).data
    }
    else if(endpoint ==='postStudent' ){
        let obj:object =  datas as object
        console.log("here postStudent")
        result =  (await axios1.post<T>('/student',obj,{headers:params})).data
    }
    else if(endpoint==='postStudentUp'){
        let obj:object = datas as object
        result = (await axios1.post<T>('/student_update',obj)).data
    }
    else if(endpoint==='deleteStudent'){
        let id = datas as string
        result = (await axios1.delete<T>(`/student/${id}`,{headers:params})).data
    }else if(endpoint  ==='deleteUser'){
        let id = datas as string
        result = (await axios1.delete<T>(`/delete_user/${id}`)).data
    }else if(endpoint ==='putOStudent'){
        let id = datas as string 
        result  =(await axios1.put<T>(`/o_student/${id}`)).data

    }
    else if(endpoint ==='getAllTypes'){
        result  = (await axios1.get<T>('/types')).data
    }
    else if(endpoint === 'postRegis'){
        let param_obj:string = datas  as string
        result =  (await axios1.post<T>(`/regis/${param_obj}`)).data
    }
    else if(endpoint ==='postTypes'){
        let types:string[] =  datas as string[]
        result = (await axios1.post<T>('/types',types)).data
        

    }else if(endpoint ==='deleteAllTypes'){
        result = (await axios1.delete<T>('/types')).data
    }
    else if(endpoint ==="deleteType"){
        let type:string  =datas as string;
    
        if(!type){
            console.log("here null",type)
            type = "c"
        }
        result  = (await axios1.delete<T>(`/type/${type}`)).data
    }else if(endpoint==='delete_indi_structure'){
        let param_obj:string = datas  as string
        result = (await axios1.delete<T>(`/msg/indi/?${param_obj}`)).data
    }
    else{
        result = (await axios1.get<T>('/crypto')).data
    }
    return result
      

}
export const mock_error_api =({error,where=''}:{error:any,where:string})=>{
    if(error?.message){
        console.log(where,error?.message,error?.code)
    }
    else{
        console.log(where,error)
    }
}

// UNDERSTAND THE extends with undefined
/*
WORK
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas:data,params?:param):Promise<T|undefined>
 to  
 service_fun2: async <T ,data extends object|string|number|boolean|undefined,param extends object> (endpoint:endprams,datas:data,params?:param):Promise<T>=>
                or async <T ,data extends object|string|number|boolean,param extends object> (endpoint:endprams,datas?:data,params?:param):Promise<T>=>
*/

/*NOTE: even service_fun2 has ?:data but "data extends" is still missing undefined 
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas:data,params?:param):Promise<T|undefined>
to  <T,data extends object|string|number|boolean,param extends object>(endpoint:endprams,datas?:data,params?:param):Promise<T|undefined>

*/

/*WORK 
from fetchService: <T,data extends object|string|number|boolean|undefined,param extends object>(endpoint:endprams,datas?:data,params?:param):Promise<T|undefined>
TO 
service_fun2: ?:data (with data extends same as fetchService)
*/