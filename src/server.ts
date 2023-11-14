
import express,{Router,Response, response} from "express"
// import * as express from "express" //can't call app = express()
import cors from "cors"

import {getFirestore} from 'firebase/firestore';
import * as admin from 'firebase-admin'; 
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "./route_services/service_funs";
import myjson from './route_services/AdminService.json'
import router2 from './routes/r2' ;
import router1 from './routes/r1';
import ioo from './routes/io'
import { properties, user_mode } from "./model";
import "dotenv/config"
import {Server} from 'socket.io'
import serr,{createServer} from 'http'
import  cookieParser  from 'cookie-parser';
import {instrument} from '@socket.io/admin-ui'
const app = express();

const admin_app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: myjson.project_id,
      clientEmail:myjson.client_email,
      privateKey:myjson.private_key,
        
  }),
})   
const f_app = initializeApp(firebaseConfig)
const f_db = getFirestore(f_app)

const db = admin_app.firestore()


app.use(cors({
 origin:['http://localhost:4002','https://www.thunderclient.com','*'] ,
 credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cookieParser())
//router.use("/hi", router1);
app.use('/testFire',router2)

app.use('/',router1)
app.use('/msg',ioo)




  
const PORT = properties.ser_port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const app2 =express()
const httpServer = new serr.Server(app2)

const io = new Server(httpServer, {cors:{
  origin: ['http://localhost:4002','https://admin.socket.io']
  },
  allowEIO3:true
  
});


io.use(async(socket,next)=>{
   try{
      

   }catch(e){
     return next(new Error("bad socket"))
   }
})

io.on('connection',(socket)=>{
  
  console.log("hi",socket.id)

  socket.on('receive-x',(va)=>{
    console.log("x",va,socket.id)
  })
  socket.on('disconnect',()=>{
    console.log(socket.id,'disconnected')
  })
})

httpServer.listen(properties.soc_port,()=>{
  console.log("server running",properties.soc_port)
})
instrument(io,{auth:false})

export {db,admin_app,f_app,f_db}

/*
 
* error receive, but status 200 when return to axios. While axios.data is {}
app.get("/hi",async (req,res)=>{
  -> fetch data 
    return/throw json(data,{status:400}) //throw "yoyo"
})

*similar to above 
app.get("/hi",async (req,res)=>{
  throw "yoyo" // throw/return new Response("hello data") // not data receieve
  res.json(users) //not go here
})


*/