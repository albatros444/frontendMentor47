import render from "./render.js";
import addComment from "./addComment.js";
// import addReply from "./addReply.js";
import uid from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      render(data);
      ////clean input of textarea
      const textarea = document.querySelector("textarea");
      textarea.value = "";
      //add comment
      const sendButton = document.querySelector(".sendCommentBtn");
      const sendButtonMob = document.querySelector(".sendCommentBtnMob");

      sendButton.addEventListener("click", () => {
        addComment(data, uid());
      });
      sendButtonMob.addEventListener("click", () => {
        addComment(data, uid());
      });
    });
});
