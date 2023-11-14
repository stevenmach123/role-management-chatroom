import express, {Router} from "express"
import 'firebase/firestore'
import firebase from 'firebase/compat/app'

import {db} from '../server'
 import { user_mode } from "../model";
import { json } from "stream/consumers";
import { URLSearchParams } from "url";
import fs from 'fs'
import path from "path";
import structuredClone from "@ungap/structured-clone";
const router = express.Router() 

// TESTING ROUTES, NO EFFECT ON PROJECT

const fsp = fs.promises; 
router.get('/xii',async (req,res)=>{
    try{
     throw 'bad'
    }catch(e:any){
        return res.json(400).send('bad choice')
    }
      
})

router.get('/ni', async (req,res)=>{
    try{
    const da = await fsp.readFile(`${__dirname}/../data/student.json`,'utf8')
    const students:any = Array.from(JSON.parse(da))
    const usersRef = db.collection("users")
    const usersRefB = db.collection("test")
    
    for(let stu of students ){
        const p = await usersRef.doc(stu.name).set(stu)
        
        
    }
    const yu = students.find((t:any)=>t.name==="linh")
    await usersRefB.doc(yu.name).set(yu)
    const usersB =(await usersRefB.get()).docs 
    const users =(await usersRef.get()).docs 
    let nameAr:any[] = []
    let searchAr:string[]  = ["khang","linh"]
    Array.from(users.values()).forEach(u=>nameAr.push(u.data().name))
    console.log(nameAr)
    console.log(nameAr.map(u=> searchAr.includes(u)).some(tr=>tr)) 
    console.log(users.at(nameAr.indexOf("linh"))?.data())
    // const rstudents =(await usersRef.get()).docs.includes(duser)
    /*for(let [k,v] of rstudents.entries()){
        console.log(v.data())
    }*/
    res.json("sucess")
    }
    catch(e){
        console.log(JSON.stringify(e))
         res.sendStatus(400)
    }
    
  
    
}) 
router.get('/ni2', async (req,res)=>{
    const val = {name:"ser",id:20,class:"e-12",gmail:"ser@g.co"}
    const da = await fsp.readFile(`${__dirname}/../data/student.json`,'utf8')
    const students:any = Array.from(JSON.parse(da))
    const usersRef = db.collection("users")
    const usersRefB = db.collection("test")
    try{
        const q1 = await usersRef.orderBy(firebase.firestore.FieldPath.documentId()).get()
        const duser = await q1.query.where("name","==","linh").get()
        
        console.log(Array.from(duser.docs.values()).map(x=>x.data()) )
        res.json("sucess")
    }
    catch(e){
        console.log(JSON.stringify(e))
         res.sendStatus(400)
    } 
    
})




router.get('/ni3', async (req,res)=>{ 
    const usersRef = db.collection("users") 
    const snap_users =  usersRef.onSnapshot(snap=>{
        console.log("in snap all")
        const allusers = snap.docs.map(x=>x.data())
        console.log(allusers)
    },(error)=>{
        console.log('fire error ',JSON.stringify(error))
    })
   
    const snap_user =  usersRef.where("id","==",2) .onSnapshot(snap=>{
        console.log("in snap user")
        const allusers = snap.docs.map(x=>x.data())
        console.log(allusers)
     })
     const snap_user2 =  usersRef.doc('vinh').onSnapshot(snap=>{
        console.log("in snap userrr ")
        console.log(snap.id,"-",snap.data())
        
     })
    
    res.json("good ni3")
    
    
    
}) 

router.post('/ni3', async (req,res)=>{
    try{
    
    const da = req.body
    const usersRef = db.collection("users")  
    const {name,Class,id,gmail} = da; 
    if(!name || !Class || !id || !gmail)
        return res.status(400).json("not enough properties")
    const u  = await  usersRef.doc(name).set({name,class:Class,id,gmail})
  
    res.json('success post ni3')
    }
    catch(e){
        res.status(405).json("bad post"); console.log(JSON.stringify(e))
    }
    
} )
.delete('/ni3/:id', async (req,res)=>{ 
    try{
    const id = req.params.id
    
    const usersRef = db.collection("users") 
    const user = await usersRef.where("id","==",parseInt(id)).get()

    if(user.empty)
        return res.status(401).json("bad delete: no user")
    
    const del_user = await usersRef.doc(id).delete()
    console.log("hurray2 ",del_user)
    res.json('success delete ni3') 
    } 
    catch(e){
        res.status(405).json("bad delete")
        console.log(JSON.stringify(e))
        
    }
})


/*
 where
*/


/*
* EX 1:
 const yu = students.find((t:any)=>t.name==="linh")
await usersRefB.doc(yu.name).set(yu)
await usersRefB.doc(yu.name).set(yu)
const yu_doc =  (await usersRefB.get()).docs.find(x=>x.id ==="linh") as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> 
const duserB = (await usersRefB.get()).docs.at(0) as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> //for docs.fill(doc,2), 

const rstudents =(await usersRef.get()).docs.indexOf(yu_doc) //yu_doc even with linh data() with same id,data(), but not match
console.log(yu_doc.data())
console.log(rstudents)

*EX 2:
 const rstudents =(await usersRefB.get()).docs.every(x=>x.get('foo.bar') >=1)

 *EX 3: 
    const usersRefB = db.collection("test")
    const userB = (await usersRefB.get()).docs
    const rstudents =(await usersRef.get()).docs.fill(userB.at(0),1,3)


*/
export default router