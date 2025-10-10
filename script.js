// =========================
// Fade-in animations for sections/cards
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(
    ".fade-in, .feature-card, .content, section, .form-card"
  );
  fadeElements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease-out";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 150);
  });
});

// =========================
// Button hover effects
// =========================
const buttons = document.querySelectorAll("button, .btn-primary, .btn-secondary");
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.boxShadow = "0 8px 20px rgba(108, 99, 255, 0.5), 0 0 10px rgba(255,255,255,0.2)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "";
  });
});

// =========================
// Input focus effects
// =========================
const inputs = document.querySelectorAll("input, textarea, select");
inputs.forEach(input => {
  input.addEventListener("focus", () => {
    input.style.borderColor = "#6C63FF";
    input.style.boxShadow = "0 0 8px rgba(108, 99, 255, 0.4)";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "";
    input.style.boxShadow = "";
  });
});

// =========================
// Smooth scroll for nav links
// =========================
const navLinks = document.querySelectorAll("nav a[href^='#']");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// =========================
// Report Form Submission
// =========================
const reportForm = document.getElementById('reportForm');
if (reportForm) {
  reportForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Report submitted successfully! 🎉');
    reportForm.reset();
  });
}

// =========================
// Search Box Live Feedback
// =========================
const searchBox = document.getElementById('searchBox');
const resultsDiv = document.getElementById('results');
if (searchBox && resultsDiv) {
  searchBox.addEventListener('input', () => {
    const query = searchBox.value.trim();
    if (query === '') {
      resultsDiv.innerHTML = '<p style="text-align:center; margin-top:20px; color:#555;">No results yet. Try searching above!</p>';
    } else {
      resultsDiv.innerHTML = `<p style="text-align:center; margin-top:20px; color:#555;">Searching for "<strong>${query}</strong>"...</p>`;
    }
  });
}

// =========================
// Contact Form Submission
// =========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! Thank you for reaching out. 📧');
    contactForm.reset();
  });
}
