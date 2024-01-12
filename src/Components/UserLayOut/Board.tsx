import { CSSProperties, useCallback,useEffect, useRef, useState,MouseEvent, RefObject, MutableRefObject, ChangeEvent, useMemo } from 'react'

import { json, Link, NavLink, NavLinkProps, Outlet, resolvePath, useLocation, useNavigate, useOutlet, useOutletContext, useResolvedPath, useSearchParams } from 'react-router-dom'
import { user_mode,Sleep ,vx} from '../../model'
import { ser1,dec } from '../../route_services/axiosService'
import _ from 'lodash'

import { AuthP } from '../LayOut/AuthProvider'
import { toen } from '../../route_services/service_funs'
import FetchService from '../../route_services/FetchService';
import { mock_error_api } from '../../route_services/service_funs2'
import Sign from '../OtherComponents/Sign';
import { useParams } from 'react-router-dom';

const div = {
    border:'1px solid red',
} as CSSProperties
const div2 = {
    border:'1px solid yellow',
} as CSSProperties
const color_rad = (color:string)=> `linear-gradient(to bottom right,${color} 30%,rgb(222, 209, 170) 80%)`
export const Board:React.FC =()=>{
    const navigate = useNavigate()
    
    const navi = useNavigate()
    const {cate,user,vvv,myusers,my_spec_user} =AuthP()
    
    const  cate_ar = Object.entries(cate as unknown as {[key:string]:string})
    const this_path_ur = new URL(window.location.href)
    const current_path = useResolvedPath('.',{relative:'route'}); 

    const [params,setSearchParams] = useSearchParams();
    const [type_ram,setType]  = useSearchParams();  
    const [checked,setChecked] = useSearchParams();
    
    const f1  =FetchService()
    const f2 = FetchService()
    const param = useParams();
    const [users,setUsers] = useState<user_mode[]>([])

    let current_users = type_ram.get("type") ? myusers?.filter(u=>u.class === type_ram.get('type') ).sort((a,b)=>(a.name as any)-(b.name as any)):users.sort((a,b)=>(a.name as any)-(b.name as any)) 
    

    
    //console.log("state01 ",current_users)
     
    ////NAVIGATE HANDLE
    useEffect(()=>{
        const cate_exist = myusers?.find(u=>u?.class ===type_ram.get('type'))
        const user_exist = myusers?.find(u=>u.id ===my_spec_user?.id)
        if(user_exist){ 
            if(type_ram.get('type'))
                cate_exist?navi(`${this_path_ur.pathname}?type=${type_ram.get('type')}`) : navi(this_path_ur.pathname)
            else
                navi(this_path_ur.pathname)
            
        
        }
      
            
    },[my_spec_user]) // my_spec_user may potentially updated before changes of users





    const nona = useCallback(()=>{
        const rt= document.querySelectorAll(".pp");  
        if(rt){
        setUsers(my_users=> {
            const map_users = new Map(my_users.map(u=>[u.name,u]));
            rt.forEach((x)=>{
            const x1 = x as HTMLInputElement;
            const check = (map_users.get(x1.value) as user_mode)?.admit
            //console.log("--d ",map_users.get(x1.value));
            if(check){
                x1.checked = true;
            }
            })
            return my_users
        })

        }
    },[setUsers])

   
    const support_set_users = useCallback(async ():Promise<user_mode[]|undefined>=>{
        try{
            const token = await vvv?.getIdToken()
            const tusers =await f2.fun<user_mode[],{},object>({endpoint:'getAll',params:{'id_token':token},note:'support_set_users'}) 
            tusers && setUsers(tusers)
            const rt= document.querySelectorAll(".pp");  
            if(rt?.length) 
                nona();   
            return tusers 
            
          }
        catch(e:any){
            mock_error_api({where:'Board',error:e})
           
        }
    },[vvv])

    

    useEffect(()=>{
        const support = async ()=>{
            try{
                const token = await vvv?.getIdToken()
                const tusers =await f1.fun<user_mode[],{},{}>({endpoint:'getAll',params:{'id_token':token} }) 
                tusers && setUsers(tusers)
                const rt= document.querySelectorAll(".pp");  
                if(rt?.length) 
                    nona();     
            }
            catch(e:any){
                mock_error_api({where:'Board',error:e})

            }
        }
        support()
        return()=>{
            console.log("effect return layout") 
        }
    },[])

    useEffect(()=>{    
       let ur =  new URL(window.location.href)  
       if(ur.searchParams.size !==0){
            //navi(`${this_path}?${ur.searchParams}`)
       }else{
            //navi(`${this_path}`)
       }
    },[myusers])

    

    useEffect(()=>{
        nona();
        return()=>{
            //console.log("type_ram effect return",console.log(type_ram.toString()));
            //console.log("params effect return",console.log(params.toString()));

        }
    },[type_ram.get('type')]); 
   


    const typeFind = useCallback((e:MouseEvent,type:string|null)=>{      
        setType(cur_type=>{
            if(type)
                cur_type.set("type",type);
            else
                cur_type.delete("type"); 
            return cur_type
        })
    
    },[setType])

    const Mycategories = cate_ar.map(cat=>(
          <div key={cat[0]} style={type_ram.get('type')===cat[0]?{backgroundImage:color_rad(cat[1]),color:"black"}:{border:`1px solid ${cat[1]}`,color:cat[1]}} onClick={(e)=>typeFind(e,cat[0])} className="cate">{cat[0]}</div>  
        )) 
   
    
    const ClickUser = (e:any,user:user_mode)=>{
        
        params.set('name',String(user.name));
        params.set('id',String(user.id));
        
            
         navi(`${user.name}/${params}`)
        //setSearchParams(params.toString())
         
    }   
    
    const ClickUser2 = (user:user_mode) =>{
        params.set('name',String(user.name));
        params.set('id',String(user.id));
        params.delete('type');
        return params 
    }
   const clickCheck = async (e:any)=>{
    const x1 = e.target as HTMLInputElement;
    checked.set("name",x1.value)
    console.log(x1.checked)
    if(x1.checked)
        checked.set("admit","true")
    

     ser1.postRegis(checked).then(res=>
        setUsers(res.data as user_mode[])
    ).catch(e=>{console.log("regis error",e)}) 
    
  

    checked.delete('name')
    checked.delete('admit')
    
   }  
   const tok = useCallback(async ()=>{
    console.log('tok')
      const t = await vvv?.getIdToken()
      if(t)
        toen.t  = t
   } ,[vvv])

    const FillUsers = current_users?.map((u,i)=>{
      if(u.name === user?.current?.name && u.id === user?.current?.id)
        return null
      //  return <div key={user.name}  onClick={(e)=>ClickUser(e,user)} className='tar_block' >{user.name}&nbsp;{user.id}</div> 
        return( <div style={{pointerEvents:f2.gen_loading?'none':'initial'}} key={u.name} className=' flex justify-between px-2 py-1'> 
                    <NavLink  id={u.name}  className={`linking unactive ${({isActive}:any)=>isActive?"active":""}`} onClick={tok}  to={`${u.name}/${ClickUser2(u)}?${type_ram}`}  ><div  className='tar_block' >{u.name}</div> </NavLink>
                    <div>
                        <input  onChange={clickCheck}  className="form-check-input pp" type="checkbox" value={u.name} id="flexCheckDefault"/>
                    </div>
                </div> 
        
        )
    })  



  
    return(
    <div  className="bb div_adjust">
    
        {
        
        f1.loading?<section className="sign"><Sign info="loading" message={<>Loading...</>}></Sign></section>:
        f1.error?<p>Error is <span>{JSON.stringify(f1.error)}</span></p>:
        users.length===0?<section>No Student found</section>:
        (<section className='div_adjust'>
            
            <div className="con">
                {Mycategories}
                <div  className='text-decoration-underline' style={{fontSize:"1.4rem"}} onClick={(e)=>typeFind(e,null)}  >Cancel filter</div>
            </div>

            <div style={{flexGrow:'1'}}className="sec-box  relative"> 
                <div  className="item-box  one relative"> {/*no relative, the absolute inside will move out*/}
                    <div className="final_scroll_adjust">{FillUsers}</div>
                    
                </div> 

            <div  className="item-box two div_adjust  relative"> 
                <Outlet context={{support_set_users,users,f:f2,current_path}}></Outlet>
            </div> 
            </div>
        </section>)
    }
    </div>
    
    )
    
}















