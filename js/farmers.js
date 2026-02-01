// Global farmers array
let farmers = [];


document.addEventListener("DOMContentLoaded", () => {
  const savedFarmers = localStorage.getItem("farmers");
  if (savedFarmers) {
    farmers = JSON.parse(savedFarmers);
    renderFarmers();
  } else {

    fetch("data/farmers.json")
      .then(response => response.json())
      .then(data => {
        farmers = data;
        saveFarmers();
        renderFarmers();
      })
      .catch(error => console.error("Error loading farmers.json:", error));
  }
});

// Save farmers to localStorage
function saveFarmers() {
  localStorage.setItem("farmers", JSON.stringify(farmers));
}

// Render Farmers Table
function renderFarmers(filteredFarmers = farmers) {
  const table = document.getElementById("farmers-table");
  table.innerHTML = "";
  filteredFarmers.forEach((farmer, index) => {
    table.innerHTML += `
      <tr>
        <td>${farmer.name}</td>
        <td>${farmer.location}</td>
        <td>${farmer.contact}</td>
        <td>
          <button class="btn btn-sm me-2" onclick="editFarmer(${index})"><i class="ri-pencil-line"></i></button>
          <button class="btn btn-sm" onclick="deleteFarmer(${index})"><i class="ri-delete-bin-5-line"></i></button>
        </td>
      </tr>
    `;
  });
}

// Add Farmer Form
document.getElementById("farmerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("farmerName").value.trim();
  const location = document.getElementById("farmerLocation").value.trim();
  const contact = document.getElementById("farmerContact").value.trim();

  if (!name || !location || !contact) {
    alert("All fields are required!");
    return;
  }

  farmers.push({ name, location, contact });
  saveFarmers();
  renderFarmers();
  document.getElementById("farmerForm").reset();

  // Close modal
  const modalEl = document.getElementById("addFarmerModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

// Edit Farmer Form
document.getElementById("editFarmerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const index = document.getElementById("editFarmerIndex").value;
  const name = document.getElementById("editFarmerName").value.trim();
  const location = document.getElementById("editFarmerLocation").value.trim();
  const contact = document.getElementById("editFarmerContact").value.trim();

  if (!name || !location || !contact) {
    alert("All fields are required!");
    return;
  }

  farmers[index] = { name, location, contact };
  saveFarmers();
  renderFarmers();

  // Close modal
  const modalEl = document.getElementById("editFarmerModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

// Delete Farmer
function deleteFarmer(index) {
  if (confirm("Are you sure you want to delete this farmer?")) {
    farmers.splice(index, 1);
    saveFarmers();
    renderFarmers();
  }
}

// Edit Farmer
function editFarmer(index) {
  const farmer = farmers[index];
  document.getElementById("editFarmerIndex").value = index;
  document.getElementById("editFarmerName").value = farmer.name;
  document.getElementById("editFarmerLocation").value = farmer.location;
  document.getElementById("editFarmerContact").value = farmer.contact;

  new bootstrap.Modal(document.getElementById("editFarmerModal")).show();
}

// Search Farmer
document.getElementById("searchFarmers").addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(query) ||
    farmer.location.toLowerCase().includes(query) ||
    farmer.contact.toLowerCase().includes(query)
  );
  renderFarmers(filtered);
});