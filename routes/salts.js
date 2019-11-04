var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts");

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
      console.log(createdSalt);
      res.redirect("/s");
    }
  });
});

// SHOW
router.get("/:name", function(req, res) {
  console.log(req.params.name);
  res.send("THIS IS THE SAlT SHOW ROUTE");
});

module.exports = router;
