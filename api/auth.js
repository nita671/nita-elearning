import { showError } from "../utils/index.js";
const API_BASE = "http://localhost:9900";

export async function signUp(user) {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return response;
}

export async function login(username, password) {
  const response = await fetch(
    `${API_BASE}/users?username=${username}&password=${password}`
  );

  return response;
}

export function logout() {
  localStorage.clear();
  window.location.href = "/auth/login";
}

export function checkAuth() {
  if (!localStorage.getItem("username")) {
    window.location.href = "/auth/login";
  }
}
