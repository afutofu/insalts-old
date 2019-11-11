// VOTING SYSTEM
var upvote = $("i.upvote");
var downvote = $("i.downvote");
var votes = $(".votes");
var postLinks = $(".post-link");

function disableLink(e) {
  e.preventDefault();
  return false;
}

upvote.on("mouseenter", function() {
  postLinks.bind("click", disableLink);
});

upvote.on("mouseleave", function() {
  postLinks.unbind("click", disableLink);
});

downvote.on("mouseenter", function() {
  postLinks.bind("click", disableLink);
});

downvote.on("mouseleave", function() {
  postLinks.unbind("click", disableLink);
});

// JOIN BUTTON HOVER TO LEAVE BUTTON
var joinBtn = $("#btn-join");

joinBtn.on("mouseenter", function() {
  $(this).text("LEAVE");
});

joinBtn.on("mouseleave", function() {
  $(this).text("JOIN");
});
