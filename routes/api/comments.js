var express = require("express"),
  router = express.Router(),
  Post = require("../../models/posts"),
  User = require("../../models/users"),
  Comment = require("../../models/comments");

// READ ROUTE
router.get("/", function(req, res) {
  Comment.find()
    .then(function(allComments) {
      res.json(allComments);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// CREATE
router.post("/:postId/:commentId", function(req, res) {});
