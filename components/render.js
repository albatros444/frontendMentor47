import addReply from "./addReply.js";
import deleteCommentReply from "./deleteCommentReply.js";
import editComment from "./editComment.js";
import renderReply from "./renderReply.js";
import { upvoteDownvote } from "./upvoteDownvote.js";

let render = (data) => {
  const cardsColumn = document.querySelector(".cardsColumn");
  cardsColumn.innerHTML = "";
  data.comments
    .sort((com1, com2) => com2.score - com1.score)
    .map((commentAndReplies) => {
      const isOwnComment =
        commentAndReplies.user.username === data.currentUser.username; ///is it your own comment

      let commentDiv = document.createElement("div");
      commentDiv.classList.add("card", "commentCard");
      isOwnComment && commentDiv.classList.add("ownComment");
      commentDiv.innerHTML = `<div class="votingSec">
            <div class="buttonsBox">
              <button  class="upvote up${
                commentAndReplies.id
              }"><img src="/images/icon-plus.svg" alt="" /></button>
              <p class="votesCount">${commentAndReplies.score}</p>
              <button class="downvote down${
                commentAndReplies.id
              }"><img src="/images/icon-minus.svg" alt="" /></button>
            </div>
          </div>
          <div class="mainSec">
            <div class="mainSec__header">
              <div class="mainSec__header__left">
                <img
                  class="avatar"
                  src=${commentAndReplies.user.image.png}
                  alt=""
                />
                <p class="name">${commentAndReplies.user.username}</p>
                ${isOwnComment ? `<div class="you"><p>you</p></div>` : ""}
                <p class="howLongAgo howLongAgo${commentAndReplies.id}">${
        commentAndReplies.createdAt
      }</p>
              </div>
              <div class="mainSec__header__right">
              ${
                !isOwnComment
                  ? `<button class="addReplyBtn addReplyBtn${commentAndReplies.id}">
                    <img src="/images/icon-reply.svg" alt="" />
                    Reply
                  </button>`
                  : ` <button class="deleteBtn deleteBtn${commentAndReplies.id}">
                <img src="/images/icon-delete.svg" alt="" />
                  Delete
                </button >
                <button class="editBtn editBtn${commentAndReplies.id}">
                <img src="/images/icon-edit.svg" alt="" />
                  Edit
                </button>`
              }
              </div>
            </div>
            <div class="mainSec__body mainSec__body${commentAndReplies.id}">
              <p>
               ${commentAndReplies.content} 
              </p>
            </div>
          </div>`;

      cardsColumn.appendChild(commentDiv);

      ////////upvote downvote/////
      if (!isOwnComment) {
        const upvoteBtn = document.querySelector(`.up${commentAndReplies.id}`);
        const downVoteBtn = document.querySelector(
          `.down${commentAndReplies.id}`
        );
        upvoteBtn.addEventListener("click", () =>
          upvoteDownvote("upvote", upvoteBtn, commentAndReplies)
        );
        downVoteBtn.addEventListener("click", () =>
          upvoteDownvote("downvote", downVoteBtn, commentAndReplies)
        );
      }

      ///edit own comment
      if (isOwnComment) {
        const editBtn = document.querySelector(
          `.editBtn${commentAndReplies.id}`
        );
        const mainSec__body = document.querySelector(
          `.mainSec__body${commentAndReplies.id}`
        );
        editBtn.addEventListener("click", () => {
          editComment(mainSec__body, commentAndReplies, data);
        });
      }
      //delete own comment
      if (isOwnComment) {
        const deleteBtn = document.querySelector(
          `.deleteBtn${commentAndReplies.id}`
        );
        deleteBtn.addEventListener("click", () =>
          deleteCommentReply("comment", commentAndReplies, data)
        );
      }

      /////////////////replies////////////

      //add reply to comment/////
      if (!isOwnComment) {
        const addReplyBtn = document.querySelector(
          `.addReplyBtn${commentAndReplies.id}`
        );
        addReplyBtn.addEventListener("click", () => {
          addReply(commentDiv, commentAndReplies, data.currentUser, data);
        });
      }
      ////render replies/////
      commentAndReplies.replies.map((reply) => {
        renderReply(reply, commentAndReplies, data);
      });
    });
  //////////
};

export default render;
