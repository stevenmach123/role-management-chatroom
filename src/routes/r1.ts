import express, {Router} from "express"


import {db} from '../server'
 import { Sleep, user_mode } from "../model";
import { URLSearchParams } from "url";

import {colorLogic, generateId, identifyRole} from '../route_services/service_funs'
import * as admin from 'firebase-admin'; 
import a_app,{ Auth, ProviderId, signInWithCustomToken  } from "firebase/auth";
import { vertify } from './vertify';
import { DocumentData } from "firebase/firestore";
import UpdateInfo from '../Components/AddUser/UpdateInfo';
import { UserInfo } from "firebase-admin/lib/auth/user-record";
import crypto from 'crypto'

//admin.firestore();
 const router = Router();


router.post('/sign_in1',async  (req,res)=>{
    const student = req.body as user_mode
    const token =  await admin.auth().createCustomToken(student.id as string,student)
    
    return res.json(token)
    

} )
router.delete('/delete_user/:uid',async (req,res)=>{
    const uid = req.params.uid
    await admin.auth().deleteUser(uid)
    res.json("delete user success")
})



router.put('/o_student/:uid', async (req,res)=>{
    try{
    
    const uid = req.params.uid
    const user = await admin.auth().getUser(uid)

    const userRef =  db.collection('users')
    const duser  =await  userRef.where('email','==',user.email).get()
    
    const id_help =(...id:any) =>{
        const g =  user.providerData.find(p=>  p.providerId===ProviderId.GOOGLE)
        const proD = user.providerData.find(p =>p.uid ===id[0]) 
        if(proD?.providerId  !== ProviderId.GOOGLE){
            if(g){
                return g.uid
            }
            else if(id[0] && proD)
                 return id[0]
            else
                return user.providerData[0].uid
        }else{
            if(!g)
                return user.providerData[0].uid
            else 
                return id[0]
        }
    
    }
    const providerData_help = ()=>{
        let result:any[] =[]
        for(let p of user.providerData){
            let v:any = Object.assign({},p.toJSON())
            v.phoneNumber = ''
            result.push(v)
            
        }
        console.log(result)
        return result
    }
 
    let proD_key = {} as any
    
    let exist:boolean =false;
    if(duser.empty ){
        const new_id = id_help()
        exist=false
        const proD = user.providerData.find(p=>p.uid === new_id) as UserInfo
        proD_key =  Object.assign({},proD.toJSON())
        
        if(proD)
            await userRef.doc(new_id).set({
                name:proD.displayName,
                id: new_id,
                class:'',
                email:user.email,
                providerData:providerData_help()
            
            })   
    }
    
    else{
        const myuser = duser.docs.at(0)?.data()
        const new_id = id_help(myuser?.id)

        const proD_new = user.providerData.find(p=>p.uid === new_id) as UserInfo
        proD_key =  Object.assign({},proD_new.toJSON())

        
        if(!myuser?.role)
            exist =false
        else
            exist =true 
        
        if(new_id !== myuser?.id && proD_new &&myuser){    
             
            const body  = myuser    
            body.id = new_id 
            body.providerData = providerData_help()
            body.name = proD_new.displayName
            body.email = user.email
            body.class =''
            await userRef.doc(new_id).set(body)
        
            await duser.docs.at(0)?.ref.delete()
            
        }

    }
    proD_key.phoneNumber =''
    const this_user = (await userRef.doc(proD_key.uid).get()).data()
    
    await admin.auth().setCustomUserClaims(uid,{
        email: user.email,id:proD_key.uid,proD_key :proD_key
    })
    res.json({this_user,exist })   
    }
    catch(e){
        console.log("error o_student put",JSON.stringify(e))
        res.status(403).json({msg:"error o_student put",data:JSON.stringify(e)})
    }
})



router.get('/testt',async (req,res)=>{
    const userRef =  db.collection('test1')
    const v   =await userRef.where('king.a','>=',5).get()
    const result = v.docs.map(x=>x.data())
    res.json(result)
})






////










router.get('/student',async(req,res)=>{
    try{
       const name = req.query.name as string
        const pass = req.query.pass as string
        if(!name || !pass)
            return res.status(400).json("missing properties")

        const userRef =  db.collection('users')
        const myusers = await userRef.where('name','==',name).get()
        if(!myusers.empty) {
            const dusers = myusers.docs.at(0)?.data()
            if(dusers?.pass !== pass )
                return res.status(401).json("user pass not match")
            return res.json(dusers)
            
        }
        else {
            return res.status(401).json("user name not found")    
        }
       
    }
    catch(e){
        console.log("error student get",e);
        return res.status(405).json(JSON.stringify(e))
    }

})


