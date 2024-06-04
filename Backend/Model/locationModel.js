const mongoose = require("mongoose");



const locationShemea = mongoose.Schema({
    user_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    City:{
        type:String
    },
    State:{
        type:String
    },
    Country:{
        type:String
    },
})


module.exports= mongoose.model('Location',locationShemea)