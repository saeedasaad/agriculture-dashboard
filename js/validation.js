// Generic validation helper
function validateField(fieldId, errorMessage) {
  const field = document.getElementById(fieldId);
  if (!field.value.trim()) {
    alert(errorMessage);
    field.focus();
    return false;
  }
  return true;
}

// Validate Crop Form
function validateCropForm() {
  if (!validateField("cropName", "Crop Name is required")) return false;
  if (!validateField("cropType", "Crop Type is required")) return false;
  if (!validateField("cropSeason", "Crop Season is required")) return false;
  return true;
}

// Attach validation to form
document.getElementById("cropForm").addEventListener("submit", (e) => {
  if (!validateCropForm()) {
    e.preventDefault(); 
  }
});