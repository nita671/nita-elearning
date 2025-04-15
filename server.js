// server.js
// import http from "https";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getBlog } from "./api/blogs.js";
import { getUser } from "./api/users.js";
import { readFile } from "fs/promises";

// ✅ Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

// 🔁 Pretty URLs: /auth/login → /auth/login.html
app.use((req, res, next) => {
  const lastSegment = req.url.split("/").at(-1);
  console.log(req.url.split("/").at(-1));
  if (req.url.endsWith("/")) {
    req.url += "index.html";
  } else if (!path.extname(req.url)) {
    req.url += ".html";
  }
  next();
});

// Serve static frontend files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname)));

app.get("/dashboard/blog/:id", async (req, res) => {
  const blogId = req.params.id.split(".")[0];

  // Protect against reserved routes
  if (blogId === "list" || blogId === "create") {
    return res.status(404).send("Page not found");
  }

  try {
    const blog = await getBlog(blogId);

    if (!blog) {
      return res.status(404).send("Blog post not found");
    }

    let html = await readFile(
      path.join(__dirname, "dashboard/blog/detail.html"),
      "utf-8"
    );

    const content = blog.content
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("");

    const comments = blog.comments.map((c) => `<p>- ${c.message}</p>`).join("");

    html = html
      .replace(/{{id}}/g, blog.id)
      .replace(/{{title}}/g, blog.title)
      .replace(/{{author}}/g, blog.user.fullname)
      .replace(/{{date}}/g, blog.date)
      .replace(/{{content}}/g, content)
      .replace(/{{comments}}/g, comments);

    return res.send(html); // ✅ only one response
  } catch (error) {
    console.error("Error loading blog post:", error);
    return res.status(500).send("Server error"); // ✅ only happens on error
  }
});

app.get("/dashboard/blog/:id/edit.html", async (req, res) => {
  const blogId = req.params.id.split(".")[0];

  console.log("djsldj", blogId);

  // Protect against reserved routes
  if (blogId === "list" || blogId === "create") {
    return res.status(404).send("Page not found");
  }

  try {
    const blog = await getBlog(blogId);

    if (!blog) {
      return res.status(404).send("Blog post not found");
    }

    let html = await readFile(
      path.join(__dirname, "dashboard/blog/edit.html"),
      "utf-8"
    );

    const content = blog.content;

    html = html
      .replace(/{{id}}/g, blog.id)
      .replace(/{{title}}/g, blog.title)
      .replace(/{{author}}/g, blog.user.fullname)
      .replace(/{{date}}/g, blog.date)
      .replace(/{{content}}/g, content);

    return res.send(html); // ✅ only one response
  } catch (error) {
    console.error("Error loading blog post:", error);
    return res.status(500).send("Server error"); // ✅ only happens on error
  }
});

app.get("/dashboard/user/:id", async (req, res) => {
  console.log("Req", req.params);
  const userId = req.params.id.split(".")[0];
  console.log("User ID: ", userId);

  // Protect against reserved routes
  if (userId === "list" || userId === "create") {
    return res.status(404).send("Page not found");
  }

  try {
    const user = await getUser(userId);

    console.log("user ", user);

    if (!user) {
      return res.status(404).send("User post not found");
    }

    let html = await readFile(
      path.join(__dirname, "dashboard/user/detail.html"),
      "utf-8"
    );

    html = html
      .replace(/{{id}}/g, user.id)
      .replace(/{{fullname}}/g, user.fullname)
      .replace(/{{username}}/g, user.username);

    return res.send(html); // ✅ only one response
  } catch (error) {
    console.error("Error loading user post:", error);
    return res.status(500).send("Server error"); // ✅ only happens on error
  }
});

app.get("/dashboard/user/:id/edit.html", async (req, res) => {
  const userId = req.params.id.split(".")[0];

  console.log("djsldj", userId);

  // Protect against reserved routes
  if (userId === "list" || userId === "create") {
    return res.status(404).send("Page not found");
  }

  try {
    const user = await getUser(userId);

    if (!user) {
      return res.status(404).send("User post not found");
    }

    let html = await readFile(
      path.join(__dirname, "dashboard/user/edit.html"),
      "utf-8"
    );

    html = html
      .replace(/{{id}}/g, user.id)
      .replace(/{{fullname}}/g, user.fullname)
      .replace(/{{username}}/g, user.username)
      .replace(/{{password}}/g, user.password);

    return res.send(html); // ✅ only one response
  } catch (error) {
    console.error("Error loading user post:", error);
    return res.status(500).send("Server error"); // ✅ only happens on error
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
