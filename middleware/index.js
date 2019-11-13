// Middleware

var Salt = require("../models/salts"),
  User = require("../models/users");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

middlewareObj.checkSaltOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Salt.findOne({ name: req.params.name }, function(err, foundSalt) {
      if (err) {
        req.flash("error", "Could not find that salt");
        res.redirect("back");
      } else {
        if (foundSalt.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You are not authorized to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;
