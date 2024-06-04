import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from '../Store/postSlice';
import Post from './Post.jsx'

const ListPosts = ({posts}) => {
 
  
 
  return (
    <div className= ''>
         { posts? posts.map((post)=>(
              <div key={post.post_id} className=' my-3 rounded-xl bg-white p-4'>
                  <Post key={post.post_id} posts={post}/>
              </div>
        )) :null}
        
    </div>
  )
}

export default ListPosts