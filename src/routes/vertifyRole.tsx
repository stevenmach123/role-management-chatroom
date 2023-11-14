import { Request,Response } from "express"
import { t_role } from "../model"
export const vertifyRole = (req:Request,res:Response,next:any )=>{
    const roles  = (req as any).roles as number[]| undefined
    let allowedR = req.query.roles as string[]
    const allowsRoles:number[] = []  
    let temp:any[] = []
    console.log((req as any).name,roles)
    if(typeof allowedR ==='string')
        allowedR = [req.query.roles] as string[]
    
    if(!roles)
        return res.status(400).json('verityrole error 1')

    for(let i of allowedR){
        temp.push(Array.from(t_role.values()).indexOf(i))
    } 
 
    for(let n of temp){
        if(typeof n !== 'undefined'){
            allowsRoles.push(n+1)
        }
        else 
            return res.status(400).json('verityrole error 2')
    }
    const result = roles.map(r=> allowsRoles.includes(r)).find(x=>x===true)
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