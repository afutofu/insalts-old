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
        res.render("salts/show", { salt: foundSalt });
      }
    });
});

module.exports = router;
