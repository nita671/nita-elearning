import { createBlog } from "../../api/blogs.js";
import { showError } from "../../utils/index.js";

export function init() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const blog = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      userId: localStorage.getItem("id"),
      date: new Date().toLocaleDateString(),
      comments: [],
    };
    createBlog(blog)
      .then((res) => {
        window.location.href = `/dashboard/blog/list`;
      })
      .catch((err) => showError("❌ Sign Up failed: " + err.message));
  });
}
