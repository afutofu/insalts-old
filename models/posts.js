var mongoose = require("mongoose");

// Schema Setup

// Create Schema

var postSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  salt: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salt"
    },
    saltName: String
  }
});

// Create
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
