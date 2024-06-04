import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserData, fetchUserDataByID, profileUser } from "../Store/userSlice";
import { fetchAllPostByUser, fetchPostsByID } from "../Store/postSlice";
import Post from "./Post";
const Userprofile = () => {
  const { UserId } = useParams();
  const [user, setUser] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const myuser = useSelector(UserData);
  const myUserId = myuser.userDetails._id;
  const nav = useNavigate();
  
 
  const dispatch = useDispatch();
  const userdetail = useSelector(profileUser);
  const userPost = useSelector(fetchAllPostByUser);
  useEffect(() => {
    if(UserId==myUserId){
      nav("/profile")
    }
    dispatch(fetchPostsByID(UserId));
    dispatch(fetchUserDataByID(UserId));
  setTimeout(() => {
    
    setIsLoading(false);
  }, 3000);
  }, []);

  useEffect(() => {
    setUser(userdetail.userDetails);
    setPosts(userPost.post);
  }, [userPost, userdetail]);

  return (
    <div className="w-full  flex flex-col items-center     relative min-h-screen bg-Secondary ">
      <Navbar />
      {!isLoading && user ? (
        <div className="p-4 mt-3  max-lg:w-full w-3/6  mx-24 max-lg:mx-0  bg-white">
          <div className="relative">
            <img
              key={user.bannerUrl}
              src={user.BannerUrl}
              alt="bannerimg"
              className="w-full h-[250px] max-md:h-[150px] object-cover  max-lg:w-full 0rounded-md"
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
          </div>
        </div>
      ) : (
        <div className="p-4 mt-3 h-52 animate-pulse shadow-xl   max-lg:w-full w-3/6  mx-24 max-lg:mx-0   bg-white"></div>
      )}

      <div className=" mt-2  max-lg:w-full w-3/6  mx-24 max-lg:mx-0  ">
        <h1 className="text-[25px] px-4  text-primary  font-bold   capitalize     ">
          Recent Posts
        </h1>
        {!isLoading && Posts ? (
          <div>
            {Posts.map((post) => (
              <div className="bg-white  rounded-lg shadow-xl p-4 my-3">
                <Post posts={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white  rounded-lg shadow-xl h-[300px] p-4 my-3">
            <div className="flex items-center gap-4 ">
              <div className=" w-[70px] h-[70px]  animate-pulse  bg-Secondary rounded-full"></div>
              <div className="w-[60%] h-6   animate-pulse bg-Secondary rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
