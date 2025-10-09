// Report Form Submission (simulated)
const reportForm = document.getElementById('reportForm');
if(reportForm) {
  reportForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Report submitted successfully! 🎉');
    reportForm.reset();
  });
}

// Search Form (static demo)
const searchForm = document.getElementById('searchForm');
if(searchForm) {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('This is a static demo. Search feature can be implemented later.');
  });
}