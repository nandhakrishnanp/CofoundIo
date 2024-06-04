import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "./AuthSlice";
import axios from "../axiosconfi";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  profilePost:[],
  loading: false,
  error: null,
};

const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/posts/fetchPosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
});
const fetchPostsByID = createAsyncThunk("/posts/fetchPostsByUserID", async (userID) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/posts/get/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
});


//posts/upload
const uploadPost = createAsyncThunk("/posts/upload", async ({ post_id, content, postimg }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("/posts/upload", { post_id, content, postimg }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      console.log("fetched");
      console.log(action.payload.post);
      state.posts = action.payload.post;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(uploadPost.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(uploadPost.fulfilled,(state,action)=>{
       state.loading=false
       toast.success(action.payload.msg);
    })
    builder.addCase(uploadPost.rejected,(state,action)=>{
      state.loading=false
      toast.success("Post Upload Failed");
   })
   builder.addCase(fetchPostsByID.fulfilled,(state,action)=>{
     const data = action.payload
     state.profilePost =data
   })

  },
});

export { fetchPosts ,uploadPost ,fetchPostsByID };
export const fetchAllPosts = (state) => state.posts.posts;
export const fetchAllPostByUser = (state)=>state.posts.profilePost;

export default postSlice.reducer;
