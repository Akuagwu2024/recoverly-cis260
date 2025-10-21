document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Report Form Submission
  // =========================
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newReport = {
        itemName: reportForm.itemName.value.trim(),
        status: reportForm.status.value,
        description: reportForm.description.value.trim(),
        location: reportForm.location.value.trim(),
      };

      const existingReports = JSON.parse(localStorage.getItem("reports")) || [];
      existingReports.push(newReport);
      localStorage.setItem("reports", JSON.stringify(existingReports));

      alert("Your report has been submitted.");
      reportForm.reset();
    });
  }

  // =========================
  // Contact Form Submission
  // =========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for your message. We'll be in touch.");
      contactForm.reset();
    });
  }

  // =========================
  // Search with Filters and Sorting
  // =========================
  const searchBox = document.getElementById("searchBox");
  const resultsDiv = document.getElementById("results");
  const statusFilter = document.getElementById("statusFilter");
  const sortOrder = document.getElementById("sortOrder");

  const storedReports = JSON.parse(localStorage.getItem("reports")) || [];

  function renderResults() {
    const query = searchBox.value.trim().toLowerCase();
    const status = statusFilter.value;
    const sort = sortOrder.value;

    let filtered = storedReports.filter((item) =>
      item.itemName.toLowerCase().includes(query)
    );

    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (sort === "asc") {
      filtered.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else {
      filtered.sort((a, b) => b.itemName.localeCompare(a.itemName));
    }

    resultsDiv.innerHTML = "";

    if (filtered.length === 0) {
      resultsDiv.innerHTML = `<p style="text-align:center; color:#555;">No matches found for "<strong>${query}</strong>".</p>`;
    } else {
      const list = document.createElement("ul");
      list.style.listStyle = "none";
      list.style.padding = "0";

      filtered.forEach((item) => {
        const li = document.createElement("li");
        li.style.marginBottom = "15px";
        li.innerHTML = `
          <strong>${item.itemName}</strong> (${item.status})<br>
          <em>${item.description}</em><br>
          Location: ${item.location}
        `;
        list.appendChild(li);
      });

      resultsDiv.appendChild(list);
    }
  }

  if (searchBox && resultsDiv) {
    searchBox.addEventListener("input", renderResults);
    statusFilter.addEventListener("change", renderResults);
    sortOrder.addEventListener("change", renderResults);
  }
});