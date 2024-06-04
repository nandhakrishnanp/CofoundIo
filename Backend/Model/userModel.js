const mongoose = require("mongoose");

const userShemea = mongoose.Schema({
  id: {
    type: Number,
    
  },
  userName: {
    type: String,
  },
  password:{
    type:String
  },
  name:{
    type:String
  }
  ,
  BannerUrl: {
    type: String,
    default:"https://www.jhanson.hants.sch.uk/i/graphics/artheader.jpg"
  },
  profileUrl: {
    type: String,
    default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
  age:{
    type:Number
  }
  ,
  gender:{
    type:String
  },
  about:{
    type:String,
    default:"Eager to Learn and Grow"
  },
  email:{
    type:String
  },
  phoneNumber:{
    type:Number
  }
});


module.exports=mongoose.model("User",userShemea)