router.put('/student',async(req,res)=>{
    try{
    const student = req.body as user_mode 
    if(!student.name || !student.pass)
        return res.status(400).json('student need properties')

    const usersRef = db.collection("users")
    const fuser = await usersRef.where('name','==',student?.name).get() 

    if(!fuser.empty)
        return res.status(409).json("user is already exist")
    
    student.id  = await generateId(5)
  
    if( identifyRole(student.role)=== 2)
        student.manage = [] 

    await usersRef.doc(student.id).set(student)
    return res.json("put student suceed")        

   /* usersRef.doc(student?.name).set(student).then(async()=>{
        console.log("post succeed")        
        const users = await usersRef.get();
        const myusers = users.docs.map(x=>x.data())
    })  */
    }
    catch(e){
        if(e ==='max user exceed')
            return res.status(409).json('get id- max user exceed')

        return res.status(400).json("error student put")
    }

} )



router.get('/getall',vertify,async (req,res)=>{
    console.log("in get all")
    try{
        const usersRef = db.collection("users")
        const users  = await usersRef.get()
        
        let myusers = users.docs.map(u=>u.data())
        
        return res.json(myusers);
        
        /*
        
        //const myu  =users.docChanges().map(x=>x.doc.id)
        //console.log(myu)  */
    } 
    catch(e){  
        console.log("error /getall  ",e)
        return res.json(JSON.stringify(e));
    }


})

router.get('/normal_student',vertify,async (req,res)=>{
    const name = req.query.name as string
    const id = req.query.id as string
    if(!name || !id)
        return res.status(400).json("normal_student get missing properties")
    const userRef =  db.collection('users')
    const myusers = await userRef.doc(id).get()
    if(myusers.exists) {
        const dusers = myusers.data() 
        if(dusers?.name !== name )
            return res.status(401).json("normal_student get id not match")
        return res.json(dusers)
    }
    else
        return res.status(401).json("normal_student get username not found")
    
    
})


router.post('/student',vertify,async (req,res)=>{
    const obj = req.body as any
    
    try{
        const users = await  db.collection('users').where('id',"==",obj?.id).get()
        
        if(users.empty)
            return res.status(400).json("post student - no user exist")
        const userRef =  db.collection('users').doc(obj.id)
        for(let [k,v] of Object.entries(obj)){   
            await userRef.update({[k]:v})
        }
        await Sleep(1)
        let allusers = await db.collection('users').get()
        const all_users = allusers.docs.map(x=>x.data())
        const myuser= (await userRef.get()).data()
      
        if(identifyRole(myuser?.role) !== 2 && identifyRole(myuser?.role) !== -1)
            await userRef.update({manage:admin.firestore.FieldValue.delete()})

        return res.json({message:"post student success",student:myuser,allstudent:all_users })
    }catch(e:any){
        console.log("post student error",JSON.stringify(e))
        return res.status(400).json({message:JSON.stringify(e)})
    }
    
})


router.post('/student_update',async (req,res)=>{
    const {name,id,new_name,new_pass} = req.body
    try{
        const ref  =   db.collection('users')
        if(!name || !id)
            return res.status(400).json("missing account properties")
        const users = await  ref.where('name',"==",name).where('id','==',id).get()
        if(users.empty)
            return res.status(401).json("student_update - no user exist")

        if(new_name){
            const u = await ref.where('name',"==",new_name).get()
            if(!u.empty)
                return  res.status(409).json("student_update - there is a user")

            const user_data =  users.docs.at(0)?.data() as DocumentData
            if(new_pass)
                    user_data.pass  = new_pass     
            user_data.name = new_name
            await ref.doc(id).set(user_data)
        

        }else if(new_pass){
            await ref.doc(id).update({pass:new_pass})
        }
        
        Sleep(1)
        return res.json('/student_update success')
    } 
    catch(e){
        console.log(JSON.stringify(e))
        return  res.status(403).json('student_update error')
    }
    
})









router.delete('/student/:id',vertify,async (req,res)=>{ 
    const id = req.params.id as string
    try{
    if(!id)
        res.status(400).json("missing properties") 
  
        const userRef =  db.collection('users')
        await userRef.doc(id).delete()
        const users = (await userRef.get())
        const stus =  users.docs.map(u=> u.data())
        res.json(stus)
        
    }
    catch(e){
        console.log("error student delete",e)
        res.status(403).json(JSON.stringify(e)) 
    }

} )

router.delete('/types',async(req,res)=>{
    try{
        const typeRef =db.collection('type_frame');
        const types= await typeRef.get()
        for(let docs of types.docs ){
            await docs.ref.delete()
        }
        res.json("delete sucess")        
        
    }
    catch(e){
        console.log("error types delete",JSON.stringify(e)) 
        res.status(403).json({message:'error types delete',data:JSON.stringify(e)}) 
    }
})

