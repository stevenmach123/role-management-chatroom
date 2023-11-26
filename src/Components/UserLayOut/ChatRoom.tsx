import { useEffect, useState,MouseEvent,useRef } from "react"
import { msg_mode, Sleep, user_mode } from "../../model"
import { axios1, ser1 } from "../../route_services/axiosService";
import './ChatRoom.css'
import { AuthP, db, auth } from '../LayOut/AuthProvider';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { colorRole, identifyRole, upperOneLetter } from '../../route_services/service_funs';
import s_app,{ onSnapshot, doc, Unsubscribe, collection, Timestamp, serverTimestamp, query, orderBy, getDocs, getDoc, where, addDoc, setDoc } from 'firebase/firestore';
import Alert from 'react-bootstrap/Alert';
import qs from 'qs'



function ChatRoom() {
   const {user,cate,myusers,class_template,vvv}= AuthP()
   const  cate_ar = Object.entries(cate as unknown as {[key:string]:string})
   const [type_ram,setType]=useSearchParams();
    const [loading,setLoading] = useState<boolean>(true)
   const [allowedCate,setAllowedCate]  = useState<[string,string][]>([])
   const [users,setUsers] = useState<any[]>([])  
   const [Msg,setMsg] = useState<msg_mode[]>([])
   const navigate = useNavigate()

   const typeFind = (e:MouseEvent,type:string|null)=>{
    setType(cur_type=>{
       cur_type.delete('user')
        if(type)
            cur_type.set("type",type);
        else
            cur_type.delete("type"); 
        return cur_type
    })
  }
  useEffect(()=>{
      const x = myusers && type_ram.get('type') ? myusers.filter(u=>u?.class === type_ram.get('type') || (u?.manage  && u.manage.includes(type_ram.get('type') as unknown as string)) || identifyRole(u.role)===1    ):[]  
      x.sort(sort_sup)
      setUsers(x)    
      support_navi_indi() 

  },[type_ram.get('type'),myusers])
  
  const sort_sup =(a:user_mode,b:user_mode)=>{
    const ra = identifyRole(a.role)
    const rb  = identifyRole(b.role)
    if(ra ===rb){
       return  a.id === user?.current.id && b.id !== user?.current.id?-1:1
    }
    return ra-rb
  }
  const support_type_msg = async () =>{
    try {
    if(type_ram.get('type')){
      const v = collection(db,`${type_ram.get('type')}_msg`)
      const qv = query(v,orderBy('time'),where('time','!=',""))
      const d = await getDocs(qv)
      const dmap = d.docs.map(t=>{
        return {...t.data(),docid:t.id}
      })
      
      setMsg(dmap)
    }
    }
    catch(e:any){
      console.log('switch group',e)
    }
  }
  const support_navi_indi =async ()=>{
    try{
      let obj = {} as any
      const token  = await vvv?.getIdToken() 
      if(type_ram.get('user')){
        obj['name'] = indi_user.current.name
        obj['id'] = indi_user.current.id

        const stu = (await ser1.getNStudent(obj,{'id_token':token})).data as user_mode
        if( stu.class !==  type_ram.get('type') ){
            type_ram.delete('user')
            setType(type_ram)
        }

      }
      
    }
    catch(e:any){
      if(e.response.status === 400 || e.response.status===401){
            type_ram.delete('user')
            setType(type_ram)
      }
    }

  }


  useEffect(()=>{  
    support_type_msg()

  },[type_ram.get('type')])
  

  useEffect(()=>{
    const support = async ()=>{
      console.log("chatroom  user",cate)
     

      if(identifyRole(user?.current.role) === 1){
       
         setAllowedCate(cate_ar)
      }
      else if(identifyRole(user?.current.role) === 2){
        
        let o = user?.current?.manage &&  user?.current?.manage.length >0 ?  cate_ar.filter(v=> (user.current.manage as Array<string>).includes(v[0])) :[] 
        if(user?.current.class && !o.find(v=> v[0] ===user?.current.class)  ){
          const idx = cate_ar.findIndex(v=>user?.current.class ===v[0])
          if(idx >-1)
            o.push(cate_ar[idx])
        }
        //console.log(user?.current.class,o)
        setAllowedCate(o)
      }else{
        let o = cate_ar.filter(x=> x[0] === user?.current?.class)
        setAllowedCate(o)
      }

      if(type_ram.get('type')){
          const types = (await ser1.getAllTypes()).data as string[]
         if(!types.includes(type_ram.get('type') as string )){
          setType('')
         }
         else if(user?.current.manage && !(user?.current.manage as string[]).includes(type_ram.get('type') as string)   )
          setType('')
      } 
        

      setLoading(false)
    }
    support()
  },[user?.current,cate])





    const addText =async ()=>{
        let inputMe = document.querySelector('.input-me') as HTMLInputElement
        const x = {} as any
        try{
          x['text'] =  inputMe.value 
          x['name'] = user?.current.name
          x['id']= user?.current.id         
          if(!type_ram.get('user')){
            x['type'] = type_ram.get('type')
            await axios1.post('/msg/type',x)
          }
          else{
            x['to_id'] = indi_user.current.id
            x['from_id'] =user?.current.id
            await axios1.post('/msg/indi',x)
          }

        }catch(e:any){
            if(e?.response)
              console.log('addText',e.response.data)
            else 
              console.log('addText',e.request)
        }
        
        
        inputMe.value  = ''
    
    } 
    const colorByGroup = (uz:user_mode|string,...option:any[]):string=>{
       if(!option.length){
          const u = uz as user_mode 
          if(u?.manage){
              if(u.manage.find(x=>x ===type_ram.get('type')))
                  return colorRole(u.role)
              else
                  return 'white'
          }else
            return colorRole(u.role)

       }
       else{
          const u: user_mode |undefined  = myusers?.find((u:user_mode)=>u.id ===uz as string) 
          if(u && u?.manage){
            if(u.manage.find(x=>x ===type_ram.get('type')))
                return colorRole(u.role)
            else
                return 'white'
          }else
            return colorRole(u?.role)
       }

      
    }


    const clear = async (ee:any)=>{
      try{
        const token = await vvv?.getIdToken()
        if(type_ram.get('type')){
            await axios1.delete(`/msg/types/${type_ram.get('type')}`,{headers:{'id_token':token}, params:{roles:['admin']}, paramsSerializer: params => {
              return qs.stringify(params,{ arrayFormat: "repeat" })
            } })
        
        console.log('clear success')
        }
      }catch(e:any){
        const notice = document.querySelector('.warn-admin') as HTMLElement
        (ee.target as HTMLButtonElement).disabled = true;
        notice.classList.add('active')
        await Sleep(2000);
        (ee.target as HTMLButtonElement).disabled = false
        notice.classList.remove('active')

        if(e?.response ){
          console.log('addText',e.response.data,e.response.status)
          if(e?.response.status ===415)
            navigate('/signin')
        }
        else if(e?.request)
          console.log('addText',e.request.responseText, e.request.status)
        else
          console.log('no server response');
        


           
        
      }
      
    }

    

    ////// individuals messsage 
    const indi_user = useRef<user_mode>({})
    
     
    const indi_find = async(obj:any)=>{
      indi_user.current = obj
      setType(cur_type=>{
        cur_type.set('user',obj.name) 
        return cur_type
      })
        
    }
    useEffect(()=>{
      let indi_sub:Unsubscribe;
      let type_sub:Unsubscribe;
      const support = async ()=>{
      try{

        if(type_ram.get('user') && indi_user.current.id &&  user?.current.id){
          const ref = doc(db,'indi_map',user?.current.id as string)
          const ref_other = doc(db,'indi_map',indi_user?.current.id as string) 
          let dos = await getDoc(ref)
          let dos_other = await getDoc(ref_other)
          if(!dos.get(indi_user.current.id) ) { 
              if(dos_other.get(user?.current.id))
                  await  setDoc(ref,{[indi_user.current.id]: dos_other.get(user?.current.id)},{merge:true})
              else{
                const msg_id = (await axios1.get('/crypto')).data
                console.log('v1')
                await  setDoc(ref,{[indi_user.current.id]: msg_id},{merge:true})
              }
               
          }
        
          dos = await getDoc(ref) 
         
          const ref2 = collection(doc(db,'indi_msg',dos.get(indi_user.current.id)),'a')
          
          if(dos.get(indi_user.current.id)){
            console.log('v2')
            const c = await getDocs(query(ref2,orderBy('time'),where('time','!=',"")))
            const msg = c.docs.map(t=>{
              
              return {...t.data(),docid:t.id}
             });
             console.log(c.docs.length)
            setMsg(msg)
          }  
          indi_sub = onSnapshot(ref2,async (x)=>{
            console.log('sub text')
            const c=  await getDocs(query(x.query,orderBy('time'),where('time','!=',"") ))
            const msg = c.docs.map(t=>{
              return {...t.data(),docid:t.id}
             });
            setMsg(msg)
          })
           
        }
        else if(type_ram.get('type')){
          const ref = collection(db,`${type_ram.get('type')}_msg`)
          type_sub = onSnapshot(ref,async (x)=>{  
            const c=  await getDocs(query(x.query,orderBy('time'),where('time','!=',"") ))    
             const msg = c.docs.map(t=>{
              return {...t.data(),docid:t.id}
             });
             setMsg(msg)
          })

        }
          
        
      }catch(e:any){
        console.log('msg id activate',e)
      }
      }
      support()

      return ()=>{
        indi_sub && indi_sub()
        type_sub && type_sub()
      }
      
    },[type_ram.get('user'),type_ram.get('type')])



    /////



  return (<>{
      loading?<>Loading...</>:
      <section className="sec-box3 mx-auto phone">
          <div className="group item-box ">{
            allowedCate.map(cat=>
              <div className="phone text_f1 pad" key={cat[0]} onClick={(e)=>typeFind(e,cat[0])} style={type_ram.get('type')===cat[0]?{color:'black',backgroundColor:cat[1],boxShadow:'0px 3px 8px 0px black'}:{}} >{cat[0]}</div>  
            )
          }</div>
          <div className="member item-box ">{
            users.map((u:any)=>
              <div  onClick={e=>indi_find(u)}   style={type_ram.get('user') && indi_user.current.id ===u.id?{color:colorByGroup(u),boxShadow:'0px 3px 8px 0px black',textDecoration:' 3px orange solid underline', fontWeight:'700'}:{color:colorByGroup(u)} } className="text_f1 phone pad" key={u?.id}>{u.name}</div> 
              )
          }</div>
          <div className="message item-box relative">

            <div className={`absolute top-0 z-10 left-0 ${!type_ram.get('user') && type_ram.get('type')?'':'no-display' }`}>
                <button onClick={e=>clear(e)} className="btn btn-outline-info" >Clear</button> 
                <Alert className="warn-admin" key='danger' variant='danger'>Only Admin can delete messages</Alert>

            </div>

            {
            type_ram.get('type')?<>
            <div className="phone show-msg relative">
              {
              Msg.map((msg)=>
                msg.id !==user?.current.id?
                  <div key={msg.docid} className="phone block msg-block other">
                    <div style={{color:colorByGroup(msg.id as string,1)}} className="msg-label"><label >{upperOneLetter(msg.name)}</label></div>
                    <div className="inline-block msg-other">{msg.text}</div>
                  </div>:<div  key={msg.docid} className="phone block msg-block me">
                    <div style={{color:colorByGroup(msg.id as string,1)}} className="msg-label"><label  >{upperOneLetter(msg.name)}</label></div>
                    <div className="inline-block msg-me">{msg.text}</div>
                  </div>
              )
              
          }</div>
            <div className="input-msg flex items-center justify-center gap-x-3 space-around">

                <input className="input-me"  placeholder="Text me..."/>
                <button className="no-button" onClick={addText}><i   className="bi bi-arrow-right"></i></button>

            </div>
          </>: null


        } </div>
      </section>

  }</>)


}

export default ChatRoom
