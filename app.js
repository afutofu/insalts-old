var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("landing");
});

app.listen(3000, function() {
  console.log("Server has started!");
});
