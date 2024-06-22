const mongoose = require('mongoose')





const meassageShemea = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
       projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectModel',
        required: true,
       },  
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      readby:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }]
})



module.exports= mongoose.model('Message',meassageShemea)