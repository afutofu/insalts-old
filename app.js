var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// ROUTES
var indexRoutes = require("./routes");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRoutes);

app.listen(3000, function() {
  console.log("Server has started!");
});
