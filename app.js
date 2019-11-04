var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// ROUTES
var indexRoutes = require("./routes");
var saltRoutes = require("./routes/salts");
var postRoutes = require("./routes/posts");

// CONNECT TO DATABASE
mongoose.connect("mongodb://localhost/insalts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// USE ROUTES
app.use("/", indexRoutes);
app.use("/s", saltRoutes);
app.use("/s/:saltName/posts", postRoutes);

// START SERVER
app.listen(3000, function() {
  console.log("Server has started!");
});
