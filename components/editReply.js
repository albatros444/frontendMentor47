import render from "./render.js";
export default function editReply(cardBodyLink, reply, data) {
  ///create and add input field
  const textAreaBox = document.createElement("div");
  textAreaBox.classList.add("inputField");
  const textArea = document.createElement("div");
  textArea.classList.add("textarea");
  ////editable p//
  const editable = document.createElement("p");
  editable.contentEditable = true;
  editable.innerHTML = `<p><span contentEditable="false">@${reply.replyingTo}</span>   ${reply.content}</p>`;

  textArea.appendChild(editable);
  textAreaBox.appendChild(textArea);
  cardBodyLink.innerHTML = "";
  cardBodyLink.appendChild(textAreaBox);
  ///update button
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("sendCommentBtn");
  updateBtn.innerText = "update";
  cardBodyLink.appendChild(updateBtn);
  cardBodyLink.classList.add("updateComment");
  ///update comment
  updateBtn.addEventListener("click", () => {
    let text = editable.innerText;
    text = text.split(" ").splice(1).join(" ");
    reply.content = text;
    render(data);
  });
}
