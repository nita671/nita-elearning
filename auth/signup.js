import { signUp } from "../api/auth.js";
import { showError } from "../utils/index.js";
export function init() {
  const logInBtn = document.getElementById("logInBtn");
  logInBtn.addEventListener("click", (e) => {
    window.location.href = "/auth/login";
  });

  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      fullname: document.getElementById("fullname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    signUp(user).then((res) => {
      if (res.ok) {
        window.location.href = "/auth/login";
      } else {
        showError("Sign-up failed");
      }
    });
  });
}
