const API_BASE = "http://localhost:9900";

export async function getBlogs() {
  const res = await fetch(`${API_BASE}/blogs?_embed=likes&_embed=user`);
  return await res.json();
}

export async function getBlog(id) {
  console.log(`Blog ID: ${id}`);
  const res = await fetch(`${API_BASE}/blogs/${id}?_embed=likes&_embed=user`);
  if (!res.ok) {
    console.error(`Blog with ID ${id} not found`);
    return null; // or throw an error if you'd rather handle it higher
  }
  return await res.json();
}

export async function createBlog(blog) {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return await res.json();
}

export async function createLikes(data) {
  const res = await fetch(`${API_BASE}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateBlog(id, blog) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  return await res.json();
}

export async function deleteBlog(id) {
  return await fetch(`${API_BASE}/blogs/${id}`, {
    method: "DELETE",
  });
}

export async function deleteLike(id) {
  return await fetch(`${API_BASE}/likes/${id}`, {
    method: "DELETE",
  });
}

export async function addCommentToBlog(blogId, message) {
  const blog = await getBlog(blogId);
  const comment = {
    id: Date.now(),
    message,
    blogId,
  };
  blog.comments.push(comment);

  const res = await fetch(`${API_BASE}/blogs/${blogId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });

  return await res.json();
}
