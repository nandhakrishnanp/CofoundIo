
const Comment = require("../Model/commentsModel");
const postsModel = require("../Model/postsModel");
const userModel = require("../Model/userModel");
const { use } = require("../Routes/postRoutes");

const uploadPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { post_id, content, postimg } = req.body;
    const userDetails = await userModel
      .findOne({ _id: userId })
      .select("-password");

    const post = await new postsModel({
      name: userDetails.name,
      profileUrl: userDetails.profileUrl,
       about:userDetails.about,
      post_id: post_id,
      User_id: userId,
      content: content,
      Postimg: postimg,
    });
    await post.save();
    if (post) {
      return res
        .json({
          msg: "Post Uploaded Successfully",
        })
        .status(200);
    } else {
      return res
        .json({
          msg: "Post Not Uploaded",
        })
        .status(400);
    }
  } catch (error) {
    return res.json({
      msg: error.message,
    });
  }
};
const getPosts = async (req, res) => {
  const post = await postsModel.find().sort({"createdAt":-1});

  res.json({
    post,
  });
};

const getPostByUserId = async (req, res) => {
  const userId = req.params.userId;
  const post = await postsModel.find({ User_id: userId });
  res.json({
    post,
  });
};

const likeOrDislke = async (req, res) => {
  const userId = req.user.userId;
  const { post_id } = req.body;
  
  const post = await postsModel.findOne({ post_id: post_id
   });

 if (post.likes.includes(userId)) {
  //not working dislike
  post.likes = post.likes.filter((id) => !id.equals(userId));
  
    await post.save();
    res.json({
      msg: "Disliked Post",
    });
  } else {
    post.likes.push(userId);
    await post.save();
    res.json({
      msg: "Liked Post",
    });
  }

}
const commentOnPost = async (req, res) => {
  const userId = req.user.userId;
  const { post_id, content } = req.body;



  const newComment =new Comment({
    userId: userId,
    postId: post_id,
    content: content,
  });
  await newComment.save();
  res.json({
    msg: "Commented on Post",
  });
}
//fetch comments by Postid

 const fetchComments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId }).populate("userId", "name profileUrl");
  res.json({
    comments,
  });
}
const editPosts = async (req, res) => {};
const deletePosts = async (req, res) => {};

module.exports = {
  uploadPosts,
  getPosts,
  editPosts,
  deletePosts,
  getPostByUserId,
  likeOrDislke,
  commentOnPost,
  fetchComments
};
