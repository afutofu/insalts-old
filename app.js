var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  User = require("./models/users");
require("dotenv/config");

var PORT = process.env.PORT || 3030;

// ROUTES
var indexRoutes = require("./routes/index");
var saltRoutes = require("./routes/salts");
var postRoutes = require("./routes/posts");
var saltApiRoutes = require("./routes/api/salts");
var postApiRoutes = require("./routes/api/posts");
var userApiRoutes = require("./routes/api/users");
var commentApiRoutes = require("./routes/api/comments");

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB!")
);

// mongoose.connect(process.env.DB_CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });
// mongoose.set("debug", true);
// mongoose.Promise = Promise;

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
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// USE FLASH
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// USE ROUTES
app.use("/", indexRoutes);
app.use("/s", saltRoutes);
app.use("/s/:saltName/insalt", postRoutes);
app.use("/api/s", saltApiRoutes);
app.use("/api/insalts", postApiRoutes);
app.use("/api/users", userApiRoutes);
app.use("/api/comments", commentApiRoutes);

// NO PAGE FOUND
app.get("*", function (req, res) {
  res.send("404 PAGE NOT FOUND");
});

// START SERVER
app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
