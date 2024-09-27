import render from "./render.js";
import uid from "./utils.js";

const addReply = (commentDiv, commentData, currentUser, data, parent) => {
  //parent mean commentDiv in case of reply to reply, commentDiv in this case is nestedCommentDiv
  // console.log("commentData", commentData, commentDiv, data);

  const id = uid();
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
            <button class=" sendCommentBtnMob">reply</button>
          </div>
          <div class="inputField">
            <textarea name="" class="replyInputField textarea${id}" id="" ></textarea>
          </div>
          <button class="sendCommentBtn">reply</button>`;

  //add card to dom
  commentDiv.after(replyInputCard);
  //add @to whom to textarea
  const textArea = document.querySelector(`.textarea${id}`);
  textArea.innerText = `@${commentData.user.username}  `;
  //add event listener
  const sendCommentBtn = document.querySelector(".sendCommentBtn");
  const sendCommentBtnMob = document.querySelector(".sendCommentBtnMob");
  const replyInputField = document.querySelector(".replyInputField");
  //////////function for send reply to comment mobile and desktop
  const sendReply = () => {
    //add to data///
    let editedValue = replyInputField.value.split(" ").splice(1).join(" ");

    const newItem = {
      id,
      content: editedValue,
      createdAt: "few sec ago",
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
        howLongAgo.innerText = "30 sec ago";
        thisItem.createdAt = "30 sec ago";
      }
      if (diff > 60000 && diff < 120000) {
        howLongAgo.innerText = "1 min ago";
        thisItem.createdAt = "1 min ago";
      }
      if (diff > 60000 && diff < 60000 * 10) {
        const mins = Math.floor(diff / 60000);
        howLongAgo.innerText = `${mins} min ago`;
        thisItem.createdAt = `${mins} min ago`;
      }
      if (diff > 60000 * 10) {
        howLongAgo.innerText = "10 min ago";
        thisItem.createdAt = "10 min ago";
      }
    }, 5000);
  };

  sendCommentBtn.addEventListener("click", () => sendReply());
  sendCommentBtnMob.addEventListener("click", () => sendReply());
  console.log(sendCommentBtnMob);
};
export default addReply;
