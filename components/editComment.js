import render from "./render.js";
export default function editComment(cardBodyLink, comment, data) {
  ///create and add input field
  console.log("edit");
  const textAreaBox = document.createElement("div");
  textAreaBox.classList.add("inputField");
  const textArea = document.createElement("textarea");
  textAreaBox.appendChild(textArea);
  cardBodyLink.innerHTML = "";
  cardBodyLink.appendChild(textAreaBox);
  textArea.value = comment.content;

  ///create and add update button
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("sendCommentBtn");
  updateBtn.innerText = "update";
  cardBodyLink.appendChild(updateBtn);
  cardBodyLink.classList.add("updateComment");
  ///update comment
  updateBtn.addEventListener("click", () => {
    comment.content = textArea.value;
    render(data);
  });
}
