import { login, checkAuth } from "../api/auth.js";
import { showError } from "../utils/index.js";

export function init() {
  const form = document.querySelector("form");
  const signUpBtn = document.getElementById("signUpBtn");
  signUpBtn.addEventListener("click", (e) => {
    window.location.href = "/auth/signup";
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          localStorage.setItem("id", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("fullname", user.fullname);
          window.location.href = "/dashboard/blog/list";
        } else {
          showError("Invalid credential");
        }
      })
      .catch((err) =>
        console.log("❌ Login failed: " + JSON.stringify(err.message))
      );
  });
}
