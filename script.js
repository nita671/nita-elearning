let posts = [
  {
    id: 1,
    title: "My Blog",
    content: "LadyTech Limited is a dynamic tech company spacialising in website development and graphic design. We create visually striking, user-friendly websites and engaging brand visuals tailord to help business stand out online. Our team blends creativity with cutting-edge technology to deliver custom digital solution that drive results!",
    author: "Anita Bayo",
    date: "April 10, 2025",
    comments: ["Great work!", "Looking forward to more."]
  }
];

function login() {
  const username = document.getElementById("username").value;
  if (username.trim()) {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    renderPosts();
  }
}

function switchTab(tab) {
  document.getElementById("postsTab").classList.toggle("hidden", tab !== "posts");
  document.getElementById("newPostTab").classList.toggle("hidden", tab !== "newPost");
}

function renderPosts() {
  const container = document.getElementById("postsList");
  container.innerHTML = "";
  posts.forEach(post => {
    const postCard = document.createElement("div");
    postCard.className = "card";
    postCard.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>By ${post.author} on ${post.date}</small>
      <button onclick="deletePost(${post.id})">Delete</button>
      <div class="comments">
        <strong>Comments:</strong>
        ${post.comments.map(c => `<p>- ${c}</p>`).join("")}
        <div class="comment-box">
          <input placeholder="Add a comment" onkeydown="handleComment(event, ${post.id})"/>
        </div>
      </div>
    `;
    container.appendChild(postCard);
  });
}

function handleComment(e, postId) {
  if (e.key === "Enter" && e.target.value.trim()) {
    const comment = e.target.value.trim();
    posts = posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    e.target.value = "";
    renderPosts();
  }
}

function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
  renderPosts();
}

function createPost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const author = document.getElementById("postAuthor").value;

  if (title && content && author) {
    posts.unshift({
      id: Date.now(),
      title,
      content,
      author,
      date: new Date().toLocaleDateString(),
      comments: []
    });

    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    document.getElementById("postAuthor").value = "";

    switchTab("posts");
    renderPosts();
  }
}
