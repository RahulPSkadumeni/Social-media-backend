const router = require("express").Router();

const { findByIdAndUpdate } = require("../Models/Post");

const Post = require("../Models/Post");
const User = require("../Models/User");
// create post
router.post("/", async (req, res) => {
  console.log("ppost");
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    console.log(savePost);
    res.status(200).json(savePost + " new post created");
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
//update post
router.delete("/:id", async (req, res) => {
  console.log("delete >>>>Post");

  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    console.log("post");
    console.log(post);
    console.log(req.body.userId);
    console.log(post.userId);
    if (post.userId == req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    console.log("post not found");
    res.status(500).json(error);
  }
});

//??like & unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      console.log(post);

      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("you liked this post");
    } else {
      console.log(post);
      console.log(req.body.userId);
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("you disliked this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("success" + ":  " + post);
    res.status(200).json(post);
  } catch (error) {
    console.log("post not found");
    res.status(500).json(error);
  }
});
// // get all post(Timeline)

router.get("/timeline/all", async (req, res) => {
  console.log("currentUser");
  try {
    const currentUser = await User.findById(req.body.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followers.map((friendId) => {
        console.log(friendId);
        return Post.find({ userId: friendId });
      })
    );

    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

// unlike a post
//get a post
//get all post of following(timeline)

module.exports = router;
