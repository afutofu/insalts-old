var express = require("express"),
  router = express.Router(),
  Post = require("../../models/posts");

router.get("/", function(req, res) {
  Post.find()
    .then(function(allSalts) {
      res.json(allSalts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
