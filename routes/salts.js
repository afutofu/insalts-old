var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts");

// INDEX
router.get("/", function(req, res) {
  res.render("salts/");
});

module.exports = router;
