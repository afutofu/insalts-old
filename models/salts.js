var mongoose = require("mongoose");

// Setup Schema

// Create Schema
var saltSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  }
});

// Create Model
var Salt = mongoose.model("Salt", saltSchema);

module.exports = Salt;
