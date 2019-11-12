var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  User = require("./models/users");

var PORT = process.env.PORT || 3000;

// ROUTES
var indexRoutes = require("./routes");
var saltRoutes = require("./routes/salts");
var postRoutes = require("./routes/posts");

// CONNECT TO DATABASE
mongoose.connect("mongodb://localhost/insalts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Insalts",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// USE FLASH
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// USE ROUTES
app.use("/", indexRoutes);
app.use("/s", saltRoutes);
app.use("/s/:saltName/insalt", postRoutes);

// START SERVER
app.listen(PORT, function() {
  console.log("Server listening on " + PORT);
});
