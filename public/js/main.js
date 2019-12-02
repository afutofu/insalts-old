$(document).ready(function() {
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

  upvote.on("mouseenter", function() {
    postLinks.bind("click", disableLink);
  });

  upvote.on("mouseleave", function() {
    postLinks.unbind("click", disableLink);
  });

  // upvote.on("click", () => {});

  downvote.on("mouseenter", function() {
    postLinks.bind("click", disableLink);
  });

  downvote.on("mouseleave", function() {
    postLinks.unbind("click", disableLink);
  });

  // JOINED BUTTON HOVER TO LEAVE BUTTON
  var joinedBtn = $("#btn-joined");

  joinedBtn.on("mouseenter", function() {
    $(this).text("LEAVE");
  });

  joinedBtn.on("mouseleave", function() {
    $(this).text("JOINED");
  });
});
