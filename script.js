document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Helpers
  // =========================
  function getReports() {
    return JSON.parse(localStorage.getItem("reports")) || [];
  }
  function setReports(reports) {
    localStorage.setItem("reports", JSON.stringify(reports));
  }
  function isCccEmail(email) {
    return typeof email === "string" && email.trim().toLowerCase().endsWith("@ccc.edu");
  }
  function getSemesterCounter() {
    return parseInt(localStorage.getItem("semesterReunited") || "0", 10);
  }
  function setSemesterCounter(n) {
    localStorage.setItem("semesterReunited", String(n));
  }

  // =========================
  // Report Form Submission
  // =========================
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = reportForm.reportEmail ? reportForm.reportEmail.value.trim() : "";
      const verified = email ? isCccEmail(email) : false;

      if (email && !verified) {
        alert("Please use a valid @ccc.edu email for verification, or leave it blank.");
        return;
      }

      const newReport = {
        itemName: reportForm.itemName.value.trim(),
        status: reportForm.status.value,
        description: reportForm.description.value.trim(),
        location: reportForm.location.value.trim(),
        campus: reportForm.campus ? reportForm.campus.value : "",
        category: reportForm.category ? reportForm.category.value : "other",
        emailVerified: verified,
        reunited: false,
        createdAt: Date.now()
      };

      const existingReports = getReports();
      existingReports.push(newReport);
      setReports(existingReports);

      alert("Your report has been submitted.");
      reportForm.reset();
    });
  }

  // =========================
  // Contact Form Submission (CCC email nudge)
  // =========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("email");
      const email = emailInput ? emailInput.value.trim() : "";

      if (email && !isCccEmail(email)) {
        alert("Tip: Use your @ccc.edu email so staff can verify you're part of CCC.");
      } else {
        alert("Thanks for your message. We'll be in touch.");
      }

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
  const campusFilter = document.getElementById("campusFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  function renderResults() {
    const storedReports = getReports();
    const query = searchBox ? searchBox.value.trim().toLowerCase() : "";
    const status = statusFilter ? statusFilter.value : "all";
    const sort = sortOrder ? sortOrder.value : "asc";
    const campus = campusFilter ? campusFilter.value : "all";
    const category = categoryFilter ? categoryFilter.value : "all";

    let filtered = storedReports.filter((item) =>
      item.itemName.toLowerCase().includes(query)
    );

    if (status !== "all") {
      filtered = filtered.filter((item) => (status === "reunited" ? item.reunited : item.status === status));
    }
    if (campus !== "all") {
      filtered = filtered.filter((item) => item.campus === campus);
    }
    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (sort === "asc") {
      filtered.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else {
      filtered.sort((a, b) => b.itemName.localeCompare(a.itemName));
    }

    if (!resultsDiv) return;
    resultsDiv.innerHTML = "";

    if (filtered.length === 0) {
      const safeQuery = query || "your search";
      resultsDiv.innerHTML = `<p style="text-align:center; color:#555;">No matches found for "<strong>${safeQuery}</strong>".</p>`;
    } else {
      const list = document.createElement("ul");
      list.style.listStyle = "none";
      list.style.padding = "0";

      filtered.forEach((item) => {
        const li = document.createElement("li");
        li.className = "item-card";
        li.innerHTML = `
          <strong>${item.itemName}</strong> ${item.reunited ? '(reunited)' : `(${item.status})`}<br>
          <em>${item.description}</em><br>
          <span class="item-meta">Location: ${item.location} • Campus: ${item.campus || 'N/A'} • Category: ${item.category || 'other'}</span>
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
    if (campusFilter) campusFilter.addEventListener("change", renderResults);
    if (categoryFilter) categoryFilter.addEventListener("change", renderResults);
    renderResults();
  }

  // =========================
  // Dashboard rendering and actions
  // =========================
  const dashResults = document.getElementById("dashResults");
  const campusFilterDash = document.getElementById("campusFilter");
  const categoryFilterDash = document.getElementById("categoryFilter");
  const statusFilterDash = document.getElementById("statusFilterDash");

  function renderDashboard() {
    if (!dashResults) return;
    const reports = getReports();

    const campus = campusFilterDash ? campusFilterDash.value : "all";
    const category = categoryFilterDash ? categoryFilterDash.value : "all";
    const status = statusFilterDash ? statusFilterDash.value : "all";

    let filtered = reports.slice();

    if (campus !== "all") filtered = filtered.filter(r => r.campus === campus);
    if (category !== "all") filtered = filtered.filter(r => r.category === category);
    if (status !== "all") {
      filtered = filtered.filter(r => {
        if (status === "reunited") return r.reunited === true;
        return r.status === status && r.reunited !== true;
      });
    }

    dashResults.innerHTML = "";
    if (filtered.length === 0) {
      dashResults.innerHTML = `<p style="text-align:center; color:#555;">No items found for selected filters.</p>`;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        <strong>${item.itemName}</strong> ${item.reunited ? '(reunited)' : `(${item.status})`}<br>
        <em>${item.description}</em><br>
        <span class="item-meta">Location: ${item.location} • Campus: ${item.campus || 'N/A'} • Category: ${item.category || 'other'}</span>
        <div class="item-actions">
          <button class="mark-reunited">Mark reunited</button>
          <button class="delete-item" style="margin-left:8px;">Delete</button>
        </div>
      `;

      const reportsIndex = reports.findIndex(r =>
        r.itemName === item.itemName &&
        r.description === item.description &&
        r.location === item.location &&
        r.createdAt === item.createdAt
      );

      const markBtn = card.querySelector(".mark-reunited");
      markBtn.addEventListener("click", () => {
        const currentReports = getReports();
        if (reportsIndex > -1) {
          const wasReunited = currentReports[reportsIndex].reunited === true;
          currentReports[reportsIndex].reunited = true;
          setReports(currentReports);
          if (!wasReunited) {
            setSemesterCounter(getSemesterCounter() + 1);
          }
        }
        renderDashboard();
        updateCounterDisplay();
      });

      const delBtn = card.querySelector(".delete-item");
      delBtn.addEventListener("click", () => {
        const currentReports = getReports();
        if (reportsIndex > -1) {
          currentReports.splice(reportsIndex, 1);
          setReports(currentReports);
        }
        renderDashboard();
        render