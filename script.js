document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("reportForm");
  const contactForm = document.getElementById("contactForm");
  const searchBox = document.getElementById("searchBox");
  const resultsDiv = document.getElementById("results");

  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Your report has been submitted.");
      reportForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for your message. We'll be in touch.");
      contactForm.reset();
    });
  }

  if (searchBox && resultsDiv) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.trim();
      if (query === "") {
        resultsDiv.innerHTML =
          '<p style="text-align:center; margin-top:20px; color:#555;">No results yet. Try searching above.</p>';
      } else {
        resultsDiv.innerHTML = `<p style="text-align:center; margin-top:20px; color:#555;">Searching for "<strong>${query}</strong>"...</p>`;
      }
    });
  }
});