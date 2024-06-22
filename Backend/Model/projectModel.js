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
     profileUrl:{
         type:String,
         required:true,
         default:"https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
     },
     discription:{
        type:String,
        required:true
     },
     theme:{
       type:String,
      
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