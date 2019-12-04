var mongoose = require("mongoose");

// Schema Setup

// Create Schema
var commentSchema = new mongoose.Schema({
  content: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

// Create
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
