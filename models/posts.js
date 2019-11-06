var mongoose = require("mongoose");

// Schema Setup

// Create Schema

var postSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  salt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salt"
  }
});

// Create
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
