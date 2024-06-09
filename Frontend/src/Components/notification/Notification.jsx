 import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from "react-redux";
import { allMyNotifications, fetchNotification } from '../../Store/notificationSlice';
 
 const Notification = () => {
    const dispatch = useDispatch()
    const allNotification = useSelector(allMyNotifications)
    useEffect(()=>{
         dispatch(fetchNotification())
         console.log(allNotification);
         console.log("dispatched");
    },[])
   return (
     <div>
        <Navbar/>
        <div  className=" flex flex-col items-center  ">

        <div className=" max-md:mt-[50px] bg-Secondary   max-lg:w-full w-3/6">

        <h1  className=" font-bold text-2xl px-4 md:mx-20">Notifications.</h1>

      {/* notifications render here---------> */}

      
         
        </div>
        </div>
     </div>
   )
 }
 
 export default Notification