

import React from 'react'
import {createBrowserRouter,createRoutesFromElements, Route,RouterProvider,Outlet,Navigate,useNavigate, Routes}  from "react-router-dom"

import  {NotFound} from './Components/OtherComponents/NotFound'
import Home from './Components/LayOut/Home';
import AddUser, { loader as loader1 } from './Components/AddUser/AddUser';
import Intro, { loaderIntro } from './Components/OtherComponents/Intro';
import ErrorUser,{} from './Components/OtherComponents/ErrorUser';


import {Board} from './Components/UserLayOut/Board';
import {User,loader as loader2} from './Components/UserLayOut/User'
import { UserLayout } from './Components/UserLayOut/UserLayout';
import SignIn from './Components/OtherComponents/SignIn';
import En from './Components/LayOut/En';
import Back from './Components/LayOut/Back';
import SignUp from './Components/OtherComponents/SignUp';
import { AuthProvider } from './Components/LayOut/AuthProvider';
import ProtectedR from './Components/LayOut/ProtectedR';
import ChatRoom from './Components/UserLayOut/ChatRoom';
import UserSetting from './Components/Setting/UserSetting';
import UserSettingLayout from './Components/Setting/UserSettingLayout';
import  { GroupBoard,Useri } from './Components/Setting/GroupBoard';
import MyInfo from './Components/OtherComponents/MyInfo';
import UpdateInfo from './Components/AddUser/UpdateInfo';
import Role from './Components/OtherComponents/Role';


function App() {
  
  const router = createBrowserRouter(
   
    createRoutesFromElements(
      
      <Route  path="/" element={<Back/>}>
    
      <Route path="" element={<En/>} />
      <Route path="signin" element={<SignIn/>} />
      <Route path="signup" element={<SignUp/>} />
      <Route path="role" element={<Role/>}  />
      <Route  element={<ProtectedR/>}  >
      <Route path="home" element={<Home/>} >
        <Route path='myinfo/:info' element={<MyInfo/>}/>
        <Route path='updateinfo/:info' element={<UpdateInfo/>}/>
        <Route  path="intro/:info" element={<Intro></Intro>}  loader={loaderIntro}  errorElement={<ErrorUser/>} />

        <Route  path="add" element={<AddUser/>} errorElement={<ErrorUser/>} action={loader1}  /> 
        <Route  path="users" element={<UserLayout />} >  
            <Route  path="board" element={<Board />} >
              <Route  path=":name/:obj"  loader={loader2} errorElement={<ErrorUser/>} element={<User rx={1}/>} />   
            </Route> 

            <Route  path="chatroom" element={<ChatRoom/>} />
        </Route>

      <Route >
        <Route path="userss" element={<UserSettingLayout/>}>
          <Route path="usersetting/:info" element={<UserSetting/>}  loader={loaderIntro}  ></Route> 
          <Route path="board" element={<GroupBoard/>} >
            <Route path=":name" element={<Useri/>} errorElement={<ErrorUser></ErrorUser>} />
          </Route>

        </Route>
        <Route  path="chatroom" element={<ChatRoom/>} /> 

      </Route>

      



      </Route>
  
      <Route path="*" element={<NotFound/>} />
    
      </Route>
    </Route>
      
    ) 
     
    )
  
  
  return (<>
    <RouterProvider router={router}></RouterProvider> 
   
    
      
    </> 
  )
}

export default App;


/*  USING NavLinkto:{`${params}`} 
":name/:id" 

params.set('name',String(user.name));
params.set('id',String(user.id));
setSearchParams(params)
*/

/*USING NavLink to:{`${params}`}
":name" 

params.set('name',String(user.name));
params.set('id',String(user.id));

 console.log(params.toString()); // params.toString() = params. Give name=khang&id=10
 console.log(params);


setSearchParams(params) //CUZ this can take "string code" and params 

*/


/* USING NavLink to={`${user.name}/${user.id}`}
:name/:obj 
{name:,obj:}
*/

//-----
/*
:name/:obj 
NavLink to={`${user.name}/${params}`} 

// params is nothing at first 
// while using prev_params give undefined at first
*/


/* WORKED FOR BOTH ROUTE PATH 



// UserLayOut.tsx
-- :name 
 <div key={user.name}  onClick={(e)=>ClickUser(e,user)} className='tar_block' >{user.name}&nbsp;{user.id}</div> 
 const ClickUser = (e:any,user:user_mode)=>{
        
        params.set('name',String(user.name));
        params.set('id',String(user.id));
        if(!prev_mouse.current?.isEqualNode(e.target)){
            console.log("ii")
            prev_mouse.current?.classList.remove('active')
            prev_mouse.current = e.target as HTMLElement
            e.target.classList.add('active')
            navi(`${params}`) // same with  navi(`${params.toSstring()}`) 
        } 
        setSearchParams(params)
         
}
URL: users/khang/name=khang&id=2?name=khang&id=2
  param // {name:khang,obj:'name=khang&id=2'}
   const pa2 = new URLSearchParams(param.obj)
  const pa = new URLSearchParams(search)  // search existed since  ?//
  pa.get('name')  =pa2.get('name')
  
--:name  users/name=khang&id=2?name=khang&id=2 
  param // {name:'name=khang&id=2'}
  const pa2 = new URLSearchParams(param.name)
  const pa = new URLSearchParams(search)  // search existed since ? //
   pa.get('name')  =pa2.get('name')


*/

/* WORKED ON BOTH PATH 

  const ClickUser2 = (user:user_mode) =>{
        params.set('name',String(user.name));
        params.set('id',String(user.id));
        return params 
    }

--:name 
   
  <NavLink key={user.name} style={({isActive})=>isActive?active:unactive}  to={`${ClickUser2(user)}`}  
  param // {name:'name=khang&id=2'} 
  const pa2 = new URLSearchParams(param.name) 
  param.get('name ') 

--:name/:obj
      <NavLink key={user.name} style={({isActive})=>isActive?active:unactive}  to={`${user.name}/${ClickUser2(user)}`}  
      param  // {name:khang, obj:'name=khang&id=2'}
      const pa2 = new URLSearchParams(param.obj) 
      param.get('name ')

*/