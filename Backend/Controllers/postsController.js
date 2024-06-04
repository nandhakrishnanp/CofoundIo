const postsModel = require("../Model/postsModel");
const userModel = require("../Model/userModel");

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
  console.log(post);
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

const editPosts = async (req, res) => {};
const deletePosts = async (req, res) => {};

module.exports = {
  uploadPosts,
  getPosts,
  editPosts,
  deletePosts,
  getPostByUserId,
};
