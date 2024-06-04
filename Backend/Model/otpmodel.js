const mongoose = require("mongoose");


const otpSchemea = mongoose.Schema({
    email: {
        type: String,
        required: true,
       
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
       
},
expiresAt: {
        type: Date,
        default: ()=> Date.now()+5*60*1000
    }
})
const otpModel = mongoose.model("otp", otpSchemea);

module.exports = otpModel;