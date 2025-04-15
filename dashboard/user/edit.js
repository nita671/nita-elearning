import { updateUser } from "../../api/users.js";
import { showError } from "../../utils/index.js";

export function init() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      id: document.getElementById("id").value,
      fullname: document.getElementById("fullname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    updateUser(user.id, user)
      .then((res) => {
        window.location.href = `/dashboard/user/list`;
      })
      .catch((err) => showError("❌ Update failed: " + err.message));
  });
}

init();
