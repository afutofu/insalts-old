var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts");

// INDEX
router.get("/", function(req, res) {
  res.render("salts/");
});

router.get("/new", function(req, res) {
  res.render("salts/new");
});

module.exports = router;
