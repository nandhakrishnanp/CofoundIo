import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosconfi";
import { toast } from "react-toastify";

const initialState={
    MyNotification : [],
    isnotification:false
}

//fetch current users notification
const fetchNotification = createAsyncThunk("project/getmynotification", async()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("project/getNotification", { headers:{
       Authorization: `Bearer ${token}`,
      }})
  
      return response.data;    
    } catch (error) {
        return error.msg;
    }
  
  
  })

  const rejectJoinRequest = createAsyncThunk("project/rejectJoinRequest", async(nId)=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("project/rejectJoinRequest",{nId},{ headers:{
       Authorization: `Bearer ${token}`,
      }})
  
      return response.data;    
    } catch (error) {
        return error.msg;
    }
  
  
  }
    )
  
const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotification.fulfilled,(state , action)=>{
             const payload = action.payload
             
             state.MyNotification=payload.notification
             state.isnotification=true
        })
        builder.addCase(fetchNotification.rejected , (state,action)=>{
             state.isnotification = false
         })
         builder.addCase(rejectJoinRequest.fulfilled,(state , action)=>{
            const payload = action.payload
            toast.success(payload.msg)
            
         })
    }

})


export const allMyNotifications = (state)=> state.notification.MyNotification
export default notificationSlice.reducer
export { fetchNotification, rejectJoinRequest} 