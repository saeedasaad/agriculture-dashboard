document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("adminName").value.trim();
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (!name || !email) {
    alert("Name and Email are required!");
    return;
  }

  // Save to localStorage
  localStorage.setItem("adminName", name);
  localStorage.setItem("adminEmail", email);
  if (password) {
    localStorage.setItem("adminPassword", password);
  }

  alert("Profile updated successfully!");

  // Update sidebar immediately
  if (document.getElementById("sidebarName")) {
    document.getElementById("sidebarName").textContent = name;
  }
  if (document.getElementById("sidebarEmail")) {
    document.getElementById("sidebarEmail").textContent = email;
  }
  if (document.getElementById("sidebarInitials")) {
    document.getElementById("sidebarInitials").textContent = name
      .split(" ")
      .map(word => word[0].toUpperCase())
      .join("");
  }
});

// Load Saved Settings on Page Load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("adminName")) {
    const name = localStorage.getItem("adminName");
    document.getElementById("adminName").value = name;
    if (document.getElementById("sidebarName")) {
      document.getElementById("sidebarName").textContent = name;
    }
    if (document.getElementById("sidebarInitials")) {
      document.getElementById("sidebarInitials").textContent = name
        .split(" ")
        .map(word => word[0].toUpperCase())
        .join("");
    }
  }
  if (localStorage.getItem("adminEmail")) {
    const email = localStorage.getItem("adminEmail");
    document.getElementById("adminEmail").value = email;
    if (document.getElementById("sidebarEmail")) {
      document.getElementById("sidebarEmail").textContent = email;
    }
  }
});