const mongoose = require("mongoose");

const postSchemea = mongoose.Schema({
  post_id: {
    type: String,
  },
  name:{
    type: String,
  },
  about:{
    type: String,

  },
  profileUrl:{
    type: String,
  },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  content: {
    type: String,
    required: true,
  },
  Postimg:{
    type:String,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Post", postSchemea);
