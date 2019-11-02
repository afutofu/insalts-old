var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts");

// INDEX
router.get("/", function(req, res) {
  res.render("salts/");
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
      console.log(createdSalt);
      res.redirect("/s");
    }
  });
});

module.exports = router;
