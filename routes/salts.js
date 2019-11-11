var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts"),
  middleware = require("../middleware");

// INDEX
router.get("/", function(req, res) {
  Salt.find({}, function(err, allSalts) {
    if (err) {
      console.log(err);
    } else {
      res.render("salts/index", { salts: allSalts });
    }
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("salts/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var title = req.body.title;
  var description = req.body.description;

  var newSalt = {
    name: name,
    title: title,
    description: description
  };

  console.log("test");
  Salt.create(newSalt, function(err, createdSalt) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/s");
    }
  });
});

// SHOW
router.get("/:name", function(req, res) {
  var saltName = req.params.name;

  Salt.findOne({ name: saltName })
    .populate("posts")
    .exec(function(err, foundSalt) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundSalt.posts[0].vote);
        res.render("salts/show", { salt: foundSalt });
      }
    });
});

// EDIT
router.get("/:name/edit", function(req, res) {
  Salt.findOne({ name: req.params.name }, function(err, foundSalt) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/s/" + req.params.name);
    } else {
      res.render("salts/edit", { salt: foundSalt });
    }
  });
});

// UPDATE
router.put("/:name", function(req, res) {
  Salt.findOne({ name: req.params.name }, function(err, foundSalt) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("/s/" + req.params.name);
    } else {
      Salt.findByIdAndUpdate(foundSalt._id, req.body.salt, function(
        err,
        updatedSalt
      ) {
        if (err) {
          console.log(err);
          req.flash("error", err.message);
          res.redirect("/s/" + req.params.name);
        } else {
          req.flash("success", "s/" + foundSalt.name + " has been updated");
          res.redirect("/s/" + foundSalt.name);
        }
      });
    }
  });
});

// DESTROY
router.delete("/:name", function(req, res) {
  Salt.findOne({ name: req.params.name }, function(err, foundSalt) {
    if (err) {
      res.redirect("back");
    } else {
      Salt.findByIdAndDelete(foundSalt._id, function(err) {
        if (err) {
          req.flash("error", "Couldnt remove salt");
          res.redirect("/s");
        } else {
          req.flash(
            "success",
            "s/" + req.params.name + " successfully removed"
          );
          res.redirect("/s");
        }
      });
    }
  });
});

module.exports = router;
