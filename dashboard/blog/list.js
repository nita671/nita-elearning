import { getBlogs, deleteBlog } from "../../api/blogs.js";
import { showError } from "../../utils/index.js";

export function init() {
  getBlogs()
    .then((data) => {
      console.log(data);
      renderBlogs(data);
    })
    .catch((err) => showError(err.message));
}

function renderBlogs(blogs) {
  const container = document.getElementById("blogsList");
  container.innerHTML = "";
  blogs?.forEach((blog) => {
    console.log(blog);
    const userLiked =
      blog?.likes?.find((l) => l.userId === localStorage.getItem("id")) || null;
    const blogCard = document.createElement("div");
    blogCard.className = "card";
    blogCard.innerHTML = `
      <a href="${`/dashboard/blog/${blog.id}`}">
        <div style="display:flex; justify-content:space-between">
          <h3>${blog.title}</h3>
          <div>
          <img src="${
            userLiked
              ? "/public/images/heart-fill.png"
              : "/public/images/heart.png"
          }" width="24" height="24" />
          <span>${blog.likes.length}</span>
          </div>
        </div>
        ${blog.content
          .split("\n")
          .map((line) => `<p>${line.trim()}</p>`)
          .join("")}
          <small>By ${blog.user?.fullname} on ${blog.date || null}</small>
      </a>
      <div class="action-btn">
        <button class="${`edit_btn`}" data-blogId="${blog.id}">Edit</button>
        <button class="${`delete_btn`}" data-blogId="${blog.id}">Delete</button>
      </div>
      <div class="comments">
        <strong>Comments:</strong>
        ${blog?.comments
          .slice(0, 3)
          ?.map((comment) => `<p>- ${comment.message}</p>`)
          .join("")}
      </div>

    `;
    container.appendChild(blogCard);

    const deleteBtns = document.querySelectorAll(".delete_btn");
    console.log(deleteBtns);

    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        let blogId;
        blogId = e?.target?.dataset?.blogid;
        deleteBlog(blogId)
          .then((res) => {
            window.location.href = "/dashboard/blog/list";
          })
          .catch((err) => showError(JSON.stringify(err)));
      });
    });

    const editBtns = document.querySelectorAll(".edit_btn");

    editBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        let blogId;
        console.log("ID clicked", blogId);
        blogId = e?.target?.dataset?.blogid;
        window.location.href = `/dashboard/blog/${blogId}/edit`;
      });
    });
  });
}
