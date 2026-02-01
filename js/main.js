// Toggle sidebar collapse

document.getElementById("toggle-btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("sidebar-collapsed");
});

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Admin Info
  if (localStorage.getItem("adminName")) {
    const name = localStorage.getItem("adminName");
    document.getElementById("sidebarName").textContent = name;

    // Update initials
    document.getElementById("sidebarInitials").textContent = name
      .split(" ")
      .map(word => word[0].toUpperCase())
      .join("");
  }

  if (localStorage.getItem("adminEmail")) {
    document.getElementById("sidebarEmail").textContent = localStorage.getItem("adminEmail");
  }

  // Load Data from LocalStorage
  const crops = JSON.parse(localStorage.getItem("crops")) || [];
  const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  const farms = JSON.parse(localStorage.getItem("farms")) || [];

  // Update Card Counts
  document.getElementById("crops-count").textContent = crops.length;
  document.getElementById("farmers-count").textContent = farmers.length;
  document.getElementById("users-count").textContent = users.length;

  document.getElementById("farms-count").textContent = farms.length || farmers.length;

  let totalYield = 0;
  reports.forEach(r => {
    if (r.yield) totalYield += Number(r.yield);
  });
  document.getElementById("yield-count").textContent = totalYield || reports.length;


  // Charts

  const cropTypes = {};
  crops.forEach(crop => {
    cropTypes[crop.type] = (cropTypes[crop.type] || 0) + 1;
  });
  new Chart(document.getElementById("cropBarChart"), {
    type: "bar",
    data: {
      labels: Object.keys(cropTypes),
      datasets: [{
        label: "Crops by Type",
        data: Object.values(cropTypes),
        backgroundColor: "#01b144"
      }]
    }
  });

  // Yield Line Chart (reports by month)
  const monthlyYield = {};
  reports.forEach(report => {
    if (report.date) {
      const month = new Date(report.date).toLocaleString("default", { month: "short" });
      monthlyYield[month] = (monthlyYield[month] || 0) + 1;
    }
  });
  new Chart(document.getElementById("yieldLineChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyYield),
      datasets: [{
        label: "Monthly Yield",
        data: Object.values(monthlyYield),
        borderColor: "#01b144",
        fill: false
      }]
    }
  });

  // Agriculture Pie Chart (farmers vs crops)
  new Chart(document.getElementById("agriPieChart"), {
    type: "pie",
    data: {
      labels: ["Crops", "Farmers"],
      datasets: [{
        data: [crops.length, farmers.length],
        backgroundColor: ["#01b144", "#ffc107"]
      }]
    }
  });

  // User Line Chart (registrations by month)
  const monthlyUsers = {};
  users.forEach(user => {
    if (user.date) {
      const month = new Date(user.date).toLocaleString("default", { month: "short" });
      monthlyUsers[month] = (monthlyUsers[month] || 0) + 1;
    }
  });
  new Chart(document.getElementById("userLineChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyUsers),
      datasets: [{
        label: "User Registrations",
        data: Object.values(monthlyUsers),
        borderColor: "#01b144",
        fill: false
      }]
    }
  });

  // Roles Bar Chart 
  const roleCounts = {};
  users.forEach(user => {
    if (user.role) {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    }
  });
  new Chart(document.getElementById("rolesBarChart"), {
    type: "bar",
    data: {
      labels: Object.keys(roleCounts),
      datasets: [{
        label: "User Roles",
        data: Object.values(roleCounts),
        backgroundColor: "#01b144"
      }]
    }
  });
});