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
              }"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" /></svg></button>
              <p class="votesCount">${commentAndReplies.score}</p>
              <button class="downvote down${
                commentAndReplies.id
              }"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" /></svg></button>
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
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>
                    Reply
                  </button>`
                  : ` <button class="deleteBtn deleteBtn${commentAndReplies.id}">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" /></svg>
                  Delete
                </button >
                <button class="editBtn editBtn${commentAndReplies.id}">
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" /></svg>
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
