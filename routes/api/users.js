var express = require("express"),
  router = express.Router(),
  User = require("../../models/users");

router.get("/", function(req, res) {
  User.find()
    .then(function(allSalts) {
      res.json(allSalts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
