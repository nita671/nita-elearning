import {
  addCommentToBlog,
  createLikes,
  deleteLike,
  getBlog,
} from "../../api/blogs.js";

const commentInput = document.getElementById("comment-input");
const likesCount = document.getElementById("likes-count");
const likesBtn = document.getElementById("likes");
const blogId = document.querySelector("#blogId").dataset.blogid;

const likeHeart = likesBtn.querySelector("img#heart");
const likeHeartFill = likesBtn.querySelector("img#heart-fill");

console.log(commentInput);
console.log(blogId);

commentInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevent newline if it's a textarea

    const comment = commentInput.value.trim();

    if (comment) {
      // Call your comment submission function here
      submitComment(comment);
    }
  }
});

getBlog(blogId).then((data) => {
  const likes = data.likes;
  const userLiked =
    likes?.find((l) => l.userId === localStorage.getItem("id")) || null;
  if (!userLiked) {
    likesBtn.addEventListener("click", (e) => {
      createLikes({ userId: localStorage.getItem("id"), blogId }).then(
        (data) => {
          window.location.href = `/dashboard/blog/${blogId}`;
        }
      );
    });
  } else {
    likesBtn.addEventListener("click", (e) => {
      deleteLike(userLiked.id).then((data) => {
        window.location.href = `/dashboard/blog/${blogId}`;
      });
    });
  }
  likeHeart.classList.toggle("hidden", userLiked);
  likeHeartFill.classList.toggle("hidden", !userLiked);
  likesCount.innerText = likes?.length || 0;
});

function submitComment(comment) {
  console.log("Submitting comment:", comment);

  addCommentToBlog(blogId, comment)
    .then((data) => {
      window.location.href = `/dashboard/blog/${blogId}`;
    })
    .catch((err) => console.error(err));
}
