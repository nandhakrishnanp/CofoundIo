import React, { useEffect, useState } from "react";
import loginimg from "../assets/loginBanner.jpeg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";
import { loginUser, registerUser } from "../Store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoginState,
  error,
  isLoading,
  isuserregistered,
} from "../Store/AuthSlice";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeDropper, FaEyeSlash } from "react-icons/fa6";
import { LuEyeOff } from "react-icons/lu";
const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPasword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  let nav = useNavigate();
  //login value
  const isRegistrationSuccess = useSelector(isuserregistered);
  const isLoginBool = useSelector(isLoginState);
  const errorMsg = useSelector(error);
  let dipatch = useDispatch();
  const goHome = () => {
    nav("/");
  };

  const handleUserLogin = async () => {
    if (validateForm()) {
      dipatch(loginUser({ username: userName, password: password }));
    }
  };
  const validateForm = () => {
    const errors = { username: "", password: "", fullname: "" };
    console.log(userName.length);
    if (userName.length >= 16 || userName.length < 5) {
      errors.username =
        "Username must be less than 16 characters and greater than 5";
      toast.error("Username must be less than 16 characters");
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long ";
      toast.error("Password must be at least 8 characters long ");
    }
    // using regex
    if (!/[A-Z]/.test(password)) {
      errors.password = "Password must be have least 1 uppercase letter  ";
      toast.error("Password must be have least 1 uppercase letter");
    }
    if (!/^[a-zA-Z ]*$/.test(fullName)) {
      errors.fullname = "Full name must only contain letters";
      toast.error("Full name must only contain letters");
    }

    setFormErrors(errors);
    return Object.values(errors).every((value) => value === "");
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (isLogin) {
      handleUserLogin();
    } else {
      if (validateForm()) {
        dipatch(
          registerUser({
            username: userName,
            password: password,
            email: email,
            fullName: fullName,
          })
        );
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoginBool ) {
      setTimeout(() => {
        nav("/home");
      }, 2500);
    }
  }, [isLoginBool]);
  useEffect(() => {
    if (isRegistrationSuccess) {
      setisLogin(true);
      setPasword("");
      setEmail("");
    }
  }, [isRegistrationSuccess]);
  
 const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
    setTimeout(() => {
      setIsPasswordVisible(false)
    }, 2000);
 }
  return (
    <div>
      <div className="flex relative items-center justify-center  h-screen w-full ">
        <div className="w-[50%] max-lg:hidden">
          <img
            src={loginimg}
            className="h-screen w-full object-cover "
            alt=""
          />
        </div>
        <div className="h-screen flex items-center justify-center max-lg:w-full w-[50%]  bg-Secondary">
          <div className=" p-7 rounded-lg ">
            <h1 className="text-center text-3xl  font-poppin font-bold">
              {isLogin ? "Login into" : "SignUp"}{" "}
              <span className="   text-primary">CoFound.io</span>
            </h1>
            <p className=" text-center  font-medium mt-2">
              "Individually, we are one drop. Together, we are an ocean."{" "}
            </p>
            <form onSubmit={handleClick} className="flex p-6  flex-col  gap-3">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                type="text"
                className="h-6 border-0 mt-3 p-4 placeholder:text-black  focus:ring-1 focus:ring-primary  bg-primary/5   font-medium rounded-md  outline-none "
                name="username"
                placeholder="Enter Your Username"
                id="username"
              />
              <div  className=" flex justify-center gap-2 w-[105%]  items-center">

              <input
                value={password}
                onChange={(e) => setPasword(e.target.value)}
                required
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="h-6 border-0 mt-3 p-4 w-full  bg-primary/5  placeholder:text-black focus:ring-1 focus:ring-primary  font-medium  rounded-md  outline-none "
                name="password"
                placeholder="Enter Your Password"
                id="password"
              />
             
              
              {isPasswordVisible? <FaEye onClick={()=>handlePasswordVisibility()} className="mt-3 text-xl cursor-pointer"/> :  <FaEyeSlash onClick={()=>handlePasswordVisibility()} className=" mt-3 cursor-pointer text-xl"/>}
              </div>

              {!isLogin ? (
                <>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    className="h-6 border-0 mt-3 p-4 placeholder:text-black  bg-primary/5  border-sky focus:ring-1 focus:ring-primary   font-medium  rounded-md  outline-none "
                    name=""
                    placeholder="Enter Your Email Address  "
                    id="email"
                  />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    type="text"
                    className="h-6 border-0 mt-3 p-4 placeholder:text-black  bg-primary/5  focus:ring-1 focus:ring-primary    font-medium  rounded-md  outline-none "
                    name=""
                    placeholder="Enter Your Full Name  "
                    id="email"
                  />
                </>
              ) : null}
              {/* {errorMsg ? (
                <p className="texl-lg font-monsherrat text-pale ">{errorMsg}</p>
              ) : null} */}
              <div className="text-center mt-2">
                <Button
                  className=" bg-white  rounded-xl w-1/2  font-poppins font-medium text-xl"
                  prompt={isLogin ? "Login" : "SignUp"}
                  handleClick={handleClick}
                ></Button>
              </div>
            </form>

            <p
              onClick={() => {
                nav("/forget-password");
              }}
              className="text-center hover:text-primary  text-lg font-poppins font-medium cursor-pointer  text-dark-blue"
            >
              Forget Your Password ?{" "}
            </p>

            <p
              onClick={() => {
                if (isLogin) {
                  setisLogin(false);
                } else {
                  setisLogin(true);
                }
              }}
              className="text-center hover:text-primary text-lg font-poppins font-medium mt-2 cursor-pointer text-black"
            >
              {!isLogin ? "LogIn" : "SignUp"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
