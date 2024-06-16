import React, { useEffect, useState } from "react";
import bell from "../assets/bell.svg";
import profile from "../assets/profile.svg";
import team from "../assets/team.svg";
import search from "../assets/search.svg";
import { UserData } from "../Store/userSlice";
import home from "../assets/home.svg";
import plus from "../assets/plus.svg"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthActions } from "../Store/AuthSlice";
import Addpost from "./Addpost";
import { resetState } from "../Store/postSlice";
import { LuLogOut, LuUserCircle } from "react-icons/lu";

import { BiUserCircle } from "react-icons/bi";


const Navbar = () => {
  const dispatch =useDispatch()
  const [userName, setUserName] = useState("profile");
  const [profileImg, setProfileImg] = useState(null);
  const userDetails = useSelector(UserData);
  useEffect(() => {
    if (userDetails && userDetails.userDetails) {
      setProfileImg(userDetails.userDetails.profileUrl);
      setUserName(userDetails.userDetails.name);
    }
  }, [userDetails.userDetails]);

  const handleLogOut =()=>{
      dispatch(AuthActions.logout())
    
  }
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="sticky max-md:fixed max-md:left-0 max-md:bottom-0 w-full md:top-0 md:left-0 z-10">
      <div className="flex items-center px-7 bg-slate-50 py-2">
        <div className="max-md:fixed max-md:w-full max-md:flex max-md:left-0 max-md:px-3 max-md:py-2 max-md:bg-white max- max-md:top-0">
          <h1 className="text-2xl max-md:flex-1 max-sm:text-lg font-poppins text-primary font-bold">
            COFOUND.IO
          </h1>
          {profileImg ? (
            <div className="md:hidden cursor-pointer hover:scale-105 flex flex-col items-center">
              <img
                src={profileImg}
                alt=""
                width={34}
                className="w-8 h-8 rounded-full ring-2 ring-dark-blue shadow-lg object-cover"
                onClick={handleProfileClick}
              />
              {showDropdown && (
                <div className="absolute top-10 right-0 bg-white rounded-md shadow-lg">
                  <select name="" id="">
                    <option value="1"> <BiUserCircle className=" text-lg"/>My Profile</option>
                    <option value="2">LogOut</option>
                  </select>
                </div>
              )}
            </div>
          ) : (
            <div className="cursor-pointer md:hidden flex flex-col items-center">
              <img
                src={profile}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-monsherrat">{userName}</p>
            </div>
          )}
        </div>
        <div className="flex md:flex-1 max-md:w-full max-md:justify-between max-md:pl-16 items-center px-1 justify-end gap-3">
          {/* testingpurpose */}
         
          <Link to="/home">
            <div className="max-md:flex-1 cursor-pointer hover:scale-105 transition-all duration-200 px-2 max-lg:px-1 flex flex-col items-center">
              <img src={home} alt="" width={30} className="max-lg:w-[25px]" />
            </div>
          </Link>
          <Link to="/teams">
            <div className="cursor-pointer px-2 hover:scale-105 flex flex-col items-center">
              <img src={team} alt="" width={30} />
            </div>
          </Link>
          <Link to="/notifications">
            <div className="cursor-pointer px-2 hover:scale-105 flex flex-col items-center">
              <img src={bell} alt="notification icon" width={30} />
            </div>
          </Link>
          {profileImg ? (
            <div className="max-md:hidden cursor-pointer  flex flex-col items-center">
              <img
                src={profileImg}
                alt=""
                width={34}
                className="w-8 h-8 rounded-full hover:scale-105 ring-2 ring-dark-blue shadow-lg object-cover"
                onClick={handleProfileClick}
              />
              {showDropdown && (
                <div className="absolute top-10 right-4  bg-white rounded-md shadow-lg">
                   <Link  to="/profile"><p  className="p-3 flex items-center gap-1 hover:bg-gray-100"> <LuUserCircle className=" text-lg"/> My Profile</p></Link>
                  <p className="p-3 hover:bg-gray-100 flex items-center gap-1 " onClick={()=>handleLogOut()}> <LuLogOut className=" text-lg"/>LogOut</p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-md:hidden cursor-pointer flex flex-col items-center">
              <img
                src={profile}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-monsherrat">{userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
