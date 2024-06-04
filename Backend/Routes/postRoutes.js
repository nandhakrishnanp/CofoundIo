const express = require("express");
const postsModel = require("../Model/postsModel");
const auth = require("../Middleware/auth");
const {
  uploadPosts,
  editPosts,
  getPosts,
  deletePosts,
  getPostByUserId,
} = require("../Controllers/postsController");
const router = express.Router();

// router.get()

router.post("/upload", auth, uploadPosts);
router.get("/get/:userId", auth, getPostByUserId);
router.get("/fetchPosts", auth, getPosts);
router.put("/edit", auth, editPosts);
router.delete("/delete", auth, deletePosts);
router.post("")
module.exports = router;
