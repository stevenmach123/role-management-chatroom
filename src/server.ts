
import express from "express"
import cors from "cors"

//import {getFirestore} from 'firebase/firestore';
import  admin from 'firebase-admin'; 
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from "./route_services/service_funs";
import myjson from './route_services/AdminService.json'
import router1 from './routes/r1';
import ioo from './routes/io'
import { properties, } from "./model";
import dot from "dotenv"

import  cookieParser  from 'cookie-parser';
//import  {onRequest} from "firebase-functions/v2/https";



const app = express();

const admin_app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: myjson.project_id,
      clientEmail:myjson.client_email,
      privateKey:myjson.private_key,
        
  }),
})   
//const f_app = initializeApp(firebaseConfig)
//const f_db = getFirestore(f_app)

const db = admin_app.firestore()


app.use(cors({
 origin:['http://localhost:4002','https://www.thunderclient.com','http://localhost:3000','http://localhost:8080',"https://chatroom-de811.web.app","https://chatroom-de811.firebaseapp.com"] ,
 credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cookieParser())

app.use('/',router1)
app.use('/msg',ioo)



console.log(process.env.PORT)
const PORT = properties.ser_port ||8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});    

export const chatappgc = app
//export const chatapp = onRequest({},app)


export {db}


 
