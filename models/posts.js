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
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  vote: { type: Number, default: 0 },
  upvotedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downvotedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

// Create
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
