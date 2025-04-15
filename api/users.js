const API_BASE = "http://localhost:9900";

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) {
    console.error(`User with ID ${id} not found`);
    return null; // or throw an error if you'd rather handle it higher
  }
  return await res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users`);

  return await res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function deleteUser(id) {
  return await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
  });
}
