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

  downvote.on("mouseenter", function() {
    postLinks.bind("click", disableLink);
  });

  downvote.on("mouseleave", function() {
    postLinks.unbind("click", disableLink);
  });

  // Upvote
  upvote.on("click", function() {
    upvotePost($(this).parent(), $(this));
  });

  function upvotePost(upvotedPost, upvoteIcon) {
    var postId = upvotedPost.attr("data-postId");
    var currentVote = parseInt(upvotedPost.attr("data-votes"));
    var voteSpan = $(upvotedPost.children()[1]);
    var url = "/api/insalts/" + postId;

    var downvoteIcon = $(upvotedPost.children()[2]);

    if (downvoteIcon.hasClass("i-vote-voted")) {
      downvoteIcon.toggleClass("i-vote-voted");
    }

    if (!upvoteIcon.hasClass("i-vote-voted")) {
      var updatedData = { vote: currentVote + 1 };
      $.ajax({
        method: "PUT",
        url: url,
        data: updatedData
      })
        .then(function(updatedPost) {
          upvoteIcon.toggleClass("i-vote-voted");
          voteSpan.text(currentVote + 1);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else if (upvoteIcon.hasClass("i-vote-voted")) {
      var updatedData = { vote: currentVote };
      $.ajax({
        method: "PUT",
        url: url,
        data: updatedData
      })
        .then(function(updatedPost) {
          upvoteIcon.toggleClass("i-vote-voted");
          voteSpan.text(currentVote);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

  // Downvote
  downvote.on("click", function() {
    downvotePost($(this).parent(), $(this));
  });

  function downvotePost(downvotedPost, downvoteIcon) {
    var postId = downvotedPost.attr("data-postId");
    var currentVote = parseInt(downvotedPost.attr("data-votes"));
    var voteSpan = $(downvotedPost.children()[1]);
    var url = "/api/insalts/" + postId;

    var upvoteIcon = $(downvotedPost.children()[0]);

    if (upvoteIcon.hasClass("i-vote-voted")) {
      upvoteIcon.toggleClass("i-vote-voted");
    }

    if (!downvoteIcon.hasClass("i-vote-voted")) {
      var updatedData = { vote: currentVote - 1 };
      $.ajax({
        method: "PUT",
        url: url,
        data: updatedData
      })
        .then(function(updatedPost) {
          downvoteIcon.toggleClass("i-vote-voted");
          voteSpan.text(currentVote - 1);
        })
        .catch(function(err) {
          console.log(err);
        });
    } else if (downvoteIcon.hasClass("i-vote-voted")) {
      var updatedData = { vote: currentVote };
      $.ajax({
        method: "PUT",
        url: url,
        data: updatedData
      })
        .then(function(updatedPost) {
          downvoteIcon.toggleClass("i-vote-voted");
          voteSpan.text(currentVote);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

  // JOINED BUTTON HOVER TO LEAVE BUTTON
  var joinedBtn = $("#btn-joined");

  joinedBtn.on("mouseenter", function() {
    $(this).text("LEAVE");
  });

  joinedBtn.on("mouseleave", function() {
    $(this).text("JOINED");
  });
});
