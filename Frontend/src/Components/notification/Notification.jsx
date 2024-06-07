 import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from '../../Store/notificationSlice';
 
 const Notification = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
         dispatch(fetchNotification())
         console.log("dispatched");
    },[])
   return (
     <div>
        <Navbar/>
        
     </div>
   )
 }
 
 export default Notification