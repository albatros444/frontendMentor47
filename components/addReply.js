import render from "./render.js";
import uid from "./utils.js";

const addReply = (commentDiv, commentData, currentUser, data, parent) => {
  //parent mean commentDiv in case of reply to reply, commentDiv in this case is nestedCommentDiv
  // console.log("commentData", commentData, commentDiv, data);

  const replyInputCard = document.createElement("div");
  replyInputCard.classList.add(
    "card",
    "sendingCard",
    "addCommentCard",
    "addReplyCard"
  );
  parent && replyInputCard.classList.add("addReplyToReplyCard");
  replyInputCard.innerHTML = `
          <div class="avatar">
            <img src="/images/avatars/image-juliusomo.png" alt="" />
          </div>
          <div class="inputField">
            <textarea name="" class="replyInputField" id="" placeholder="Add a comment..."></textarea>
          </div>
          <button class="sendCommentBtn">reply</button>`;

  //add card to dom
  commentDiv.after(replyInputCard);
  //add event listener
  const sendCommentBtn = document.querySelector(".sendCommentBtn");
  const replyInputField = document.querySelector(".replyInputField");
  const id = uid();
  sendCommentBtn.addEventListener("click", () => {
    //add to data///
    const newItem = {
      id,
      content: replyInputField.value,
      createdAt: "few seconds ago",
      score: 0,
      replyingTo: commentData.user.username,
      user: currentUser,
    };
    commentData.replies
      ? commentData.replies.push(newItem) ///reply to comment
      : parent.replies.push(newItem); //reply to reply

    render(data);
    const thisItem = commentData.replies
      ? commentData.replies.find((reply) => reply.id === id)
      : parent.replies.find((reply) => reply.id === id);
    ///////////time stamp/////////
    const startTime = new Date();
    const delInterval = setInterval(() => {
      const howLongAgo = document.querySelector(`.howLongAgo${id}`);
      const currTime = new Date();
      let diff = currTime - startTime;
      if (diff > 30000 && diff < 60000) {
        howLongAgo.innerText = "half a minute ago";
        thisItem.createdAt = "half a minute ago";
      }
      if (diff > 60000 && diff < 120000) {
        howLongAgo.innerText = "1 minute ago";
        thisItem.createdAt = "1 minute ago";
      }
      if (diff > 60000 && diff < 60000 * 10) {
        const mins = Math.floor(diff / 60000);
        howLongAgo.innerText = `${mins} minutes ago`;
        thisItem.createdAt = `${mins} minutes ago`;
      }
      if (diff > 60000 * 10) {
        howLongAgo.innerText = "10 minutes ago";
        thisItem.createdAt = "10 minutes ago";
      }
    }, 5000);
  });
};
export default addReply;
