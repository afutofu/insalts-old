var express = require("express"),
  router = express.Router(),
  Salt = require("../models/salts");

// INDEX
router.get("/", function(req, res) {
  res.send("Salt Index");
});

module.exports = router;
