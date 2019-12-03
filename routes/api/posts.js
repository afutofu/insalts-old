var express = require("express"),
  router = express.Router(),
  Post = require("../../models/posts"),
  User = require("../../models/users");

router.get("/", function(req, res) {
  Post.find()
    .then(function(allSalts) {
      res.json(allSalts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.get("/:postId", function(req, res) {
  Post.findById(req.params.postId)
    .then(function(allSalts) {
      res.json(allSalts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.put("/:postId", function(req, res) {
  User.findById(req.user._id)
    .then(function(foundUser) {
      Post.findById(req.params.postId)
        .then(function(foundPost) {
          if (req.body.upvote == "true" && req.body.voted == "true") {
            foundPost.upvotedUsers.push(foundUser);
            console.log(foundPost.upvotedUsers);
          } else if (req.body.upvote == "true" && req.body.voted == "false") {
            console.log("test");
            for (var i = 0; i < foundPost.upvotedUsers.length; i++) {
              if (
                JSON.stringify(foundPost.upvotedUsers[i]) ==
                JSON.stringify(req.user._id)
              ) {
                foundPost.upvotedUsers.splice(i, 1);
              }
            }
          }
          foundPost.save();

          Post.findByIdAndUpdate(
            req.params.postId,
            { vote: req.body.vote },
            {
              new: true
            }
          )
            .then(function(post) {
              res.json(post);
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
