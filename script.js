console.log("Welcome to Recoverly! Start recovering your lost items.");

// Form validation for reportForm
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    hideErrors();

    let valid = true;

    // Validate itemName
    if (!form.itemName.value.trim()) {
      showError("itemNameError");
      valid = false;
    }

    // Validate status
    if (!form.status.value) {
      showError("statusError");
      valid = false;
    }

    // Validate description
    if (!form.description.value.trim()) {
      showError("descriptionError");
      valid = false;
    }

    // Validate location
    if (!form.location.value.trim()) {
      showError("locationError");
      valid = false;
    }

    if (valid) {
      alert("Report submitted successfully! (This is a demo; no data is saved.)");
      form.reset();
    }
  });

  function showError(id) {
    document.getElementById(id).classList.remove("hidden");
  }

  function hideErrors() {
    const errors = document.querySelectorAll("p.text-red-600");
    errors.forEach((el) => el.classList.add("hidden"));
  }
});