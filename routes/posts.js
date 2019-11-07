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
  var saltName = req.params.saltName;

  var title = req.body.title;
  var image = req.body.image;
  var content = req.body.content;

  content = content.replace(/(?:\r\n|\r|\n)/g, "<br>");

  Salt.findOne({ name: saltName }, function(err, foundSalt) {
    if (err) {
      console.log(err);
    } else {
      var newPost = {
        title: title,
        image: image,
        content: content
      };
      Post.create(newPost, function(err, newlyCreatedPost) {
        if (err) {
          console.log(err2);
        } else {
          // Assign salt id and name to the post/insalt
          newlyCreatedPost.salt.id = foundSalt._id;
          newlyCreatedPost.salt.saltName = foundSalt.name;
          newlyCreatedPost.save();

          // Add created post/insalt to salt posts
          foundSalt.posts.push(newlyCreatedPost);
          foundSalt.save();

          Salt.findOne({ name: saltName }, function(err, newlyFoundSalt) {
            if (err) {
              console.log(err);
            } else {
              // Go back to salt show page
              console.log(newlyFoundSalt);
              res.redirect("/s/" + foundSalt.name);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
