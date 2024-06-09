const mongoose = require ("mongoose")



const projectSchemea = mongoose.Schema({
     projectId:{
      type:String,
      required:true
     },
     tittle:{
        type:String,
        required:true
     },
     discription:{
        type:String,
        required:true
     },
     theme:{
       type:String,
       required:true
     },
     createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
     },

     createdOn:{
        type:Date,
        default:Date.now
     },
     members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        }
     ]
})


module.exports = mongoose.model("projectModel" , projectSchemea)