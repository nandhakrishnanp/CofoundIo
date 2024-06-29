const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const StoreMessage = require("./fireBase/messageController");
const { GenerateSummary } = require("./Gemini/gemini");
mongoose.connection.useDb("CoFoundio");
const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
});
// GenerateSummary(1)
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "CoFoundio",
    });
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err.message);
  }
};

connectDB();

app.use("/user", require("./Routes/userRoute"));
app.use("/messages", require("./Routes/messageRoutes"));
app.use("/posts", require("./Routes/postRoutes"));
app.use("/project", require("./Routes/projectRoutes"));

app.get("/", (req, res) => {
  res.json({
    msg: "Hello server is live",
  });
});
const logRoomUsers = (room) => {
  const roomInfo = io.sockets.adapter.rooms.get(room);
  const numUsers = roomInfo ? roomInfo.size : 0;
  console.log(`Number of users in room ${room}: ${numUsers}`);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinroom", (room) => {
    socket.join(room);
    console.log("User Joined Room", room);
    logRoomUsers(room);
  });

  /* data = {
   projectId:53526,
   message:{
     UserId: "userId",
      content: "message" 
   }
    date: "date"
 
}        

*/
  socket.on("sendmessage", (data) => {
    console.log(data);
    StoreMessage(data.projectId, data.message);
    socket.broadcast.to(data.projectId).emit("message", data.message);
  });
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
    logRoomUsers(room); // Log the number of users in the room
  });

  socket.on("disconnect", (room) => {
    socket.leave(room);
    console.log("User Disconnected");
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is Runnning on " + process.env.PORT);
});
