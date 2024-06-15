import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllPosts, fetchPosts } from "../Store/postSlice";
import Addpost from "./Addpost";
import ListPosts from "./ListPosts";
const Feed = () => {
  const dispatch = useDispatch();
  const [posts, setPost] = useState([]);
  
  const post = useSelector(fetchAllPosts);
  useEffect(() => {
    dispatch(fetchPosts());

   
  }, []);
  useEffect(()=>{
    setPost(post);
  },[post])
  return (
    <div className=" w-full flex flex-col items-center">
      <div className=" min-h-screen  max-md:mb-10   overflow-y-scroll    max-lg:w-full w-3/6 ">
        <Addpost />
        <ListPosts posts={posts} />
        
      </div>
    </div>
  );
};

export default Feed;
