import { getAllUsers, deleteUser } from "../../api/users.js";
import { showError } from "../../utils/index.js";

export function init() {
  getAllUsers()
    .then((data) => {
      console.log(data);
      renderUsers(data);
    })
    .catch((err) => showError(err.message));
}

function renderUsers(users) {
  const container = document.getElementById("usersList");
  container.innerHTML = "";
  users?.forEach((user) => {
    console.log(user);
    const userCard = document.createElement("div");
    userCard.className = "card";
    userCard.innerHTML = `
    <a href="${`/dashboard/user/${user.id}`}"/>

      <h3>${user.fullname}</h3>
      <div class="action">
        <button class="${`edit_btn`}" data-userId="${user.id}">Edit</button>
        <button class="${`delete_btn`}" data-userId="${user.id}">Delete</button>
      </div>
    </a>
    `;
    container.appendChild(userCard);

    const deleteBtns = document.querySelectorAll(".delete_btn");

    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        let userId;
        userId = e?.target?.dataset?.userid;
        deleteUser(userId)
          .then((res) => {
            window.location.href = "/dashboard/user/list";
          })
          .catch((err) => showError(JSON.stringify(err)));
      });
    });

    const editBtns = document.querySelectorAll(".edit_btn");

    editBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        let userId;
        userId = e?.target?.dataset?.userid;
        window.location.href = "/dashboard/user/edit";
      });
    });
  });
}
