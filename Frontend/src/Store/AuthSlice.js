import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosconfi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const initialState = {
  isLogin: false,
  status: "idle",
  error: null,
  token: null,
  isregistraionSuccess: false,
  isOtpSend: false,
};

const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    try {
      const response = await axios.post("/user/login", { username, password });

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password, fullName }) => {
    try {
      const response = await axios.post("/user/register", {
        username,
        email,
        password,
        fullName,
      });

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const generateOtp = createAsyncThunk("user/generateOtp", async ({ email }) => {
  try {
    const response = await axios.post("user/generateOtp", { email: email });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout (state, action) {
      state.token = null;
      state.isLogin = false;
      
     
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload;
        console.log(data.msg);

        if (data.token) {
          state.status = "fullfilled";
          state.isLogin = true;
          state.error = null;
          toast.success("login succesfull");
          state.token = data.token;
          localStorage.setItem("token", data.token);
        } else {
          state.status = "idle";
          state.isLogin = false;
          state.error = data.msg;

          toast.error(data.msg);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        const data = action.payload;

        state.status = "idle";
        state.isLogin = false;
        state.error = action.error.message;
        toast.error("Login Failed");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const data = action.payload;
        if (data) {
          if (data.accepted) {
            state.isregistraionSuccess = true;
            toast.success("Registration Success");
          } else {
            toast.error(data.msg);
          }
        } else {
          toast.error("Registration failed");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error("Registration Failed");
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        const data = action.payload;
        state.isOtpSend = true;
        toast.success(data.msg);
      });
  },
});
export const isuserregistered = (state) => state.auth.isregistraionSuccess;
export const isLoginState = (state) => state.auth.isLogin;
export const error = (state) => state.auth.error;
export const token = (state) => state.auth.token;
export const isLoading = (state) => state.auth.status;
export const isOtpSendState = (state) => state.auth.isOtpSend;
export const  AuthActions = authSlice.actions
export { loginUser, registerUser, generateOtp };
export default authSlice.reducer;
