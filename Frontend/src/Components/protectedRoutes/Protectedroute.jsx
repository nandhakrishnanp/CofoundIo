import React from 'react'
import { useSelector } from 'react-redux'
import { isLoginState } from '../../Store/AuthSlice'
import { Navigate, Outlet } from 'react-router-dom'

const Protectedroute = () => {
    const isAuth = useSelector(isLoginState)
    console.log("state is " + isAuth);
  return isAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default Protectedroute