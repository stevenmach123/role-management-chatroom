import { AxiosResponse } from "axios";
import { Path } from 'react-router-dom';
import {endprams} from './route_services/type'
import {vu} from './route_services/FetchService'
interface user_mode{
    name?:string; 
    id?:string;
    pass?:string;
    class?:string;
    admit?:boolean;
    role?:{[key:string]:number};
    manage?:string[];
    email?:string;
    providerData?:{[key:string]:string}[]
    sec_id?:string;
    
    
}
interface msg_mode{
    name?:string;
    id?:string;
    time?:string;
    text?:string;
    docid?:string;
}
const t_role  = new Map([[1,"admin"],[2,"manage"],[3,"user"]])
const color_role = new Map([[1,'#ffae42'],[2,'aqua']])
const properties = {
    ser_port:4010,
    soc_port:4011
}
export {t_role,properties, color_role};
export type {user_mode,msg_mode};
export function Sleep(x:number){
     return new Promise((r)=>setTimeout(r,x) );
}
export function pro(x:Promise<AxiosResponse<unknown,any>>){
    return new Promise((resolve,reject)=>{
       x.then((v)=>resolve(v.data)).catch(e=>reject(e))
    })
}
export const name_check = new RegExp('^([a-zA-z]+|[a-zA-z]+\s[a-zA-z]+)+$')
export const password_check =  new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]*$')




export interface vx{
    support_set_users:()=>Promise<user_mode[]>,
    users:user_mode[],
    this_path:Path,
    current_path:Path
    f?:f2
}

export interface f2 {
    loading: boolean,
    error: any,
    fun: <T, data extends string | number | boolean | object, param extends object>(v:vu<data,param>) => Promise<T|undefined>
    gen_loading:boolean,
    setGenLoading: React.Dispatch<React.SetStateAction<boolean>>
}


