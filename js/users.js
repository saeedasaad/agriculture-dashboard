// Global users array
let users = [];

document.addEventListener("DOMContentLoaded", () => {
  const savedUsers = localStorage.getItem("users");
  if (savedUsers) {
    users = JSON.parse(savedUsers);
    renderUsers();
  }
});

// Save users to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Render users into the table
function renderUsers(filteredUsers = users) {
  const tableBody = document.getElementById("users-table");
  tableBody.innerHTML = "";

  filteredUsers.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td><span class="badge px-2 py-1.5" style="background-color: #d5fae0; color: #01b144;">${user.role}</span></td>
      <td>
        <button class="btn btn-sm me-2" onclick="editUser(${index})">
          <i class="ri-edit-line"></i>
        </button>
        <button class="btn btn-sm" onclick="deleteUser(${index})">
          <i class="ri-delete-bin-line"></i>
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Add new user
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const role = document.getElementById("userRole").value;

  if (name && email && role) {
    users.push({ name, email, role });
    saveUsers();
    renderUsers();
    this.reset();

    // Reset custom dropdown
    document.querySelector("#roleSelect .selected").textContent = "Select Role";
    document.getElementById("userRole").value = "";

    bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
  }
});

// Edit user (populate modal)
function editUser(index) {
  const user = users[index];
  document.getElementById("editUserIndex").value = index;
  document.getElementById("editUserName").value = user.name;
  document.getElementById("editUserEmail").value = user.email;

  // Update custom dropdown
  document.querySelector("#roleSelectEdit .selected").textContent = user.role;
  document.getElementById("editUserRole").value = user.role;

  const editModal = new bootstrap.Modal(document.getElementById("editUserModal"));
  editModal.show();
}

// Update user
document.getElementById("editUserForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const index = document.getElementById("editUserIndex").value;
  users[index].name = document.getElementById("editUserName").value.trim();
  users[index].email = document.getElementById("editUserEmail").value.trim();
  users[index].role = document.getElementById("editUserRole").value;

  saveUsers();
  renderUsers();

  // Reset custom dropdown
  document.querySelector("#roleSelectEdit .selected").textContent = "Select Role";
  document.getElementById("editUserRole").value = "";

  bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
});

// Delete user
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    saveUsers();
    renderUsers();
  }
}

// Search users
document.getElementById("searchUsers").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
  );
  renderUsers(filtered);
});

// Custom Dropdown Initialization
function initCustomSelect(customSelectId, hiddenInputId) {
  const customSelect = document.getElementById(customSelectId);
  const selected = customSelect.querySelector(".selected");
  const hiddenInput = document.getElementById(hiddenInputId);

  selected.addEventListener("click", () => {
    customSelect.classList.toggle("active");
  });

  customSelect.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;
      customSelect.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active");
    }
  });
}

// Initialize dropdowns on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initCustomSelect("roleSelect", "userRole");
  initCustomSelect("roleSelectEdit", "editUserRole");
});

// Initial render
renderUsers();