/*NOT WORKED 
 const ClickUser = (e:any,user:user_mode)=>{
    params.set('name',String(user.name));
    params.set('id',String(user.id));
    if(){
        navi(`${user.name}/${params}`)
    }
    setSearchParams(params.toString()) // NO NEED THIS,cuz will be added to "search paramaters" of either /users or /users/p/name=p&id=12
 }
 //Add to /users when there is loader(); Add to /users/p/name=p&id=12 when no loader(). 



*/



/*
this_path = useResolvedPath('.',{relative:path})  {pathname:/*path we in, /*no search   }
current_path = useResolvedPath('.',{relative:route})  // {pathname:'/user/board', /*no search   }

const Del = (name:string)=> {
      const x = document.querySelector(`.linking#${name}`) as unknown as HTMLAnchorElement 
      const selected_path = new URL(x.href) has searchParams ?type='ee' that reflected with this_path  

      new URL(selected_path.origin+this_path) // no searchParams       
}

 
*/


/*


<NavLink key={user.name} style={({isActive})=>isActive?active:unactive}  to={`${user.name}/${ClickUser2(user)}?${type_ram}`}  ><div  className='tar_block' >{user.name}&nbsp;{user.id}</div> </NavLink> 
 // active during filter, when click on specific Navlink  as users/khang/type=c&name=khang&id=12?type=c 
  // Not active when click "cancel filter" as  users/khang/type=c&name=khang&id=12. Cuz need users/khang/name=khang&id=12
  //Here the different in filter mood, active is see through search Url not contain ?type=
*/




