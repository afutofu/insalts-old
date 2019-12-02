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

router.put("/:postId", function(req, res) {
  Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
