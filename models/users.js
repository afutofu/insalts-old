var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdSalts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salt"
    }
  ],
  joinedSalts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salt"
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
