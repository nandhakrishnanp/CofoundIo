const express = require("express");
const router = express.Router()
const User = require("../Model/userModel");
const {loginUser , registerUser,userDetails, GenerateOtp, verifyOtp, userDetailsById} = require ("../Controllers/userController");
const auth = require("../Middleware/auth");
const {updateProfile, updatEmail, updateAbout, updateBannerurl , updateName} = require("../Controllers/profileController");

router.post("/login",loginUser)
router.post("/register", registerUser)
router.get("/info/:id", userDetailsById)
router.get("/info",auth,userDetails)
router.post("/generateOtp",GenerateOtp)
router.put("/updatepassword", verifyOtp )
router.put("/updateProfile",auth,updateProfile)
router.put("/updateEmail",auth,updatEmail)
router.put("/updateAbout",auth,updateAbout)
router.put("/updateBannerurl",auth,updateBannerurl)
router.put("/updateName",auth,updateName)
module.exports= router