const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
      max: 50,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema); //create & export a model -user and its schema is userSchema
