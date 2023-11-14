import {Request,Response} from 'express'
import { user_mode } from '../model'
import { admin_app } from '../server'
import { db } from '../server'

export const vertify = async (req:Request,res:Response,next:any)=>{
    const id_token = req.headers['id_token'] as string

    if(!id_token)
        return res.status(415).json({message:'vertify no id_token'})

    admin_app.auth().verifyIdToken(id_token,true).then(async claims=>{
        console.log(claims?.name )
        console.log(claims?.pass )
        console.log(claims?.id )
        console.log(claims?.email )
        if(claims.proD_key){
            console.log(claims?.proDkey )
        }
        const studentRef = db.collection('users').doc(claims.id)
        const student = (await studentRef.get()).data() as user_mode
        let pass:boolean =false; 
    
        if( (student?.name !== claims.name  || student?.pass !== claims.pass) ){
            pass = true
        } 
       
        if(pass && ( student.email !== claims.email  || student.id !== claims.proD_key.uid  || student.name !== claims.proD_key.displayName  ) ){
            console.log('ver 2')
            return res.status(415).json({msg:'vertify',error:'invalid check'}); 
        }
        
        
        (req as any).name = student?.name;
        (req as any).id = student?.id;        
        (req as any).email = student?.email;
     
        if(student?.role) 
            (req as any).roles = Object.values(student?.role as any);
        (req as any).auth_time = claims.auth_time;  
        
        next()
        
        
    }).catch((er:any)=>{
        if(er?.code ==="auth/id-token-revoked" ){
            return res.status(415).json('id_token revoked ')
        }
       
        return res.status(415).json({message:'vertify invalid',error:JSON.stringify(er)})
    }) 
}
