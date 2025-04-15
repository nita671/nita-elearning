import { createUser } from "../../api/users.js";
import { showError } from "../../utils/index.js";

export function init() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      fullname: document.getElementById("fullname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    createUser(user)
      .then((res) => {
        window.location.href = `/dashboard/user/list`;
      })
      .catch((err) => showError("❌ Sign Up failed: " + err.message));
  });
}
