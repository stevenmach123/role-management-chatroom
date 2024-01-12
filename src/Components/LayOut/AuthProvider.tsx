import React, { createContext,useContext ,useState,useEffect,useRef} from 'react'
import f_app,{ initializeApp } from 'firebase/app'
import a_app,{FacebookAuthProvider, getAuth, getRedirectResult, GoogleAuthProvider, linkWithCredential, OAuthCredential, OAuthProvider, ProviderId, reauthenticateWithCredential, signInWithCredential, signInWithCustomToken, signInWithPopup, signInWithRedirect, signOut,User,UserCredential,onAuthStateChanged, isSignInWithEmailLink, AuthCredential, linkWithRedirect } from 'firebase/auth'
import s_app,{ collection, doc, getDoc, getFirestore, onSnapshot, Unsubscribe,Timestamp, serverTimestamp, getDocs, addDoc,query,where } from 'firebase/firestore'
import { firebaseConfig } from '../../route_services/service_funs'
import { axios1, ser1 } from '../../route_services/axiosService'
import {  user_mode,f2 } from '../../model'
import SignUp from '../OtherComponents/SignUp';
import { useNavigate } from 'react-router-dom';
import FetchService from '../../route_services/FetchService'


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app)

const m = createContext<{user?:React.MutableRefObject<any>,cate?:{[key:string]:string},setCate?:any,setfresh?:React.Dispatch<React.SetStateAction<number>>,fresh?:number,class_template?:string[],setMyusers?:React.Dispatch<React.SetStateAction<user_mode[]>>,myusers?:user_mode[], my_spec_user?:user_mode,signin?:(x:any)=>Promise<void>,logout?:()=>Promise<void>,vvv?:UserCredential['user'],signinG?:()=>void,signinF?:()=>void,f?:f2  }>({})
const AuthProvider = ({children}:any)=> {
  const user = useRef<any>()
  const navigate =useNavigate()
  
  const [myusers,setMyusers] = useState<user_mode[]>([])
  const [my_spec_user,setMysuer] = useState<user_mode>()
  const [cate,setCate]= useState<{[key:string]:string}>({}) 
 const  [fresh,setfresh] = useState(1)
 const class_template = ['lion','cobra','dragon','shark'] 
  const [vvv,setV] = useState<UserCredential['user']>()
 let uu:UserCredential|null;
 const f= FetchService()
  

 console.log(cate)
  
  const support = async ()=>{
    try {
    
    
      uu= await getRedirectResult(auth)
      console.log(uu)
      if(uu){
       
        console.log('support redirect',uu.user)
        f?.setGenLoading(true)
        const res = (await ser1.putOStudent(uu.user.uid)).data as any
        const cred  =OAuthProvider.credentialFromResult(uu) as OAuthCredential
        uu= await signInWithCredential(auth,cred)
        setV(uu?.user) 
        user.current = res.this_user
        if(res?.exist)
          navigate('/home')
        else
          navigate('/role') 
      }
    await ser1.deleteAllTypes()
    const types = await ser1.getAllTypes() 
    console.log("provider getAllTypes",types)
    await ser1.postTypes(types.data as string[])
    
    }
    catch(e:any){
        f?.setGenLoading(true)
        if(e.response)
          console.log("provider support ",e.response.status,e.response.data)
        else if(e.request)
          console.log("provider support",e.request) 
        else
          console.log('provider support',e?.code)
        if (e?.code === "auth/account-exists-with-different-credential") {   
          try{
                
            const cred = OAuthProvider.credentialFromError(e) as OAuthCredential
            //uu= await signInWithCredential(auth,cred)
            console.log(getAuth().currentUser,cred)
            
            if(cred){
              if(!getAuth().currentUser){
                const token = (await axios1.post('/sign_in1',{id:e?.customData._tokenResponse.localId})).data 
                 await signInWithCustomToken(auth,token)
              }
              
              uu = await linkWithCredential(getAuth().currentUser as User, cred)
              const res = (await ser1.putOStudent(uu.user.uid)).data as any
               
               user.current = res.this_user
               setV(uu.user)
              if(res?.exist)
                navigate('/home')
              else
               navigate('/role')
              
            }
          
          }catch(e){
            console.log('common user',e)
          }


          



        }   
    }
    finally{
      f?.setGenLoading(false)
    }
     
  } 
  const signin = async(body:any)=>{
    console.log('signin')
     const token = (await axios1.post('/sign_in1',body)).data 
     uu = await signInWithCustomToken(auth,token) 
    
    setV(uu.user)
    
  }
  const signinF =async ()=>{
        const provider = new FacebookAuthProvider()
        provider.addScope('email')
       provider.addScope('public_profile')
     
        await signInWithRedirect(auth,provider)
        
  } 
  
  const signinG = async ()=>{
    try{
      
      const provider = new GoogleAuthProvider()
      provider.addScope('profile')   
      provider.addScope('email') 
      provider.setCustomParameters({
        prompt:"select_account"
      })
      f.setGenLoading(true)
      uu = await signInWithPopup(auth,provider)
      const res  =(await ser1.putOStudent(uu.user.uid)).data as any
      const cred  =OAuthProvider.credentialFromResult(uu) as OAuthCredential
      uu= await signInWithCredential(auth,cred)
      user.current = res.this_user
      setV(uu.user)
      if(res?.exist)
        navigate('/home')
      else
       navigate('/role')
      
     
    }
    catch(e:any){
      console.log('g',e)
      if(e?.code === "auth/account-exists-with-different-credential"){
        try{
        const cred = OAuthProvider.credentialFromError(e)
        console.log(getAuth().currentUser,cred)
        if(cred){
           const token = (await axios1.post('/sign_in1',{id:e?.customData._tokenResponse.localId})).data 
            await signInWithCustomToken(auth,token)
            uu =await linkWithCredential(getAuth().currentUser as User, cred)
           const res =(await ser1.putOStudent(uu.user.uid as string)).data as any
           setV(uu.user)
           user.current = res.this_user
          if(res?.exist)
            navigate('/home')
          else
            navigate('/role')
         
        }

        }
        catch(e:any){
           console.log('common user',e)
        }

      }
    }
    finally {
      f.setGenLoading(false)
    }
    
  }
 const logout = async ()=>{
   signOut(auth).then(x=>{
      navigate('/signin')
   }).catch(e=>{
    navigate('/signin')
   })
 }

  

 
 useEffect(()=>{
    let user_sub:Unsubscribe;
    if(user.current){
      const refuser = doc(db,'users',user.current.id)
      user_sub  = onSnapshot(refuser,(x)=>{
          if(!x.data())
            navigate('/signin')
          
          user.current  =x.data()
          
      })
    }

  return() => {
    console.log('user effect',user)
    if(user_sub)
      user_sub()
  }
 },[user.current?.name,user.current?.id]) 


  useEffect(()=>{
    const ref= collection(db,"type_frame")
    const frame_color_sub = onSnapshot(ref,(x)=>{
      let b:any = {}
      let z=  x.docs.forEach(d=>{d.data()  
          b[d.id] =d.get('color')    
      })
      
      setCate(b)
      
    })
    const refusers = collection(db,'users')
    const myusers_sub = onSnapshot(refusers,(x)=>{
      
      const oneuser  = x.docChanges().map(x=>x.doc.data())
      const users  = x.docs.map(u=>u.data() as user_mode) 
      console.log("proviver1>",oneuser)
      setMysuer(oneuser[0])
      setMyusers(users)
    })
    
    
   
    support()
    



   const v= new Date()
   //console.log(v.getTime(),v.getMilli)
   
    
    
   return ()=>{
     myusers_sub()
     frame_color_sub()
     
      
   } 
  },[])



 
  const x = async ()=>{
    console.log(">><<")
    console.log((getAuth().currentUser))
    console.log((getAuth().currentUser as any)?.accessToken)
    let v  =await (getAuth().currentUser?.getIdToken())
    console.log(v)
  
  }
  const xr = async ()=>{
    console.log(vvv) 
    
  }
  const vr = async ()=>{
    try{
    

      /*fun2<user_mode>(async()=>{
       let param  = new URLSearchParams('name=aaa&pass=a1!') 
          return (await ser1.getStudent(param)).data;
      }) */
      let param  = new URLSearchParams('name=aaa&pass=a1') 
     
      
      
    }
    catch(e:any){
       console.log('vr',e)
     }
  }
  return (
    <>
  
      <m.Provider value={{user,myusers,setMyusers,my_spec_user,cate,setCate,setfresh,fresh,class_template,signin, logout,vvv,signinG,signinF,f  }}>
      {/*<div className="flex absolute gap-2">
        <button onClick={x}className="btn z-50">x</button>
        <button onClick={xr}className="btn z-50">xr</button>  
        <button onClick={vr}className="btn z-50">vr</button>  
  </div>   */}
        
        {children}
      </m.Provider>
    </>
  )
}
export const AuthP = ()=>{
   return useContext(m)
}

export  {AuthProvider}



/*OLD CODE FOR  e?.code === "auth/account-exists-with-different-credential"

catch(e:any){
      console.log('g',e)
      if(e?.code === "auth/account-exists-with-different-credential"){
        try{
        const cred = OAuthProvider.credentialFromError(e)
        console.log(getAuth().currentUser,cred)
        if(getAuth().currentUser && cred){
            uu =await linkWithCredential(getAuth().currentUser as User, cred)
           const res =(await ser1.putOStudent(uu.user.uid as string)).data as any
           setV(uu.user)
           user.current = res.this_user
          if(res?.exist)
            navigate('/home')
          else
            navigate('/role')
         
        }

        }
        catch(e:any){
           console.log('common user',e)
        }

      }
    }

*/