import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import dotenv from "dotenv";
import { UserData, updateBanner, updateProfileurl } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { token } from "../Store/AuthSlice";
import edit from "../assets/edit.svg";
import Changeprofile from "./Changeprofile";
import ChangeBanner from "./ChangeBanner";
import { fetchAllPosts } from "../Store/postSlice";
import Post from "./Post.jsx";
const Profile = () => {
  const Cloudurl = "https://api.cloudinary.com/v1_1/dftwre0on/image/upload";

  const [user, setUser] = useState([]);
  const [UserPost, setUserPosts] = useState([]);
  const [openFile, setOpenFile] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);
  const [bannerImg, setBannerImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const userDetails = useSelector(UserData);
  const dispatch = useDispatch();
  const tokenDetails = useSelector(token);
  const userPost = useSelector(fetchAllPosts);

  useEffect(() => {
    if (userDetails && userDetails.userDetails) {
      setUser(userDetails.userDetails);
      console.log("UserData Updated");
      setOpenFile(false);
      setOpenBanner(false);
      const filtered_post = userPost.filter(
        (post) => post.User_id == userDetails.userDetails._id
      );
      setUserPosts(filtered_post);
      console.log(filtered_post);
    }
  }, [userDetails]);

  //user img upload
  const handleImgToCloud = async (img) => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "User_imges");
    try {
      const Cloudresponse = await axios.post(Cloudurl, formData);
      const url = Cloudresponse.data.url;
      return url;
    } catch (error) {
      return error.message;
    }
  };
  const handleProfileUpload = async (name,about) => {
    const url = await handleImgToCloud(profileImg);
    
    if (tokenDetails) {
      dispatch(updateProfileurl({ url,name,about, tokenDetails }));
    }
  };

  const handleBannerUpload = async () => {
    const url = await handleImgToCloud(bannerImg);

    const img = new Image();
    img.src = URL.createObjectURL(bannerImg);
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w >= 800 && h >= 250) {
        if (tokenDetails) {
          dispatch(updateBanner({ url, tokenDetails }));
        }
      } else {
        toast.error("Invalid Image Size");
      }
    };
  };
  return (
    <div className="w-full  flex flex-col items-center     relative min-h-screen bg-Secondary ">
      <Navbar />

      <div className="p-4 mt-3  max-lg:w-full w-3/6  mx-24 max-lg:mx-0  bg-white">
        <div className="relative">
          <img
            key={user.bannerUrl}
            src={user.BannerUrl}
            alt="bannerimg"
            className="w-full h-[250px] max-md:h-[150px] object-cover  max-lg:w-full 0rounded-md"
          />
          <img
            src={edit}
            className=" w-5 absolute top-2 right-2 hover:cursor-pointer bg-white  hover:bg-slate-200 rounded-full"
            onClick={() => {
              setOpenBanner(true);
              setBannerImg("");
            }}
          />
        </div>

        <div className=" relative   gap-12">
          <img
            key={user.profileUrl}
            src={user.profileUrl}
            alt="profileimg"
            className="  absolute bottom-[-50px] left-8 w-32 rounded-full  object-cover  h-32 border-[4px] border-gray-200"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className=" font-bold  text-2xl pt-14 px-4 capitalize">
            {user.name}{" "}
          </p>

          <img
            src={edit}
            className=" hover:cursor-pointer w-7  hover:bg-slate-200 rounded-full"
            onClick={() => {
              setOpenFile(true);
              setProfileImg("");
            }}
          />
        </div>
        {user.about ? (
          <p className="px-4 font-poppins text-gray-600">{user.about}</p>
        ) : null}
        {openFile ? (
          <Changeprofile
            profileImg={profileImg}
            handleProfileUpload={handleProfileUpload}
            setProfileImg={setProfileImg}
            setOpenFile={setOpenFile}
          />
        ) : null}

        {openBanner ? (
          <ChangeBanner
            bannerImg={bannerImg}
            handleBannerUpload={handleBannerUpload}
            setBannerImg={setBannerImg}
            setOpenBanner={setOpenBanner}
          />
        ) : null}
      </div>

      <div className=" mt-2  max-lg:w-full w-3/6  mx-24 max-lg:mx-0  ">
        <h1 className="text-[25px] px-4  text-primary  font-bold   capitalize     ">
          Recent Posts
        </h1>
        {UserPost.length > 0 ? (
          <div>
            {UserPost.map((post) => (
              <div
                key={post.name}
                className="bg-white  rounded-lg  p-4 my-3"
              >
                <Post posts={post} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
