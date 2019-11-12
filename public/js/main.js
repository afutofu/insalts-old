// POST CLICKS
var upvote = $("i.upvote");
var downvote = $("i.downvote");
var votes = $(".votes");
var postLinks = $(".post-link");
var postSaltLink = $("post-salt-name");

function disableLink(e) {
  e.preventDefault();
  return false;
}

postSaltLink.on("click", function() {
  postLinks.on("click", function(e) {
    e.preventDefault();
  });
});

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