router.get('/types',async (req,res)=>{
    try{
    const userRef= db.collection('users')
    const users = await userRef.get();
    let sg = new Set<string>()
    for(let user of users.docs ){
       let g= await user.get('class')
       if(g)
        sg.add(g)
    
    }
   
    res.json([...sg])
    }
    catch(e){
        console.log("error types get",JSON.stringify(e)) 
        res.status(405).json({message:JSON.stringify(e)}) 
    }
    
})
router.post('/types',async (req,res)=>{
    try{
        const types = req.body as string[]
        const typeRef= db.collection('type_frame')
        for(let type of types){
            //console.log(type)
            let doc= await typeRef.where(admin.firestore.FieldPath.documentId(),'==',type).get()
            //console.log('type2')
            if(doc.empty && type){
                await typeRef.doc(type).set({color:colorLogic(type)})
            }
        }
       
        return res.json('type post sucess')
        
    }
    catch(e){
            console.log("error types post",JSON.stringify(e)) 
        return res.status(405).json({message:JSON.stringify(e)}) 
        }
})



router.delete('/type/:type',async (req,res)=>{
    try{
        const type = req.params.type as string ;
        if(!type){
           return res.json('delete type nothing') 
        }
        const typeRef= db.collection('type_frame')
        await typeRef.doc(type).delete() 
       
        return res.json("delete type sucess")
    }
    catch(e){
        return res.status(405).json('delete type fail')
    }

})


router.get('/id',async (req,res)=>{ 
    try {
        const userRef =  db.collection('users')
        const users = await userRef.where('id','!=',null).get()
        const id_ar =  users.docs.map(x=> x.get('id'))
        return res.json(id_ar)
    }
    catch(e){
    
        return res.status(400).json('get id- no see any id')

    }
})

router.get('/crypto',async (req,res)=>{
    try{
       const v =  crypto.randomBytes(10).toString('hex')
        return res.json(v)
    }catch(e){
        return res.status(401).json("no crypto")
    }
})



router.post('/regis/:obj',async (req,res)=>{
    try{
        const userRef =  db.collection('users')
        
        const obj = new URLSearchParams(req.params.obj)
        const name  = obj.get('name') as string ;
        const admit = obj.get('admit');
    
        const duser =  await  userRef.doc(name).get()
        if(!duser){
           return res.status(401).json("regis not found user")
        }
        if(admit){
            await userRef.doc(name).update({admit:true})
        }
        else{
            await userRef.doc(name).update({admit:false}) 
        }
        const users = (await userRef.get()).docs.map(u=>u.data())
        
        return res.json(users)
      
    }
    catch(e){
        console.log("error regis") 
        return res.status(401).json(JSON.stringify(e))  
    }
})







export default router

/*
 const typeRef= db.collection('types')
    const types = await typeRef.get();
    if(!types )
        return res.status(405).json("no see type collection")
    const mytypes =  types.docs.map(t=>t.id);
    res.json(mytypes);
    }
    catch(e){
        console.log("error types get") 
        res.status(405).json(JSON.stringify(e)) 
*/



 /* 
    try{
        const userRef =collection(db,"users")
        const Docuser =  await getDocs(userRef)
        const users: user_mode[] = Docuser.docs.map(ind=>{
                  return ind.data() as user_mode;
        }) 
        res.json(users)
        
        }catch(e){
            console.error(e);
            res.status(500).json("not good1")
        }   */





/*

router.delete('/student/:name',async (req,res)=>{ 
    const name = req.params.name as string
    try{
        const userRef =  db.collection('users').doc('stu')
        const myusers = await (await userRef.get()).data() 
        
        if(myusers && myusers[name]){
            
            userRef.update({[name]: firebase.firestore.FieldValue.delete() }) 
            const myusers2 = await (await userRef.get()).data() 
            //console.log("i",myusers2)
            if(myusers2){
                const us = Object.entries(myusers2).map(u=>u[1])
                res.json(us)
            }
        } 
        
    }
    catch(e){
        console.log("error delete",e)
        res.status(403).json(JSON.stringify(e)) 
    }

} )


*/


/*
router.post('/regis/:obj',async (req,res)=>{
    try{
        const userRef =  db.collection('users').doc('stu')
        const myusers = await (await userRef.get()).data() 
        const obj = new URLSearchParams(req.params.obj)
        const name  = obj.get('name') as string ;
        const admit = obj.get('admit');
        
        let user ;
        if(myusers)
            user = myusers[name] as unknown as user_mode

        if(user){
            if(admit)          
                userRef.update({[name]:{...user,admit:true} })
            else 
                userRef.update({[name]:{...user,admit:false} }) 
            res.status(200).json("good regis");  
        }
        else 
            res.status(400).json("regis not found");  
    }
    catch(e){
        res.status(401).json(JSON.stringify(e))  
    }
})

*/

