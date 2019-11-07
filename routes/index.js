// =================================
// INDEX & AUTH ROUTES
// =================================

var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user"),
  Salt = require("../models/salts");

// INDEX
router.get("/", function(req, res) {
  Salt.find({})
    .populate("posts")
    .exec(function(err, allSalts) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      } else {
        res.render("landing", { salts: allSalts });
      }
    });
});

// NEW
router.get("/register", function(req, res) {
  res.render("register");
});

// CREATE
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function() {
      console.log("Successful");
      req.flash("success", "Welcome to Insalts, " + user.username);
      res.redirect("/");
    });
  });
});

// LOGIN
router.get("/login", function(req, res) {
  res.render("login");
});

// AUTHENTICATE USER
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  }),
  function(req, res) {}
);

// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You have successfully logged out");
  res.redirect("/");
});

module.exports = router;
