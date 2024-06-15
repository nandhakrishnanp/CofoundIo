import React, { useEffect, useState } from "react";

import { token } from "../Store/AuthSlice";
import Navbar from "./Navbar";
import { UserData, fetchUserData, isUserData } from "../Store/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Feed from "./Feed";
import { resetState } from "../Store/postSlice";


const Home = () => {
  const dispactch = useDispatch(UserData);
  const authToken = useSelector(token);
  const userDetails = useSelector(UserData);
  const isuser = useSelector(isUserData);

  useEffect(() => {

    if (authToken) {
      dispactch(fetchUserData(authToken));
    } else {
      toast.error("Unauthorized Request - login again");
    }
  }, [dispactch]);

  return (
    <div className="w-100 min-h-screen   bg-Secondary">
      <Navbar />
      
      <Feed />
    </div>
  );
};

export default Home;
