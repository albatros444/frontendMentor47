import render from "./render.js";
export default function deleteCommentReply(
  cardType,
  commentOrReply,
  data,
  commentData
) {
  ///commentData for reply deletion
  const deleteModalBackgr = document.querySelector(".deleteModalBg");
  deleteModalBackgr.style.display = "flex";
  /////buttons///
  const cancelDel = document.querySelector(".cancelDeletion");
  const approveDel = document.querySelector(".approveDeletion");
  cancelDel.addEventListener("click", () => {
    deleteModalBackgr.style.display = "none";
  });
  approveDel.addEventListener("click", () => {
    if (cardType === "comment") {
      const commentsMinusOne = data.comments.filter(
        (comment) => comment.id !== commentOrReply.id
      );
      data.comments = commentsMinusOne;
    }
    if (cardType === "reply") {
      const repliesMinusOne = commentData.replies.filter(
        (el) => el.id !== commentOrReply.id
      );
      commentData.replies = repliesMinusOne;
    }
    render(data);
    deleteModalBackgr.style.display = "none";
  });
}
