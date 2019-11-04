var express = require("express"),
  router = express.Router(),
  Post = require("../models/posts"),
  Salt = require("../models/salts");

// NEW
router.get("/new", function(req, res) {
  Salt.find({ name: req.params.saltName }, function(err, foundSalt) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("posts/new", { salt: foundSalt });
    }
  });
});

// CREATE
router.post("/", function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
});

module.exports = router;
