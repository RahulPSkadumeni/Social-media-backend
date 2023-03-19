const router = require("express").Router();

const { findByIdAndUpdate } = require("../Models/Post");

const Post = require("../Models/Post");

// create post
router.post("/", async (req, res) => {
  console.log("ppost");
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post
router.put("/:id", async (req, res) => {
  console.log("update >>>>Post");

  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    console.log("post");
    console.log(post);
    console.log(req.body.userId);
    console.log(post.userId);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.userId === req.body.userId) {
//       await post.updateOne({ $set: req.body });
//       res.status(200).json("the post has been updated");
//     } else {
//       res.status(403).json("you can update only your post");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// like a post
// unlike a post
//get a post
//get all post of following(timeline)

// delete post

module.exports = router;
