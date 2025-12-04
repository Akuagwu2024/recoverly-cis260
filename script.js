// -----------------------------
// Sidebar Tab Switching (Homepage)
// -----------------------------
function openSection(sectionId) {
  const contents = document.querySelectorAll(".tabcontent");
  contents.forEach(c => c.style.display = "none");
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
  }
}

// -----------------------------
// Report Form Handling
// -----------------------------
function initReportForm() {
  const reportForm = document.getElementById("reportForm");
  if (!reportForm) return;

  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const itemName = reportForm.itemName.value.trim();
    const status = reportForm.status.value;
    const campus = reportForm.campus.value;
    const category = reportForm.category.value;
    const description = reportForm.description.value.trim();
    const location = reportForm.location.value.trim();
    const email = reportForm.reportEmail.value.trim();

    if (!itemName || !status || !campus || !category || !description || !location) {
      alert("Please fill out all required fields.");
      return;
    }

    if (email && !email.endsWith("@ccc.edu")) {
      alert("Please use a valid @ccc.edu email address.");
      return;
    }

    const item = {
      itemName,
      status,
      campus,
      category,
      description,
      location,
      email,
      date: new Date().toLocaleString()
    };

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    alert("Report submitted successfully!");
    reportForm.reset();
  });
}

// -----------------------------
// Search Page Handling
// -----------------------------
function initSearchPage() {
  const searchForm = document.getElementById("searchForm");
  const searchBox = document.getElementById("searchBox");
  const statusFilter = document.getElementById("statusFilter");
  const campusFilter = document.getElementById("campusFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOrder = document.getElementById("sortOrder");
  const results = document.getElementById("results");

  if (!results) return;

  function renderResults() {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    let query = searchBox ? searchBox.value.toLowerCase() : "";

    items = items.filter(item => {
      let matchesQuery = !query || item.itemName.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      let matchesStatus = !statusFilter || statusFilter.value === "all" || item.status === statusFilter.value;
      let matchesCampus = !campusFilter || campusFilter.value === "all" || item.campus === campusFilter.value;
      let matchesCategory = !categoryFilter || categoryFilter.value === "all" || item.category === categoryFilter.value;
      return matchesQuery && matchesStatus && matchesCampus && matchesCategory;
    });

    if (sortOrder && sortOrder.value === "desc") {
      items.sort((a, b) => b.itemName.localeCompare(a.itemName));
    } else {
      items.sort((a, b) => a.itemName.localeCompare(b.itemName));
    }

    results.innerHTML = "";
    if (items.length === 0) {
      results.innerHTML = "<p>No items found.</p>";
    } else {
      items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-card";
        div.innerHTML = `
          <h3>${item.itemName}</h3>
          <p class="item-meta">${item.status} | ${item.campus} | ${item.category}</p>
          <p>${item.description}</p>
          <p><em>Last seen: ${item.location}</em></p>
          <p><small>Reported: ${item.date}</small></p>
        `;
        results.appendChild(div);
      });
    }
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function(e) {
      e.preventDefault();