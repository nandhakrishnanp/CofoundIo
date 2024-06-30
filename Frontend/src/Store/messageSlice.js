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
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast(err.message);
  }
});

const FetchChatSummary = createAsyncThunk("fetch/summary", async ({ projectId, chatData }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("/messages/summary", {projectId,chatData}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    const message={
      projectId:projectId,
      content:response.data.summary,
      date:Date.now(),
      UserId:"bot"
    }
    return message;
  } catch (error) {

    toast(err.message);
  }
}
);


const messageSLice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    addMessageToStore: (state, action) => {
      const { projectId, message } = action.payload;
      if (state.messages[projectId]) {
        state.messages[projectId].push(message);
      } else {
        state.messages[projectId] = [message];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchGroupChat.fulfilled, (state, action) => {
      const Response = action.payload;
      state.messages[Response.projectId] = Response.messages;
    })
    builder.addCase(FetchChatSummary.fulfilled, (state, action) => {
      const message = action.payload;
      if (state.messages[message.projectId]) {
        state.messages[message.projectId].push(message);
      } else {
        state.messages[message.projectId] = [message];
      }
    });

  },
});

export { FetchGroupChat, FetchChatSummary  };
export const allChatMessages = (state) => state.messages.messages;
export const { addMessageToStore } = messageSLice.actions;
export default messageSLice.reducer;


