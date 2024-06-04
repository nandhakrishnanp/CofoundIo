import React, { useEffect, useState } from "react";
import close from "../assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchAllPosts, fetchPosts, uploadPost } from "../Store/postSlice";
import { nanoid } from "@reduxjs/toolkit";
import Button from "./Button";
import addimg from "../assets/addimg.svg";
import plus from "../assets/plus.svg";

const Addpost = () => {
  const Cloudurl = "https://api.cloudinary.com/v1_1/dftwre0on/image/upload";
  const [open, setOpen] = useState(false);
  const [bannerImg, setBannerImg] = useState("");
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
  const post = useSelector(fetchAllPosts);

  useEffect(() => {
   
    setOpen(false)
    setcontent("")
    setBannerImg("")
  }, [post]);



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

  const UploadPostClick = async () => {
    if (content) {
      const id = nanoid();
      if (bannerImg) {
        setTimeout(() => {
          setOpen(false);
        }, 1000);
        const url = await handleImgToCloud(bannerImg);
        dispatch(uploadPost({ post_id: id, content, postimg: url }));
    
      } else {
        setTimeout(() => {
          setOpen(false);
        }, 1000);
        dispatch(uploadPost({ post_id: id, content, postimg: null }));
       
      }
    }
  };

  return (
    <div className="w-full  bg-white  my-3 rounded-lg flex flex-col justify-center items-center p-5">
      <div
        onClick={() => setOpen(true)}
        className=" flex   max-md:mt-5  cursor-pointer  transition-all duration-150 hover:bg-slate-100/60 items-center justify-start  border-[3px]  border-primary   w-[90%] h-10 rounded-full  "
      >
        <h2 className="text-lg px-5  text-gray-500 flex-1  ">
          Write a Journey
        </h2>
        <img src={plus} className="w-[24px]  mr-3" alt="" />
      </div>
      {open ? (
        <div className="absolute  z-20   backdrop-blur-xl   flex items-center justify-center left-0 top-0  w-[100%]  h-[100vh] ">
          <div className=" relative z-30 shadow-xl  bg-white max-lg:w-[90%] max-lg:h-3/5 overflow-x-hidden   w-1/2 h-1/2   rounded-lg">
            <img
              src={close}
              onClick={() => {
                setOpen(false);
                setBannerImg("");
                setcontent("");
              }}

              
              className="w-7 absolute top-2 right-3 cursor-pointer"
              alt=""
            />
            <h1 className="text-xl  font-bold text-primary p-4">Upload Post</h1>
            <div className="w-full h-3/4 overflow-y-scroll    px-4 flex  ">
              <textarea
                placeholder="I'm Happy To Share my Journey"
                className="p-2  min-h-[400px] capitalize  rounded-xl focus:bottom-primary outline-none border-primary font-poppins  border-box resize-none text-lg w-full h-3/4"
                name=""
                id=""
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              ></textarea>
              <div className="  ">
                {bannerImg ? (
                  <img
                    src={URL.createObjectURL(bannerImg)}
                    alt=""
                    className=" w-[200px] border-[4px] rounded-xl  shadow-xl border-primary "
                  />
                ) : (
                  <div>
                    <label for="file-upload" class="custom-file-upload">
                      <img src={addimg} className="w-[30px]" alt="" />
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="file-upload"
                      className=""
                      onChange={(e) => {
                        const img = e.target.files[0];
                        setBannerImg(img);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2  left-0 w-full flex flex-col items-center   z-30    ">
                <button
                  className="  text-lg text-white  font-bold   font-sans   bg-primary  w-[70%]  py-2 rounded-lg hover:bg-primary/90"
                  onClick={() => {
                    UploadPostClick();
                    console.log(content);
                  }}
                >
                  Finish Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Addpost;
