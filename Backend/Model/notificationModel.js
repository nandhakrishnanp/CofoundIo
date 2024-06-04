const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const notificationSlice = mongoose.Schema({
    nId:{
     require:true,
     type:String,
     default:uuidv4()
    },
    userId:{
        required:true,
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    projectId:{
        required:true,
        type:"String"
    },
    reqUserId:{
        type:mongoose.Schema.ObjectId,
        ref:"User", required:true,
    },
    content:{
        type:String,
        required:true
    }
    ,
    notificatioType:{
        type:String,
        required:true
    }
})
 
module.exports = mongoose.model("Notification", notificationSlice)