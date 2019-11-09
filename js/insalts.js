var upvote = $("i.upvote");
var downvote = $("i.downvote");
var votes = $(".votes");

upvote.on("click", function() {
  console.log(votes.val());
});
