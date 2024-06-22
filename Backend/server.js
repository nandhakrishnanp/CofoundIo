const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
mongoose.connection.useDb("CoFoundio");
const io = require('socket.io')(3001,{
  cors:{
      origin: '*',
  }
})

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_DB_URL
      ,
      {
        dbName: "CoFoundio",
      }
    );
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err.message);
  }
};

connectDB();

app.use("/user", require("./Routes/userRoute"));

app.use("/posts",require("./Routes/postRoutes"))
app.use("/project",   require("./Routes/projectRoutes"))

app.get("/", (req, res) => {
  res.json({
    msg: "Hello server is live",
  });
});

io.on('connection',(socket)=>{
  console.log("a user connected");
  socket.on('message',(data)=>{
    console.log(data);
    socket.broadcast.emit('message',data);
  })
})

app.listen(process.env.PORT, () => {
  console.log("Server is Runnning on " + process.env.PORT);
});
