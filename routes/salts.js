var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts"),
  Post = require("../models/posts");

// INDEX
router.get("/", function(req, res) {
  Salt.find({}, function(err, allSalts) {
    if (err) {
      console.log("error");
    } else {
      res.render("salts/index", { salts: allSalts });
    }
  });
});

// NEW
router.get("/new", function(req, res) {
  res.render("salts/new");
});

// CREATE
router.post("/", function(req, res) {
  var name = req.body.name;
  var slogan = req.body.slogan;
  var description = req.body.description;

  var newSalt = {
    name: name,
    slogan: slogan,
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
  Salt.findOne({ name: req.params.name })
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
