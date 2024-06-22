import React, { useEffect, useState } from "react";
import like from "../assets/like.svg";
import likeclick from "../assets/likeclick.svg";

import { Link, useNavigate } from "react-router-dom";
import {
  fetchComments,
  fetchCommentsByPost,
  fetchPosts,
  likePost,
  postComments,
} from "../Store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserData, profileUser } from "../Store/userSlice";
import { BiCommand, BiComment, BiSend } from "react-icons/bi";

const Post = ({ posts }) => {
  let nav = useNavigate();
  const dispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const userdetail = useSelector(UserData);
  const [isliked, setIsLiked] = useState(false);
useEffect(() => {
 
  setIsLiked(posts.likes.includes(userdetail.userDetails._id));
 
}, [posts.likes, userdetail.userDetails._id]);
  const [comment, setComment] = useState(""); // to Store comment input
  const [isCommentopen, setIsCommentOpen] = useState(false); // openclose comment section
  const allcomments = useSelector(fetchCommentsByPost); // all comments
  const [mypostComment, setMyPostComment] = useState([]); // comments of the post
  const [isCommentLoading, setIsCommentLoading] = useState(false); // comment loading
  // filter the comments of the post
  const UpdatePostComment = () => {
    const filtered_comment = allcomments.filter(
      (comment) => comment.postId == posts.post_id
    );
   
    setMyPostComment(filtered_comment);
    if( filtered_comment.length==0){
        setIsCommentLoading(false)
    }
  };

// post the comments
  const sendComment = () => {
    if (comment) {
      dispatch(postComments({ post_id: posts.post_id, content: comment }));
      setComment("");
      setTimeout(() => {
        dispatch(fetchComments(posts.post_id));
        UpdatePostComment();
      }, 1000);
    }
  };
  return (
    <div className="">
      <div
        onClick={() => nav(`/profile/${posts.User_id}`)}
        className=" cursor-pointer flex gap-4  items-center justify-start py-4"
      >
        <img
          src={posts.profileUrl}
          className=" border-[3px] shadow-lg border-primary rounded-full w-11 h-11 object-cover"
          alt=""
        />
        <div className=" flex flex-col">
          <p className=" hover:text-primary  font-poppins  font-bold    text-lg text-dark-blue  ">
            {posts.name}
          </p>
          {posts.about ? (
            <p className=" font-monsherrat text-gray-500"> {posts.about}</p>
          ) : null}
        </div>
      </div>

      <div className={`${isopen ? " h-full " : " h-[78px] overflow-hidden"}`}>
        <p className="  font-monsherrat  text-[18px] "> {posts.content}</p>
      </div>
      <p
        className=" cursor-pointer text-right font-poppins text-primary hover:text-primary/50"
        onClick={() => {
          if (isopen) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
            setIsCommentLoading(true)
          }
        }}
      >
        {isopen ? "Read less" : " Read more"}
      </p>

      {posts.Postimg ? (
        <img
          src={posts.Postimg}
          className=" object-contain mt-2 rounded-md  min-w-full"
          alt=""
        />
      ) : null}
      <div className="flex mt-2 gap-[6px] items-center justify-start">
        {!isliked ? (
          <img
            onClick={() => {
              dispatch(likePost(posts.post_id));
             
              setTimeout(() => {
                
                dispatch(fetchPosts());
                
              }, 1000);
            }}
            src={like}
            className=" w-7 pt-2 cursor-pointer"
            alt=""
          />
        ) : (
          <img
            onClick={() => {
              dispatch(likePost(posts.post_id));
            
              setTimeout(() => {
                
                dispatch(fetchPosts());
                
              }, 1000);
              

            }}
            src={likeclick}
            className=" cursor-pointer w-7 pt-2"
            alt=""
          />
        )}
        <p className="text-xl font-poppins  relative top-[6px] text-bold text-primary">
          {posts.likes.length}
        </p>
        <div className=" flex-1 flex items-center justify-end">
          <p
            onClick={() => {
              if (isCommentopen) {
                setIsCommentOpen(false);
              } else {
                setIsCommentOpen(true);
                setIsCommentLoading(true)
                dispatch(fetchComments(posts.post_id));
               setTimeout(() => {
                
                 UpdatePostComment();
               }, 2000);
              }
            }}
            className=" font-monsherrat text-primary cursor-pointer hover:underline"
          >
            <BiComment className=" text-[30px]" />
          </p>
        </div>
      </div>
      {isCommentopen ? (
        <div data-aos="zoom-in" className="  transition-all duration-200 ">
          <h2 className="font-bold text-xl    text-dark-blue p-2">Comments.</h2>

          <div className=" flex items-center">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a Comment.."
              className="  bg-gray-200 active:ring-2  ml-4 h-10  focus:bg-purple-100/20 ring-primary w-[80%] border-0 my-1 p-4 focus:ring-2  placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
              type="text"
            />
            <BiSend
              onClick={() => {
                sendComment();
              }}
              className=" ml-3 hover:cursor-pointer hover:scale-110 transition-all duration-150 text-[35px]"
            />
          </div>
            
          {mypostComment.length > 0
            ? mypostComment.map((comment) => (
                <div>
                  <div
                    onClick={() => nav(`/profile/${comment.userId._id}`)}
                    className=" cursor-pointer flex gap-4  items-center justify-start py-4"
                  >
                    <img
                      src={comment.userId.profileUrl}
                      className=" border-[3px] shadow-lg border-primary rounded-full w-11 h-11 object-cover"
                      alt=""
                    />
                    <div className=" flex flex-col">
                      <p className=" hover:text-primary  font-poppins  font-bold    text-lg text-dark-blue  ">
                        {comment.userId.name}
                      </p>
                    </div>
                  </div>
                  <div className=" bg-gray-200 ml-4 p-3 rounded-lg">
                    <p className=" capitalize text-dark-blue font-monsherrat">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            :   isCommentLoading ? <div className="loader mx-5"></div>: <p className=" mx-4 mt-1">No Comments Yet</p>}
        </div>
      ) : null}
    </div>
  );
};

export default Post;
