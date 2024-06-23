const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const otpModel = require("../Model/otpmodel");
const sendMail = require("../Middleware/nodemailer");
const otpGenerator = require("otp-generator");

const userDetailsById = async(req,res)=>{
      const userId = req.params.id;
      const userDetails = await User.findOne({ _id: userId }).select("-password");
    
      return res.json({ userDetails:userDetails });
}

const userDetails = async (req, res) => {
  const UserData = req.user;
  const Id = UserData.userId;
  const userDetails = await User.findOne({ _id: Id }).select("-password");
  console.log("userdetails send");
  res.json({
    userDetails,
  });
};
const getUserName = async(req,res) =>{
   const {userId} = req.body;
   const userDetails = await User.findOne({ _id: userId }).select("-password");
   if(userDetails){
    return res.json({
      username:userDetails.name,
      Profileurl:userDetails.profileUrl
    })
   }
}

const registerUser = async (req, res) => {
  const { username, password, email, fullName } = req.body;

  if (!username || !password || !email || !fullName) {
    return res.json({ msg: "Fill all the Fields" }).status(400);
  }

  try {
    const isUser = await User.findOne({ userName: username });
    const isemail = await User.findOne({ email: email });
    if (isUser || isemail) {
      console.log("user already exists exists");
      return res.json({ msg: "User Already exists" }).status(400);
    }
    let salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    console.log(fullName);
    const newUser = new User({
      userName: username,
      password: hashedpassword,
      email: email,
      name: fullName,
    });
    newUser.save();
    return res
      .json({ msg: "User Added successfully", accepted: "ok" })
      .status(200);
  } catch (error) {
    res.json({ msg: "Registration Failed" }).status(400);
  }
  let alluser = await User.find();
 
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username + password);
  const user = await User.findOne({ userName: username });
  if (user) {
    const verify = await bcrypt.compare(password, user.password);
    if (verify) {
      const token = jwt.sign({ id: user._id }, process.env.SIGN_JWT);
      res
        .json({
          msg: "Login successfull",
          token: token,
        })
        .status(200);
    } else {
      res
        .json({
          msg: "Incorrect password",
        })
        .status(400);
    }
  } else {
    res.json({
      msg: "User does not exits",
    });
  }
};

const GenerateOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .json({
        msg: "User does not exits",
      })
      .status(404);
  } else {
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    try {
      const oldOtp = await otpModel.findOne({
        email: email,
      });
      if (oldOtp) {
        const expdate = Date.now()+5*60*1000;
        
        await otpModel.updateOne({ email: email }, { otp: otp , createdAt:Date.now(), expiresAt:expdate });
      } else {
        const newOtp = await otpModel.create({
          email: email,
          otp: otp,
        });
      }

      const response = await sendMail(otp, email);

      if (response) {
        return res
          .json({
            msg: "Otp sent successfully",
          })
          .status(200);
      } else {
        return res
          .json({
            msg: "Otp not sent",
          })
          .status(400);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  const otpfromdb = await otpModel.findOne({ email: email });
  if (!otpfromdb) {
    return res.json({
      msg: "Error , Please Try Again",
    });
  } else {
    let cDate = Date.now();

    if (otpfromdb.otp == otp) {
    
      console.log("expiry:"+ otpfromdb.expiresAt.getTime());
      if (otpfromdb.expiresAt.getTime() > cDate) {
        let salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(newpassword, salt);
        const user = await User.findOneAndUpdate(
          { email: email },
          {
            password: hashedpassword,
          }
        );
        await otpModel.deleteOne({ email: email });
        if (user) {
          return res.json({
            message: "Password Changed successfully",
          });
        } else {
          return res.json({
            msg: "Unable to change the Password ",
          });
        }
      } else {
        return res.json({
          msg: "OTP Expired , Please Try Again",
        });
      }
    } else {
      return res.json({
        msg: "OTP invalid , please try again",
      });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  userDetails,
  GenerateOtp,
  verifyOtp,
  getUserName,
  userDetailsById
};
