// Global crops array
let crops = [];


document.addEventListener("DOMContentLoaded", () => {
  const savedCrops = localStorage.getItem("crops");
  if (savedCrops) {
    crops = JSON.parse(savedCrops);
    renderCrops();
  } else {

    fetch("data/crops.json")
      .then(response => response.json())
      .then(data => {
        crops = data;
        saveCrops();
        renderCrops();
      })
      .catch(error => console.error("Error loading crops.json:", error));
  }
});

// Save crops to localStorage
function saveCrops() {
  localStorage.setItem("crops", JSON.stringify(crops));
}

// Render Crops Table
function renderCrops(filteredCrops = crops) {
  const table = document.getElementById("crops-table");
  table.innerHTML = "";
  filteredCrops.forEach((crop, index) => {
    table.innerHTML += `
      <tr>
        <td>${crop.name}</td>
        <td>${crop.type}</td>
        <td>${crop.season}</td>
        <td>
          <button class="btn btn-sm me-2" onclick="editCrop(${index})"><i class="ri-pencil-line"></i></button>
          <button class="btn btn-sm" onclick="deleteCrop(${index})"><i class="ri-delete-bin-5-line"></i></button>
        </td>
      </tr>
    `;
  });
}

// Custom Dropdown Initialization
function initCustomSelect(customSelectId, hiddenInputId) {
  const customSelect = document.getElementById(customSelectId);
  const selected = customSelect.querySelector(".selected");
  const hiddenInput = document.getElementById(hiddenInputId);

  // Toggle dropdown
  selected.addEventListener("click", () => {
    customSelect.classList.toggle("active");
  });

  // Handle option click
  customSelect.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;
      customSelect.classList.remove("active");
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active");
    }
  });
}

// Initialize all dropdowns
document.addEventListener("DOMContentLoaded", () => {
  initCustomSelect("typeSelect", "cropType");
  initCustomSelect("seasonSelectAdd", "cropSeason");
  initCustomSelect("typeSelectEdit", "editCropType");
  initCustomSelect("seasonSelectEdit", "editCropSeason");
});

// Add Crop Form
document.getElementById("cropForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cropName").value.trim();
  const type = document.getElementById("cropType").value;
  const season = document.getElementById("cropSeason").value;

  if (!name || !type || !season) {
    alert("All fields are required!");
    return;
  }

  crops.push({ name, type, season });
  saveCrops();
  renderCrops();
  document.getElementById("cropForm").reset();

  // Reset custom selects
  document.querySelector("#typeSelect .selected").textContent = "Select type";
  document.querySelector("#seasonSelectAdd .selected").textContent = "Select season";
  document.getElementById("cropType").value = "";
  document.getElementById("cropSeason").value = "";

  // Close modal
  const modalEl = document.getElementById("addCropModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

// Edit Crop Form
document.getElementById("editCropForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const index = document.getElementById("editIndex").value;
  const name = document.getElementById("editCropName").value.trim();
  const type = document.getElementById("editCropType").value;
  const season = document.getElementById("editCropSeason").value;

  if (!name || !type || !season) {
    alert("All fields are required!");
    return;
  }

  crops[index] = { name, type, season };
  saveCrops();
  renderCrops();

  // Close modal
  const modalEl = document.getElementById("editCropModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
});

// Delete Crop
function deleteCrop(index) {
  if (confirm("Are you sure you want to delete this crop?")) {
    crops.splice(index, 1);
    saveCrops();
    renderCrops();
  }
}

// Edit Crop
function editCrop(index) {
  const crop = crops[index];
  document.getElementById("editIndex").value = index;
  document.getElementById("editCropName").value = crop.name;

  // Update custom dropdowns
  document.querySelector("#typeSelectEdit .selected").textContent = crop.type;
  document.getElementById("editCropType").value = crop.type;

  document.querySelector("#seasonSelectEdit .selected").textContent = crop.season;
  document.getElementById("editCropSeason").value = crop.season;

  new bootstrap.Modal(document.getElementById("editCropModal")).show();
}

// Search Crop
document.getElementById("search").addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = crops.filter(crop =>
    crop.name.toLowerCase().includes(query) ||
    crop.type.toLowerCase().includes(query) ||
    crop.season.toLowerCase().includes(query)
  );
  renderCrops(filtered);
});