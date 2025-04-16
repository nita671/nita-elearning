// main.js

import { checkAuth } from "../../api/auth.js";
import { showError } from "../../utils/index.js";

// main.js
const routeMap = {
  "/auth/signup": () => import("../../auth/signup.js"),
  "/auth/login": () => import("../../auth/login.js"),
  "/dashboard/blog/list": () => import("../../dashboard/blog/list.js"),
  "/dashboard/blog/create": () => import("../../dashboard/blog/create.js"),
  "/dashboard/blog/edit": () => import("../../dashboard/blog/edit.js"),
  "/dashboard/blog/detail": () => import("../../dashboard/blog/detail.js"),
  "/dashboard/user/list": () => import("../../dashboard/user/list.js"),
  "/dashboard/user/create": () => import("../../dashboard/user/create.js"),
  "/dashboard/user/edit": () => import("../../dashboard/user/edit.js"),
  "/dashboard/user/detail": () => import("../../dashboard/user/detail.js"),
  // Add more pages here as needed
};

const path = window.location.pathname;

if (routeMap[path]) {
  routeMap[path]()
    .then((mod) => {
      if (mod && typeof mod.init === "function") {
        mod.init(); // Call init() exported from the page module
      }
    })
    .catch((err) => {
      console.log("❌ Failed to load module for page:", path, err);
    });
}

const navAction = document.querySelector(".nav-action");
const navDashboard = navAction.querySelector(".dashboard");
const navAuth = navAction.querySelector(".auth");
const logoutBtn = navDashboard.querySelector("#logout");

if (localStorage.getItem("username")) {
  navDashboard.classList.remove("hidden");
  navAuth.classList.add("hidden");
} else {
  navDashboard.classList.add("hidden");
  navAuth.classList.remove("hidden");
}

logoutBtn.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.href = "/";
});
