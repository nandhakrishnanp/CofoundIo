
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosconfi";
import { toast } from "react-toastify";

const initialState= {
     status:'idle',
     allprojects:[],
     myprojects:[],
     error:null
}

const fetchAllTeam = createAsyncThunk("project/fetchproject",async()=>{
      const response = await axios.get("project/discover")
      return response.data
})
const fetchMyTeam = createAsyncThunk("project/fetchMyproject",async()=>{
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("project/myProject",{ headers:{
     Authorization: `Bearer ${token}`,
    }})

    return response.data
  } catch (error) {
      return error.message
  }
 

})
const createTeam = createAsyncThunk("project createTeam",async({ projectId, tittle,theme , discription  })=>{
     try {
     
          const token = localStorage.getItem("token");
          const response = await axios.post("/project/createProject",{projectId, tittle,theme , discription }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          return response.data;
        } catch (error) { 
          return error.message;
        }
})

const  addJoinRequest = createAsyncThunk("project/joinRequest" , async(projectId)=>{
  try {
     
    const token = localStorage.getItem("token");
    const response = await axios.post("/project/joinrequest",{projectId}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) { 
    return error.message;
  }
   

})

 
const acceptJoinRequest = createAsyncThunk("project/acceptJoinRequest", async(nId)=>{
  try {
     
    const token = localStorage.getItem("token");
    const response = await axios.post("/project/acceptJoinRequest",{nId}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) { 
    return error.message;
  }
} )

const projectSLice = createSlice({
    name: 'projects',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(fetchAllTeam.fulfilled,(state,action)=>{
            const team = action.payload
            
            state.allprojects=team.projects
          })
          builder.addCase(fetchAllTeam.rejected,(state,action)=>{
              toast.error(action.payload.msg)
          })
         builder.addCase( createTeam.fulfilled,(state,action)=>{
             toast.success(action.payload.msg) 
         })
         builder.addCase (createTeam.rejected,(state,action)=>{
             toast.error(action.payload.msg)
         })
         builder.addCase(addJoinRequest.fulfilled,(state,action)=>{
          toast.success(action.payload.msg) 
         })
         builder.addCase (addJoinRequest.rejected,(state,action)=>{
          toast.error(action.payload.msg)
      })
      builder.addCase(acceptJoinRequest.fulfilled,(state,action)=>{

        toast.success(action.payload.msg) 
       })
       builder.addCase (acceptJoinRequest.rejected,(state,action)=>{
        toast.error(action.payload.msg)

       })
       builder.addCase(fetchMyTeam.fulfilled, (state,action)=>{
          state.myprojects = action.payload.projects
          
       })
    }
})

export {fetchAllTeam ,createTeam , addJoinRequest ,acceptJoinRequest,fetchMyTeam }
export const allTeams = (state)=> state.projects.allprojects
export const MyTeams =(state)=>state.projects.myprojects
export  default projectSLice.reducer