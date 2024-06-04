const mongoose = require("mongoose")


const skillsSchemea = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    skills:{
        type:Array
    }
})



module.exports = mongoose.model("Skills",skillsSchemea)