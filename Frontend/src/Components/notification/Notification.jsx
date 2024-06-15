 import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from "react-redux";
import { allMyNotifications, fetchNotification, rejectJoinRequest } from '../../Store/notificationSlice';
import { acceptJoinRequest } from '../../Store/projectSlice';
 import notificationIcon from "../../assets/notify.webp"
 
 const Notification = () => {
    const dispatch = useDispatch()
    const allNotification = useSelector(allMyNotifications)
    useEffect(()=>{
         dispatch(fetchNotification())
         console.log(allNotification);
         console.log("dispatched");
    },[])
   return (
     <div className='bg-Secondary min-h-screen '>
        <Navbar/>
        <div  className=" flex flex-col items-center  ">

        <div className=" max-md:mt-[50px] min-h-screen    max-lg:w-full w-3/6">

        <h1  className=" font-bold text-2xl px-4 text-primary ">Notifications.</h1>
        
        { allNotification && allNotification.length>=0 ?allNotification.map((notification)=>{
          if(notification.notificatioType
            ==="USERJOINREQUEST"){
              return(
                <div className="flex  bg-white m-2 rounded-md font-monsherrat  font-semibold justify-between items-center px-3 py-4">
                    <h1 >{notification.content}</h1>
                    <div className=' flex gap-3'>

                    <button onClick={()=>{
                      dispatch(acceptJoinRequest(notification.nId))
                      setTimeout(() => {
                        dispatch(fetchNotification())
                      }, 1000);
                    }} className="bg-Primary hover:scale-105 transition-all duration-150 text-black px-4 py-2 rounded-md hover:text-primary">Accept</button>
                    <button onClick={()=>{
                      dispatch(rejectJoinRequest(notification.nId))
                      setTimeout(() => {
                        dispatch(fetchNotification())
                      }, 1000);
                    }}  className="bg-Primary hover:scale-105 transition-all duration-150 text-black px-4 py-2 hover:text-primary rounded-md">Decline</button>
                    </div>
                </div>
            )
            }
           
          }):<div className=' min-h-screen m-w-full flex-col flex justify-center items-center'>
            <img className=' w-[20%]' src={notificationIcon} alt="" />
               <p className='  font-semibold  text-dark-blue'>No Notifications</p>
            </div>}


      

      
         
        </div>
        </div>
     </div>
   )
 }
 
 export default Notification