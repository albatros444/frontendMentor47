import addReply from "./addReply.js";
import deleteCommentReply from "./deleteCommentReply.js";
import editReply from "./editReply.js";
import { upvoteDownvote } from "./upvoteDownvote.js";

export default function renderReply(reply, comment, data) {
  const cardsColumn = document.querySelector(".cardsColumn");

  const isOwnReply = reply.user.username === data.currentUser.username;

  let nestedCommentDiv = document.createElement("div");
  nestedCommentDiv.classList.add("card", "commentCard", "nestedComment");
  isOwnReply && nestedCommentDiv.classList.add("ownReply");
  nestedCommentDiv.innerHTML = `  <div class="votingSec">
            <div class="buttonsBox">
              <button class="upvote up${
                reply.id
              }"><img src="/images/icon-plus.svg" alt="" /></button>
              <p class="votesCount">${reply.score}</p>
              <button class="downvote down${
                reply.id
              }"><img src="/images/icon-minus.svg" alt="" /></button>
            </div>
          </div>
          <div class="mainSec">
            <div class="mainSec__header">
              <div class="mainSec__header__left">
                <img
                  class="avatar"
                  src=${reply.user.image.png}
                  alt=""
                />
                <p class="name">${reply.user.username}</p>
                ${isOwnReply ? `<div class="you"><p>you</p></div>` : ""}
                <p class="howLongAgo howLongAgo${reply.id}">${
    reply.createdAt
  }</p>
              </div>
              <div class="mainSec__header__right">
                ${
                  !isOwnReply
                    ? `<button class="replyToReplyBtn replyToReplyBtn${reply.id}">
                      <img src="/images/icon-reply.svg" alt="" />
                      Reply
                    </button>`
                    : ""
                }  
                ${
                  isOwnReply
                    ? `
                  <button class="deleteBtn deleteBtn${reply.id}">
                  <img src="/images/icon-delete.svg" alt="" />
                    Delete
                  </button >
                  <button class="editBtn editBtn${reply.id}">
                  <img src="/images/icon-edit.svg" alt="" />
                    Edit
                  </button>
                  `
                    : ""
                }           
              </div>
            </div>
            <div class="mainSec__body mainSec__body${reply.id}">
              <p>
              <span>@${reply.replyingTo}</span>
                ${reply.content}
              </p>
            </div>
          </div>`;
  cardsColumn.appendChild(nestedCommentDiv);

  ////////upvote downvote and reply/////

  if (!isOwnReply) {
    const upvoteBtn = document.querySelector(`.up${reply.id}`);
    const downVoteBtn = document.querySelector(`.down${reply.id}`);
    const replyToReplyBtn = document.querySelector(
      `.replyToReplyBtn${reply.id}`
    );
    upvoteBtn.addEventListener("click", () =>
      upvoteDownvote("upvote", upvoteBtn, reply)
    );
    downVoteBtn.addEventListener("click", () =>
      upvoteDownvote("downvote", downVoteBtn, reply)
    );

    replyToReplyBtn.addEventListener("click", () => {
      addReply(nestedCommentDiv, reply, data.currentUser, data, comment);
    });
  }
  ///edit own reply
  if (isOwnReply) {
    const mainSec__body = document.querySelector(`.mainSec__body${reply.id}`);
    const editBtn = document.querySelector(`.editBtn${reply.id}`);
    editBtn.addEventListener("click", () => {
      editReply(mainSec__body, reply, data);
    });
  }
  ///delete own reply
  if (isOwnReply) {
    const deleteBtn = document.querySelector(`.deleteBtn${reply.id}`);
    ///
    deleteBtn.addEventListener("click", () => {
      deleteCommentReply("reply", reply, data, comment);
    });
  }
}
