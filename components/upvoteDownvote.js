const upvoteDownvote = (voteType, buttonLink, commentOrReply) => {
  if (voteType === "upvote") {
    commentOrReply.score++;
    buttonLink.nextElementSibling.innerText = commentOrReply.score;
  }
  if (voteType === "downvote") {
    commentOrReply.score--;
    buttonLink.previousElementSibling.innerText = commentOrReply.score;
  }
};
export { upvoteDownvote };