/*
 /* NOT USE THIS FOR NOW
  const Del = async (name:string)=>{
        
    try{    
        const us = await ser1.deleteStudent(name)
        const us_data = us.data as user_mode[]
        const link = document.querySelector(`.linking#${name}`) as unknown as HTMLAnchorElement

        setUsers(us_data)

        let my_type:string;
        let user_exist:user_mode|undefined;
        const select_path = new URL(link.href)
        console.log("this_path",this_path)
        console.log("select_path",select_path)
        if(this_path.pathname === select_path.pathname){
            console.log(type_ram.get('type'));
            if(type_ram.get('type')){
                user_exist =us_data.find(u=> u.class === type_ram.get('type') )
                my_type = type_ram.get('type') as string
                if(user_exist){    
                    navigate(`${current_path.pathname}?${type_ram.toString()}`)
                }
            }
            else{
                console.log("common in")
                my_type =users.find(u=>u.name===name)?.class as string
                user_exist =us_data.find(u=> u.class === my_type)
                navigate(`${current_path.pathname}`)
            }
            if(!user_exist){
                await ser1.deleteType(my_type );
                //const types = await ser1.getTypes()
                //setCate(types.data as string[])
                navigate(`${current_path.pathname}`)
            }

        }
        else{
            console.log("except")
            my_type =users.find(u=>u.name===name)?.class as string
            
            user_exist =us_data.find(u=> u.class === my_type)
            if(user_exist){
              navigate(`${current_path.pathname}?type=${type_ram.toString()}`) 
            }
            else{
                await ser1.deleteType(my_type );
                //setCate(types.data as string[])
                if(!select_path.searchParams.get('type')) 
                    return  navigate(`${this_path.pathname}`) 

                navigate(`${current_path.pathname}`)
            }

        }

        
       
        
    }  
    catch(e:any){
        if(!e?.response)
            console.log('Delete server error ',e)
        else if(e.response.status ===403){
            console.log('Delete student not success',e.response.data) 
        }
        else if(e.response.status === 405){
            console.log("Delete type not success",e.response.data)
        }
        
    }
    
         
}  */
