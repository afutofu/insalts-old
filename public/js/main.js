$(document).ready(function() {
  // POST VOTING SYSTEM ==================================
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
    var voteSpan = $(upvotedPost.children()[1]);
    var url = "/api/insalts/" + postId;

    var downvoteIcon = $(upvotedPost.children()[2]);

    $.ajax({
      method: "GET",
      url: url
    })
      .then(function(data) {
        var upvotes = data.upvotedUsers.length;
        var downvotes = data.downvotedUsers.length;
        var currentVotes = upvotes - downvotes;
        if (!upvoteIcon.hasClass("i-vote-voted")) {
          var updatedData = {
            vote: currentVotes + 1,
            upvote: true,
            downvote: false,
            voted: true
          };
          if (downvoteIcon.hasClass("i-vote-voted")) {
            updatedData.vote = currentVotes + 2;
          }
          $.ajax({
            method: "PUT",
            url: url,
            data: updatedData
          })
            .then(function(updatedPost) {
              upvoteIcon.toggleClass("i-vote-voted");
              voteSpan.text(updatedData.vote);
              if (downvoteIcon.hasClass("i-vote-voted")) {
                downvoteIcon.toggleClass("i-vote-voted");
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else if (upvoteIcon.hasClass("i-vote-voted")) {
          var updatedData = {
            vote: currentVotes - 1,
            upvote: true,
            downvote: false,
            voted: false
          };
          $.ajax({
            method: "PUT",
            url: url,
            data: updatedData
          })
            .then(function(updatedPost) {
              upvoteIcon.toggleClass("i-vote-voted");
              voteSpan.text(updatedData.vote);
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Downvote
  downvote.on("click", function() {
    downvotePost($(this).parent(), $(this));
  });

  function downvotePost(downvotedPost, downvoteIcon) {
    var postId = downvotedPost.attr("data-postId");
    var voteSpan = $(downvotedPost.children()[1]);
    var url = "/api/insalts/" + postId;

    var upvoteIcon = $(downvotedPost.children()[0]);

    $.ajax({
      method: "GET",
      url: url
    })
      .then(function(data) {
        var upvotes = data.upvotedUsers.length;
        var downvotes = data.downvotedUsers.length;
        var currentVotes = upvotes - downvotes;
        if (!downvoteIcon.hasClass("i-vote-voted")) {
          var updatedData = {
            vote: currentVotes - 1,
            upvote: false,
            downvote: true,
            voted: true
          };
          if (upvoteIcon.hasClass("i-vote-voted")) {
            updatedData.vote = currentVotes - 2;
          }
          $.ajax({
            method: "PUT",
            url: url,
            data: updatedData
          })
            .then(function(updatedPost) {
              downvoteIcon.toggleClass("i-vote-voted");
              voteSpan.text(updatedData.vote);
              if (upvoteIcon.hasClass("i-vote-voted")) {
                upvoteIcon.toggleClass("i-vote-voted");
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else if (downvoteIcon.hasClass("i-vote-voted")) {
          var updatedData = {
            vote: currentVotes + 1,
            upvote: false,
            downvote: true,
            voted: false
          };
          $.ajax({
            method: "PUT",
            url: url,
            data: updatedData
          })
            .then(function(updatedPost) {
              downvoteIcon.toggleClass("i-vote-voted");
              voteSpan.text(currentVotes + 1);
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // JOINED BUTTON HOVER TO LEAVE BUTTON =====================
  var joinedBtn = $("#btn-joined");

  joinedBtn.on("mouseenter", function() {
    $(this).text("LEAVE");
  });

  joinedBtn.on("mouseleave", function() {
    $(this).text("JOINED");
  });

  // COMMENTS
  var commentTextArea = $("#comment-textarea");
  var roastBtn = $("#roast-btn");
  var commentList = $("#comment-list");

  roastBtn.on("click", function() {
    var comment = commentTextArea.val();
    if (comment != "") {
      var postId = $(this).attr("data-postId");
      updatedData = { content: comment, post: postId };

      var url = "/api/comments";

      $.ajax({
        method: "POST",
        url: url,
        data: updatedData
      })
        .then(function(createdComment) {
          commentTextArea.val("");
          var li = "<li class='list-group-item'>" + comment + "</li>";
          var newComment = $(li);
          console.log(newComment);
          commentList.append(newComment);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
});
