// -----------------------------
// Report Form Handling
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const itemName = document.getElementById("itemName").value.trim();
      const status = document.getElementById("status").value;
      const campus = document.getElementById("campus").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value.trim();
      const location = document.getElementById("location").value.trim();
      const email = document.getElementById("reportEmail").value.trim();

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
});

// -----------------------------
// Search Page Handling
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const statusFilter = document.getElementById("statusFilter");
  const campusFilter = document.getElementById("campusFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOrder = document.getElementById("sortOrder");
  const results = document.getElementById("results");

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

    if (results) {
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
  }

  if (searchBox) searchBox.addEventListener("input", renderResults);
  if (statusFilter) statusFilter.addEventListener("change", renderResults);
  if (campusFilter) campusFilter.addEventListener("change", renderResults);
  if (categoryFilter) categoryFilter.addEventListener("change", renderResults);
  if (sortOrder) sortOrder.addEventListener("change", renderResults);

  renderResults();
});

// -----------------------------
// Dashboard Page Handling
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const dashboard = document.getElementById("dashboardItems");
  if (dashboard) {
    let items = JSON.parse(localStorage.getItem("items")) || [];

    function renderDashboard() {
      dashboard.innerHTML = "";
      if (items.length === 0) {
        dashboard.innerHTML = "<p>No reports yet.</p>";
      } else {
        items.forEach((item, index) => {
          const div = document.createElement("div");
          div.className = "item-card";
          div.innerHTML = `
            <h3>${item.itemName}</h3>
            <p class="item-meta">${item.status} | ${item.campus} | ${item.category}</p>
            <p>${item.description}</p>
            <p><em>Last seen: ${item.location}</em></p>
            <p><small>Reported: ${item.date}</small></p>
            <div class="item-actions">
              <button class="mark-reunited">Mark Reunited</button>
              <button class="delete-item">Delete</button>
            </div>
          `;
          div.querySelector(".mark-reunited").addEventListener("click", () => {
            item.status = "reunited";
            localStorage.setItem("items", JSON.stringify(items));
            incrementCounter();
            renderDashboard();
          });
          div.querySelector(".delete-item").addEventListener("click", () => {
            items.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(items));
            renderDashboard();
          });
          dashboard.appendChild(div);
        });
      }
    }

    renderDashboard();
  }
});

// -----------------------------
// Community Counter
// -----------------------------
function incrementCounter() {
  let count = parseInt(localStorage.getItem("reunitedCount") || "0", 10);
  count++;
  localStorage.setItem("reunitedCount", count);
  const counter = document.getElementById("semesterCounter");
  if (counter) counter.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("semesterCounter");
  if (counter) {
    counter.textContent = localStorage.getItem("reunitedCount") || "0";
  }
});

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

// Show "About" by default on homepage
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("about")) {
    openSection("about");
  }
});