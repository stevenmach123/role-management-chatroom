import React, { createContext,useContext ,useState,useEffect,useRef} from 'react'
import f_app,{ initializeApp } from 'firebase/app'
import a_app,{FacebookAuthProvider, getAuth, getRedirectResult, GoogleAuthProvider, linkWithCredential, OAuthCredential, OAuthProvider, ProviderId, reauthenticateWithCredential, signInWithCredential, signInWithCustomToken, signInWithPopup, signInWithRedirect, signOut,User,UserCredential,onAuthStateChanged } from 'firebase/auth'
import s_app,{ collection, doc, getDoc, getFirestore, onSnapshot, Unsubscribe,Timestamp, serverTimestamp, getDocs, addDoc,query,where } from 'firebase/firestore'
import { firebaseConfig } from '../../route_services/service_funs'
import { axios1, ser1 } from '../../route_services/axiosService'
import {  user_mode } from '../../model'
import SignUp from '../OtherComponents/SignUp';
import { useNavigate } from 'react-router-dom';



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app)

const m = createContext<{user?:React.MutableRefObject<any>,cate?:{[key:string]:string},setCate?:any,setfresh?:React.Dispatch<React.SetStateAction<number>>,fresh?:number,class_template?:string[],setMyusers?:React.Dispatch<React.SetStateAction<user_mode[]>>,myusers?:user_mode[], signin?:(x:any)=>Promise<void>,logout?:()=>Promise<void>,vvv?:UserCredential['user'],signinG?:()=>void,signinF?:()=>void  }>({})
const AuthProvider = ({children}:any)=> {
  const user = useRef<any>()
  const navigate =useNavigate()
  const [myusers,setMyusers] = useState<user_mode[]>([])
  const [cate,setCate]= useState<{[key:string]:string}>({}) 
 const  [fresh,setfresh] = useState(1)
 const class_template = ['lion','cobra','dragon','shark']

  const [vvv,setV] = useState<UserCredential['user']>()
 
 console.log(cate)
  
  const support = async ()=>{
    try {
      const uu= await getRedirectResult(auth)
      console.log('support in provider',uu)
      if(uu){
        setV(uu?.user) 
        console.log('support redirect',uu.user.uid)
        const res = (await ser1.putOStudent(uu.user.uid)).data as any
        user.current = res.this_user
        if(res?.exist)
          navigate('/home')
        else
          navigate('/role') 
      }
    await ser1.deleteAllTypes()
    const types = await ser1.getAllTypes() 
    await ser1.postTypes(types.data as string[])
    
    }
    catch(e:any){
        if(e.response)
          console.log("provider support ",e.response.status,e.response.data)
        else if(e.request)
          console.log("provider support",e.request) 
        else
          console.log('provider support',e,e?.code)
        if (e?.code === "auth/account-exists-with-different-credential") {   
          try{
                
            const cred = OAuthProvider.credentialFromError(e)
            console.log(getAuth().currentUser,cred)
            if(auth.currentUser && cred){
               const uu = await linkWithCredential(getAuth().currentUser as User, cred)
               const res = (await ser1.putOStudent(uu.user.uid as string)).data as any
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
     
  } 
  const signin = async(body:any)=>{
    console.log('signin')
     const token = await axios1.post('/sign_in1',body) 
     const v = await signInWithCustomToken(auth,token.data) 
     console.log(v.user)
      setV(v.user)
    
  }
  const signinF =async ()=>{
        const provider = new FacebookAuthProvider()
        provider.addScope('email')
       // provider.addScope('public_profile')
      
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
      const uu = await signInWithPopup(auth,provider)
      const cred = GoogleAuthProvider.credentialFromResult(uu) 
      console.log(cred)    
      const res  =(await ser1.putOStudent(uu.user.uid)).data as any
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
        console.log(cred)
        if(getAuth().currentUser && cred){
           const uu =await linkWithCredential(getAuth().currentUser as User, cred)
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
      const users  = x.docs.map(u=>u.data())
      setMyusers(users)
    })
    const auth_user  = onAuthStateChanged(auth,x=>{
      console.log(x)
    })
   
    support()
    



   const v= new Date()
   //console.log(v.getTime(),v.getMilli)
   
    
    
   return ()=>{
     myusers_sub()
     frame_color_sub()
     auth_user()
      
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
      const indi_map_ref  = collection(db,'indi_v')
      const x = getDocs(indi_map_ref);
      console.log((await x).docs.length)
    }
    catch(e:any){
       console.log('vr',e)
     }
  }
  return (
    <>
  
      <m.Provider value={{user,myusers,setMyusers,cate,setCate,setfresh,fresh,class_template,signin, logout,vvv,signinG,signinF  }}>
      { /*<div className="flex absolute gap-2">
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
