import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosconfi";
import { toast } from "react-toastify";

const initialState = {
  messages: {},
};

const FetchGroupChat = createAsyncThunk("fetch/messages", async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/messages/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("yeah chat fetched", response.data);
    return response.data;
  } catch (error) {
    toast(err.message);
  }
});

const messageSLice = createSlice({
  name: "Messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchGroupChat.fulfilled, (state, action) => {
      const chat = action.payload;

      state.messages = chat;
    });
  },
});

export { FetchGroupChat };
export const allChatMessages = (state) => state.messages.messages;
export default messageSLice.reducer;
