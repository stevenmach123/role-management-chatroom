import React,{useState,useEffect,useCallback} from 'react'
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { endprams } from './type';
import { fetch_fun } from './service_funs2';
import { Sleep } from '../model';
 export interface vu<data,param>  {
    endpoint:endprams,
    datas?:data,
    params?:param,
    note?:string
  }

 const  FetchService = ()=> {
  const [loading,setLoading]= useState<boolean>(false);
  const [error,setEr]= useState<any>();
  const navi = useNavigate()
  const [gen_loading,setGenLoading] = useState<boolean>(false)
 /*const fun2  = async <V extends object|string|number|boolean|void>(promise:()=>Promise<V>):Promise<V>=>{
    return await promise()
 }*/




  const fun =async <T,data extends object|string|number|boolean,param extends object>({endpoint,datas,params,note=""}:vu<data,param>):Promise<T|undefined>=>{
    try{
    setLoading(true);
    setEr(null)

   console.log("--",datas)
   const val = await fetch_fun<T,data,param>(endpoint,datas,params)
   
    return val;

    }
    catch(e:any){
       
        if(isAxiosError(e)){
            if(e.response){
                console.log(note,e.response.status,e.response.data)
                setEr(e.response.status+" "+e.response.data )
                if(e.response.status ===415){
                    navi('/signin')
                }

            }
            if(e.request){
                console.log(note,e.request)
                setEr(JSON.stringify(e.request))
            }
            else{                
                console.log(note,'Server error')     
                setEr('Server error') 
            }      
        } 
        else if(e?.code){
            let msg:string = note+" "+e.code +" "+ e.message
            console.log(note,msg)  
            setEr(msg)
        }else{
            console.log(note,e)  
        }
        
    }
    finally{
        setLoading(false)
    }
    
  }

    
  return {loading,error,fun,gen_loading,setGenLoading}
}

export default FetchService
