import {Request,Response} from 'express'
import { user_mode } from '../model'
import { db } from '../server'
import admin from 'firebase-admin';
import { identifyRole } from '../route_services/service_funs';
export const vertify = async (req:Request,res:Response,next:any)=>{
    const id_token = req.headers['id_token'] as string
    if(!id_token)
        return res.status(415).json({message:'vertify no id_token'})
    try{
        const claims  = await admin.auth().verifyIdToken(id_token,true)
        console.log(claims)
        console.log("my claims above")
       
        const studentRef = db.collection('users').doc(claims.uid)
        const student = (await studentRef.get()).data() as user_mode
        let pass:boolean =true;
    
        if( (student?.name !== claims.name  || student?.pass !== claims.pass) ){
            pass = false
        } 
       
        if(!pass && ( student.email !== claims.email  || student.id !== claims.uid  || student.sec_id !== claims.sec_id  ) ){
            console.log('ver 2')
            return res.status(415).json({msg:'vertify',error:'invalid check'}); 
        }
        
        
        (req as any).name = student?.name;
        (req as any).id = student?.id;        
        (req as any).email = student?.email;
     
        if(identifyRole(student?.role) !== -1 ){ 
            console.log("role acti");
            (req as any).roles = Object.values(student?.role as any);
        }
        
        console.log('next')
        return next()
        
        
    }
    catch(er:any){
        if(er?.code ==="auth/id-token-revoked" ){
            return res.status(415).json('id_token revoked ')
        }
       
        return res.status(415).json({message:'vertify invalid',error:JSON.stringify(er)})
    }

    
}
