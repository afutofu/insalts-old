var express = require("express"),
  router = express.Router({ mergeParams: true }),
  middleware = require("../middleware"),
  Post = require("../models/posts"),
  Salt = require("../models/salts"),
  User = require("../models/users");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Salt.findOne({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("posts/new", { salt: foundSalt });
    }
  });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
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
          console.log(err);
        } else {
          User.findById(req.user._id, function(err, foundUser) {
            if (err) {
              console.log(err);
            } else {
              // Assign salt id and name to the post/insalt
              newlyCreatedPost.salt.id = foundSalt._id;
              newlyCreatedPost.salt.saltName = foundSalt.name;
              newlyCreatedPost.author.id = req.user._id;
              newlyCreatedPost.author.name = req.user.username;
              newlyCreatedPost.save();

              // Add created post/insalt to salt posts
              foundSalt.posts.push(newlyCreatedPost);
              foundSalt.save();

              // Add created post to user's posts
              foundUser.posts.push();
              foundUser.save();

              res.redirect("/s/" + foundSalt.name);
            }
          });
        }
      });
    }
  });
});

// SHOW
router.get("/:id", function(req, res) {
  Salt.findOne({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      req.flash("error", "Could not access that salt");
      res.redirect("/s/" + foundSalt.name);
    } else {
      Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
          req.flash("error", "Could not access that insalt");
          res.redirect("/s/" + foundSalt.name);
        } else {
          res.render("posts/show", { salt: foundSalt, post: foundPost });
        }
      });
    }
  });
});

// EDIT
router.get("/:id/edit", function(req, res) {
  Salt.findOne({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      req.flash("error", "Could not find Salt");
      res.redirect("/s/" + req.params.saltName);
    } else {
      Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
          req.flash("error", "Could not find Post");
          res.redirect("/s/" + req.params.saltName);
        } else {
          res.render("posts/edit", { salt: foundSalt, post: foundPost });
        }
      });
    }
  });
});

// UPDATE
router.put("/:id", function(req, res) {
  Post.findById(req.params.id, function(err, foundPost) {
    if (err) {
      req.flash("error", "Could not find post");
    } else {
      Post.findByIdAndUpdate(req.params.id, req.body.salt, function(
        err,
        updatedPost
      ) {
        if (err) {
          req.flash("error", "Could not update post");
          res.redirect("/s/" + foundPost.salt.saltName);
        } else {
          req.flash("success", "Updated post!");
          res.redirect(
            "/s/" + foundPost.salt.saltName + "/insalt/" + foundPost._id
          );
        }
      });
    }
  });
});

// DESTROY
router.delete("/:id", function(req, res) {
  Post.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      console.log(err.message);
      req.flash("error", "Could not delete insalt");
      res.redirect("/s/" + req.params.saltName + "/insalt/" + req.params.id);
    } else {
      req.flash("success", "Successfully deleted insalt");
      res.redirect("/s/" + req.params.saltName);
    }
  });
});

module.exports = router;
