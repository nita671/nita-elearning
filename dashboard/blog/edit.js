import { updateBlog } from "../../api/blogs.js";
import { showError } from "../../utils/index.js";

export function init() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const blog = {
      id: document.getElementById("id").value,
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      userId: localStorage.getItem("id") || "",
    };

    updateBlog(blog.id, blog)
      .then((res) => {
        window.location.href = `/dashboard/blog/detail`;
      })
      .catch((err) => showError("❌ Sign Up failed: " + err.message));
  });
}
