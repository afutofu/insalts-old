var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// ROUTES
var indexRoutes = require("./routes");

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

// START SERVER
app.listen(3000, function() {
  console.log("Server has started!");
});
