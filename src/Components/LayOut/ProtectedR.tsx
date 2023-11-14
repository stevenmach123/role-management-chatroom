import React from 'react'
import { AuthP } from './AuthProvider'
import { Outlet,Navigate } from 'react-router-dom';

function ProtectedR() {
  let {user} = AuthP() 
  console.log(user)
  return (
    <>{/*user? <Outlet></Outlet> : <Navigate to="/signin"></Navigate> */}
      <Outlet></Outlet>
    </>
  )
}

export default ProtectedR
