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
router.post("/", function(req, res) {
  Comment.create(req.body)
    .then(function(createdComment) {
      res.json(createdComment);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
