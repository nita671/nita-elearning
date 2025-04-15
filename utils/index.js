// utils.js
export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

export function showError(msg) {
  showToast(msg, "error");
}
