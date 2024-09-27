import render from "./render.js";
const addComment = (data, uid) => {
  const inputField = document.querySelector("textarea");

  // console.log(uid);

  ///add to data////

  const newItem = {
    id: uid,
    content: inputField.value,
    createdAt: "few seconds ago",
    score: 0,
    user: data.currentUser,
    replies: [],
  };
  data.comments.push(newItem);

  render(data);
  inputField.value = "";

  ////////////time stamp/////////
  const thisItem = data.comments.find((item) => item.id === uid);
  const startTime = new Date();
  const delInterval = setInterval(() => {
    const howLongAgo = document.querySelector(`.howLongAgo${uid}`);
    const currTime = new Date();
    let diff = currTime - startTime;
    // console.log("tick", uid, diff);
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
};
export default addComment;
