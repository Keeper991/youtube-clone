import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelBtn = document.querySelectorAll(".jsCommentDelBtn");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = async (event) => {
  const comment = event.target.previousSibling.innerHTML;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "DELETE",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    commentList.removeChild(event.target.parentNode);
    decreaseNumber();
  }
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const delBtn = document.createElement("span");
  delBtn.classList.add("jsCommentDelBtn");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteComment);
  div.innerHTML = comment;
  li.appendChild(div);
  li.appendChild(delBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  commentDelBtn.forEach((delBtn) => {
    return delBtn.addEventListener("click", deleteComment);
  });
}

if (addCommentForm) {
  init();
}
