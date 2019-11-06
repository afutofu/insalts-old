var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Post = require("../models/posts"),
  Salt = require("../models/salts");

// NEW
router.get("/new", function(req, res) {
  Salt.findOne({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("posts/new", { salt: foundSalt });
    }
  });
});

// CREATE
router.post("/", function(req, res) {
  var title = req.body.title;
  var image = req.body.image;
  var content = req.body.content;

  console.log(content);
  content = content.replace(/(?:\r\n|\r|\n)/g, "<br>");

  var newPost = {
    title: title,
    image: image,
    content: content
  };

  Salt.findOne({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      console.log(err);
    } else {
      Post.create(newPost, function(err2, newlyCreatedPost) {
        if (err2) {
          console.log(err2);
        } else {
          newlyCreatedPost.salt.id = foundSalt._id;
          newlyCreatedPost.salt.saltName = req.params.saltName;
          newlyCreatedPost.save();
          foundSalt.posts.push(newlyCreatedPost);
          foundSalt.save();
          res.redirect("/s/" + req.params.saltName);
        }
      });
    }
  });
});

module.exports = router;
