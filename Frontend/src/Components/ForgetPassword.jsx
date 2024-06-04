import React, { useEffect, useState } from "react";
import banner from "../assets/Fogetbanner.jpeg";
import Button from "./Button";
import { generateOtp, isOtpSendState } from "../Store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isPasswordUpdate, updatepassword } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let dispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();
  const isPasswordUpdateState = useSelector(isPasswordUpdate);
  const isSend = useSelector(isOtpSendState);
  useEffect(() => {
    if (isSend) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    if (isPasswordUpdateState) {
      nav("/login");
    }
  }, [isSend, isPasswordUpdateState]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isopen) {
      if (email) {
        dispatch(generateOtp({ email }));
      } else {
        toast.error("Please enter your email address");
      }
    } else {
      if (otp && password) {
        if (password.length < 8) {
          toast.error("Password must be 8 characters long");
        } else if (!/[A-Z]/.test(password)) {
          toast.error("Password must contain at least one uppercase letter");
        } else {
          dispatch(updatepassword({ email, otp, newpassword: password }));
        }
      } else {
        toast.error("Please enter your otp and password");
      }
    }
  };

  return (
    <div className=" flex items-center   bg-Secondary   justify-center w-full h-screen">
      <h1 className="text-2xl  absolute top-2 left-2  max-sm:text-sm font-poppins  font-bold ">
        COFOUND.IO
      </h1>
      <div className=" p-2">
        <h3 className="text-4xl  text-center   max-sm:text-2xl   font-poppins font-bold ">
          Reset Your <span className=" text-primary">Password</span>
        </h3>

        <form
          onSubmit={handleSubmit}
          className=" flex  items-center gap-3 flex-col  "
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="h-10 border-0 w-full mt-3 p-4  bg-primary/5  focus:ring-primary focus:ring-1  placeholder:text-black  font-poppins font-medium rounded-md  outline-none "
            name="username"
            placeholder="Enter Your  Email"
            id="username"
          />
          {isopen ? (
            <div className=" ">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                type="text"
                className="h-10 border-0 w-full mt-1  bg-primary/5 focus:ring-primary focus:ring-1  p-4 placeholder:text-black  font-poppins font-medium rounded-md  outline-none "
                name="username"
                placeholder="Enter Your OTP"
                id="username"
              />{" "}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="text"
                className="h-10 border-0 w-full mt-3 p-4  bg-primary/5  focus:ring-primary focus:ring-1   placeholder:text-black  font-poppins font-medium rounded-md  outline-none "
                name="username"
                placeholder="Enter Your New Password"
                id="username"
              />
            </div>
          ) : null}
          <Button prompt={!isopen ? "Send OTP" : "Change Password"} />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
