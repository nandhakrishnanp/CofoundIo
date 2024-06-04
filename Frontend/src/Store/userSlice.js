import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosconfi";
import { toast } from "react-toastify";
import { act } from "react";

const initialState = {
  status: "idle",
  userData: [],
  error: null,
  profileUser:[],
  isUserDataLoaded: false,
  isPasswordUpdated:false
};

const fetchUserData = createAsyncThunk("User/fetchUserData", async (token) => {
  try {
    if (token) {
      const response = await axios.get("/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (err) {
    state.error(err.message);
    toast.error("Error Fetching Data ");
  }
});

const fetchUserDataByID = createAsyncThunk("User/fetchUserByID",async(userId)=>{
   try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/user/info/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
      })
      return response.data;
   } catch (error) {
        toast(err.message)
   }
})

const updateProfileurl = createAsyncThunk(
  "/user/profileImg",
  async ({ url, tokenDetails }) => {
    try {
      const response = await axios.put(
        "/user/updateProfile",
        { profileUrl: url },
        {
          headers: {
            Authorization: `Bearer ${tokenDetails}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const updateBanner = createAsyncThunk(
  "/user/BannerImg",
  async ({ url, tokenDetails }) => {
    try {
      const response = await axios.put(
        "/user/updateBannerurl",
        { bannerUrl: url },
        {
          headers: {
            Authorization: `Bearer ${tokenDetails}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const updatepassword = createAsyncThunk("user/updatepassword", async({ email, otp, newpassword })=>{
   try {
    const response = await axios.put("/user/updatepassword", { email, otp, newpassword })
    return response.data;
    } catch (err) {
      console.log(err);
      }
})




const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { profileUrl, token } = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "success";
      state.userData = action.payload;
      state.isUserDataLoaded = true;
      console.log(action.payload);
    }),
      builder.addCase(updateProfileurl.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.profileUrl) {
          console.log(data.profileUrl);
          state.userData.userDetails.profileUrl = data.profileUrl;

          toast.success("Profile Image Changed ");
        } else {
          toast.error("error In changing Profile Image");
        }
      }),
    builder.addCase(updateProfileurl.rejected, (state, action) => {
      const error = action.payload;
      console.log(error);
    }),
    
    builder.addCase(updateBanner.fulfilled ,(state,action)=>{
      const data = action.payload;
      if(data.bannerUrl){
        state.userData.userDetails.BannerUrl = data.bannerUrl;
        toast.success("Banner Image Changed ");
      }else{
        toast.error("error In changing Banner Image");
      }

    } ),
    builder.addCase(updatepassword.fulfilled,(state,action)=>
    {
      const data = action.payload;
      if(data.message){
        toast.success("Password Changed ");
        state.isPasswordUpdated = true
        }else{
        toast.error(data.msg)
        }

    })

     builder.addCase( fetchUserDataByID.fulfilled ,(state,action)=>{
         const data = action.payload
         state.profileUser=data;
         
     })

  },
});
export const isUserData = (state) => state.user.isUserDataLoaded;
export const UserData = (state) => state.user.userData;
export const isPasswordUpdate = (state) => state.user.isPasswordUpdated;
export const profileUser = (state) => state.user.profileUser;
export { fetchUserData, updateProfileurl , updateBanner , updatepassword , fetchUserDataByID};
export default userSlice.reducer;
