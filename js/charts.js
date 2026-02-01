// Crop Yield Bar Chart
const cropBarCtx = document.getElementById("cropBarChart").getContext("2d");
new Chart(cropBarCtx, {
  type: "bar",
  data: {
    labels: ["Wheat", "Rice", "Corn", "Cotton"],
    datasets: [{
      label: "Yield (tons)",
      data: [120, 90, 70, 50],
      backgroundColor: "#01b144"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Crop Yield Comparison" }
    }
  }
});

// Agriculture Pie Chart
const agriPieCtx = document.getElementById("agriPieChart").getContext("2d");
new Chart(agriPieCtx, {
  type: "pie",
  data: {
    labels: ["Farms", "Farmers", "Crops"],
    datasets: [{
      data: [10, 25, 40],
      backgroundColor: ["#01b144", "#36a2eb", "#ffce56"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Agriculture Overview" }
    }
  }
});

// Monthly Yield Line Chart
const yieldLineCtx = document.getElementById("yieldLineChart").getContext("2d");
new Chart(yieldLineCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Monthly Yield",
      data: [30, 40, 35, 50, 60],
      borderColor: "#01b144",
      backgroundColor: "rgba(1, 177, 68, 0.2)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Yield Growth Trend" }
    }
  }
});

// User Registrations Line Chart
const userLineCtx = document.getElementById("userLineChart").getContext("2d");
new Chart(userLineCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Users Added",
      data: [5, 8, 12, 10, 15, 18],
      borderColor: "#01b144",
      backgroundColor: "rgba(1, 177, 68, 0.2)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Growth Over Time" }
    }
  }
});

// User Roles Bar Chart
const rolesBarCtx = document.getElementById("rolesBarChart").getContext("2d");
new Chart(rolesBarCtx, {
  type: "bar",
  data: {
    labels: ["Admin", "Editor", "Viewer"],
    datasets: [{
      label: "Users",
      data: [3, 7, 10],
      backgroundColor: "#01b144"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: "Current Role Breakdown" }
    }
  }
});