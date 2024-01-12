import { Request,Response } from "express"
import { t_role } from "../model"
export const vertifyRole = (req:Request,res:Response,next:any )=>{
    const roles:number[]  = (req as any).roles
    let allowedR = req.query.roles as string[]
    
    
    
    if(typeof allowedR ==='string')
        allowedR = [req.query.roles] as string[]
    
    if(!roles)
        return res.status(400).json('verityrole error 1')

    const num_roles = allowedR.map(r=>Array.from(t_role.entries()).find(x=>x[1]===r)  )
    if(num_roles.includes(undefined))
        return res.status(400).json('verityrole error 2')
    const allowedRoles = (num_roles as [number,string][]).map(x=>x[0])
    const result = roles.map(r=> allowedRoles.includes(r)).find(x=>x===true)
    if(result){
        return next()
    }
    else{
        console.log("v4")
        return res.status(400).json('verityrole error 3')
    }
        
    
  
        

}
export const bb = (req:Request,res:Response,next:any) =>{
    throw 'dumb'
    next() 
}