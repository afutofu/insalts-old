var express = require("express"),
  router = express.Router(),
  Salt = require("../../models/salts");

router.get("/", function(req, res) {
  Salt.find()
    .then(function(allSalts) {
      res.json(allSalts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
