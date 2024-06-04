import React, { useState } from "react";
import like from "../assets/like.svg"
import likeclick from "../assets/likeclick.svg"
import { Link, useNavigate } from "react-router-dom";

const Post = ({ posts }) => {
  let nav = useNavigate()
    const[isopen,setIsOpen]=useState(false)
    const[islike,setIsLike]=useState(false)
  return (
    <div className="">
   
      <div  onClick={()=> nav(`/profile/${posts.User_id}`)} className=" cursor-pointer flex gap-4  items-center justify-start py-4">
             <img src={posts.profileUrl} className=" border-[3px] shadow-lg border-primary rounded-full w-11 h-11 object-cover"  alt="" />
             <div className=" flex flex-col">

             <p className=" hover:text-primary  font-poppins  font-bold    text-lg text-dark-blue  ">{posts.name}</p>
     { posts.about ? <p className=" font-monsherrat text-gray-500"> {posts.about}</p>:null}
             </div>
          </div>

         
        <div className={`${isopen ?" h-full ":" h-[78px] overflow-hidden"}`}>

      <p className="  font-monsherrat  text-[18px] "> {posts.content}</p>
      
        </div>
        <p className=" cursor-pointer text-right font-poppins text-primary hover:text-primary/50" onClick={()=>{
         if(isopen){
            setIsOpen(false)
         }
         else{
            setIsOpen(true)
         }
      }}>{isopen? "Read less":" Read more"}</p>

      {posts.Postimg ? (
        <img
          src={posts.Postimg}
          className=" object-contain mt-2 rounded-md  min-w-full" 
          alt=""
        
        />
      ) : null}
      <div className="flex gap-[6px] items-center justify-start">
      { !islike?  <img onClick={()=> setIsLike(!islike)} src={like} className=" w-7 pt-2 cursor-pointer" alt="" />:  <img onClick={()=> setIsLike(!islike)} src={likeclick} className=" cursor-pointer w-7 pt-2" alt="" />}
       <p className="text-xl font-poppins  relative top-[6px] text-bold text-primary">{posts.likes}</p>
      </div>
     
    </div>
  );
};

export default Post;
