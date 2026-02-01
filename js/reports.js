// Global reports array
let reports = [];


document.addEventListener("DOMContentLoaded", () => {
  const savedReports = localStorage.getItem("reports");
  if (savedReports) {
    reports = JSON.parse(savedReports);
    renderReports();
    updateChart();
  } else {
  
    fetch("data/reports.json")
      .then(response => response.json())
      .then(data => {
        reports = data;
        saveReports();
        renderReports();
        updateChart();
      })
      .catch(error => console.error("Error loading reports.json:", error));
  }
});

// Save reports to localStorage
function saveReports() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

// Render Reports Table
function renderReports(filteredReports = reports) {
  const table = document.getElementById("reports-table");
  table.innerHTML = "";
  filteredReports.forEach((report, index) => {
    table.innerHTML += `
      <tr>
        <td>${report.title}</td>
        <td>${report.category}</td>
        <td>${report.date}</td>
        <td>
          <button class="btn btn-sm" onclick="editReport(${index})"><i class="ri-pencil-line"></i></button>
          <button class="btn btn-sm" onclick="deleteReport(${index})"><i class="ri-delete-bin-5-line"></i></button>
        </td>
      </tr>
    `;
  });
}

// Add / Update Report Form
document.getElementById("reportForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("reportTitle").value.trim();
  const category = document.getElementById("reportCategory").value.trim();
  const date = document.getElementById("reportDate").value;

  if (!title || !category || !date) {
    alert("All fields are required!");
    return;
  }

  const btn = document.getElementById("reportSubmitBtn");
  if (btn.dataset.editIndex !== undefined) {
    const index = parseInt(btn.dataset.editIndex);
    reports[index] = { title, category, date };
    btn.textContent = "Add Report";
    delete btn.dataset.editIndex;
  } else {
    // Add new report
    reports.push({ title, category, date });
  }

  saveReports();
  renderReports();
  updateChart();
  document.getElementById("reportForm").reset();

  // Close modal
  const modalEl = document.getElementById("addReportModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

// Edit Report

function editReport(index) {
  const report = reports[index];
  document.getElementById("reportTitle").value = report.title;
  document.getElementById("reportCategory").value = report.category;
  document.getElementById("reportDate").value = report.date;

  const btn = document.getElementById("reportSubmitBtn");
  btn.textContent = "Update Report";
  btn.dataset.editIndex = index;

  new bootstrap.Modal(document.getElementById("addReportModal")).show();
}

// Delete Report

function deleteReport(index) {
  if (confirm("Are you sure you want to delete this report?")) {
    reports.splice(index, 1);
    saveReports();
    renderReports();
    updateChart();
  }
}

// Search Reports
document.getElementById("searchReports").addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = reports.filter(report =>
    report.title.toLowerCase().includes(query) ||
    report.category.toLowerCase().includes(query) ||
    report.date.toLowerCase().includes(query)
  );
  renderReports(filtered);
});

// Chart.js Visualization
let reportsChart;

function updateChart() {
  const ctx = document.getElementById("reportsChart").getContext("2d");

  // Count reports per category
  const categoryCounts = {};
  reports.forEach(report => {
    categoryCounts[report.category] = (categoryCounts[report.category] || 0) + 1;
  });

  const labels = Object.keys(categoryCounts);
  const data = Object.values(categoryCounts);

  if (reportsChart) {
    reportsChart.destroy();
  }

  reportsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Reports per Category",
        data: data,
        backgroundColor: "#01b144"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}