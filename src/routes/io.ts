
import { Router } from 'express';

import {  db } from '../server';
import admin from 'firebase-admin'; 
import { vertify } from './vertify';

import { bb, vertifyRole } from './vertifyRole';


const router = Router();
router.post('/type',async (req,res)=>{
  
  const {type,name,id,text}= req.body
  /*const x = db.collection().get()
  ;(await x).query.isEqual()*/
  if(!name || !id !|| !type)
      return res.status(400).json('missing properties')
  try{
    const ref = db.collection(`${type}_msg`)
    
    await ref.add({
      name:name,id:id,text:text,time:admin.firestore.FieldValue.serverTimestamp()
    })
    
    return res.json('msg/type add sucess')

  }
  catch(e){
      console.log("msg/type post",JSON.stringify(e))
      return res.status(402).json({msg:'msg/type post',data:JSON.stringify(e)})
  }
  
})
router.post('/indi', async (req,res)=>{
    try{
      const {from_id,to_id,name,id,text} =req.body
      if(!from_id || !to_id || !name ||!id)
        return res.status(400).json('missing properties')
      const user_map = await db.collection('indi_map').doc(from_id).get()
      let msg_id:string =''
      if(!user_map.get(to_id ))
        return res.status(400).json('msg/indi post missing msg_id')

      msg_id =  user_map.get(to_id )
      const indi_msg_id_ref = db.collection(`indi_msg`).doc(msg_id)
      const indi_msg_id  = await indi_msg_id_ref.get()
      if(!indi_msg_id.exists)
          await indi_msg_id_ref.set({x:null},{merge:true})
      
      await indi_msg_id_ref.collection('a').add({
        name:name,id:id,to_id:to_id,text:text,time:admin.firestore.FieldValue.serverTimestamp()
      })
      return res.json('msg/indi add sucess')
    }catch(e){
      console.log("msg/indi post",JSON.stringify(e))
      return res.status(402).json({msg:'msg/indi post',data:JSON.stringify(e)})
    }
})
router.delete('/indi', async (req,res)=>{
    try{
        const id = req.query.id as string
        if(!id)
          return res.status(400).json('missing properties')
        const user_map_ref =  db.collection('indi_map').doc(id)
        const indi_msg_ref =   db.collection('indi_msg')
        const user_map  = await user_map_ref.get()
        const ar_msg_id = Object.entries(user_map.data() as {[key:string]:string}).map(x=>x[1])
        console.log(ar_msg_id)
        const indi_msg =  await indi_msg_ref.where(admin.firestore.FieldPath.documentId(),'in',ar_msg_id).get()
      
        console.log(indi_msg.size)
        
        for(let doc of indi_msg.docs){
         await doc.ref.delete()
         await doc.ref.collection('a').listDocuments().then(v=>{
            v.map(x=>x.delete())
         })
        }
        await user_map_ref.delete()
        const users_map = await db.collection('indi_map').get()
        for(let doc of  users_map.docs )
            await doc.ref.update({[id]:admin.firestore.FieldValue.delete()})

        return res.json('indi delete success')

    }
    catch(e){
      console.log("msg/indi delete",JSON.stringify(e))
      return res.status(402).json({msg:'msg/indi delete',data:JSON.stringify(e)})
    }
})



router.delete('/types/:type',vertify,vertifyRole,async (req,res)=>{
   const type= req.params.type
  
   if (type  === 'undefined' || !type)
      return res.status(400).json('missing properties')
    try{
      const ref = db.collection(`${type}_msg`)
      const x = await ref.get()
      for(let v of x.docs){
          await v.ref.delete()
      }
    
      return res.json('delete msg success')

      
    }
    catch(e){
      console.log("hi",JSON.stringify(e))
      return res.status(402).json({msg:'msg/type delete',data:JSON.stringify(e)})
  }
    

} )

export default router