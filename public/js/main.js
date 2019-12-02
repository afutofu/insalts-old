$(document).ready(function() {
  // POST CLICKS
  var upvote = $("i.upvote");
  var downvote = $("i.downvote");
  var posts = $(".post");
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

  // Upvote
  upvote.on("click", function(e) {
    upvotePost($(this).parent(), $(this));
  });

  function upvotePost(upvotedPost, upvoteIcon) {
    var postId = upvotedPost.attr("data-postId");
    var currentVote = parseInt(upvotedPost.attr("data-votes"));
    var updatedVote = currentVote + 1;
    var updatedData = { vote: updatedVote };

    var voteSpan = $(upvotedPost.children()[1]);

    var url = "/api/insalts/" + postId;

    $.ajax({
      method: "PUT",
      url: url,
      data: updatedData
    })
      .then(function(updatedPost) {
        upvoteIcon.toggleClass("i-vote-voted");
        voteSpan.text(updatedVote);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

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
