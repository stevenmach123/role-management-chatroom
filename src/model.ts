import { AxiosResponse } from "axios";

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
    
    
}
interface msg_mode{
    name?:string;
    id?:string;
    time?:string;
    text?:string;
    docid?:string;
}
const t_role  = new Map([[1,"admin"],[2,"manage"],[3,"user"]])
const color_role = new Map([[1,'yellow'],[2,'aqua']])
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


