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
  
const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNotification.fulfilled,(state , action)=>{
             const payload = action.payload
              console.log(payload)
             state.MyNotification=payload
             state.isnotification=true
        })
        builder.addCase(fetchNotification.rejected , (state,action)=>{
             state.isnotification = false
         })
    }

})



export default notificationSlice.reducer
export { fetchNotification}