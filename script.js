(function () {
  'use strict';

  var REPORTS_KEY = 'recoverly_reports_v1';
  var MESSAGES_KEY = 'recoverly_messages_v1';

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback || [];
      return JSON.parse(raw);
    } catch (e) {
      console.error('readJson error', e);
      return fallback || [];
    }
  }

  function writeJson(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('writeJson error', e);
    }
  }

  function esc(text) {
    if (!text && text !== 0) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function insertHtml(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }

  function init() {
    try {
      initReportPage();
      initSearchPage();
      initContactPage();
    } catch (e) {
      // pages without elements will simply skip
    }
  }

  // REPORT page
  function initReportPage() {
    var form = document.getElementById('reportForm');
    if (!form) return;

    renderRecentReports();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var itemName = form.itemName.value.trim();
      var status = form.status.value;
      var description = form.description.value.trim();
      var location = form.location.value.trim();
      var reporter = form.reporter.value.trim();
      var contact = form.contact.value.trim();

      if (!itemName || !status || !reporter || !contact) {
        alert('Please complete required fields: item, status, your name, and contact.');
        return;
      }

      if (description.length > 600) description = description.substring(0, 600);

      var reports = readJson(REPORTS_KEY, []);
      var now = new Date().toISOString();
      var entry = {
        id: 'r' + Date.now(),
        itemName: itemName,
        status: status,
        description: description,
        location: location,
        reporter: reporter,
        contact: contact,
        createdAt: now
      };

      reports.unshift(entry);
      writeJson(REPORTS_KEY, reports);

      form.reset();
      renderRecentReports();
      alert('Report saved locally. Check Search to find it.');
    });

    var clearBtn = document.getElementById('clearReports');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Remove all saved reports from this browser?')) {
          writeJson(REPORTS_KEY, []);
          renderRecentReports();
        }
      });
    }
  }

  function renderRecentReports() {
    var box = document.getElementById('recentList');
    if (!box) return;
    var reports = readJson(REPORTS_KEY, []);
    if (!reports.length) {
      insertHtml(box, '<p class="small">No reports yet.</p>');
      return;
    }
    var out = reports.map(function (r) {
      var time = new Date(r.createdAt).toLocaleString();
      return '<div class="item">' +
        '<h4>' + esc(r.itemName) + ' <small>(' + esc(r.status) + ')</small></h4>' +
        '<p>' + esc(r.description) + '</p>' +
        '<p class="small">Location: ' + esc(r.location || 'N/A') + ' • By ' + esc(r.reporter) + ' • ' + esc(r.contact) + ' • ' + esc(time) + '</p>' +
        '</div>';
    }).join('');
    insertHtml(box, out);
  }

  // SEARCH page
  function initSearchPage() {
    var box = document.getElementById('searchBox');
    var results = document.getElementById('results');
    if (!box || !results) return;

    box.addEventListener('input', function () {
      var q = box.value.toLowerCase().trim();
      var reports = readJson(REPORTS_KEY, []);
      if (!q) {
        insertHtml(results, '<p class="small">No results yet.</p>');
        return;
      }
      var matched = reports.filter(function (r) {
        var hay = (r.itemName + ' ' + r.description + ' ' + r.location + ' ' + r.status).toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      if (!matched.length) {
        insertHtml(results, '<p class="small">No matches for "' + esc(q) + '".</p>');
        return;
      }

      var out = matched.map(function (r) {
        return '<div class="item">' +
          '<h4>' + esc(r.itemName) + ' <small>(' + esc(r.status) + ')</small></h4>' +
          '<p>' + esc(r.description) + '</p>' +
          '<p class="small">Location: ' + esc(r.location || 'N/A') + ' • ' + esc(r.reporter) + ' • ' + esc(r.contact) + '</p>' +
          '</div>';
      }).join('');
      insertHtml(results, out);
    });
  }

  // CONTACT page
  function initContactPage() {
    var form = document.getElementById('contactForm');
    if (!form) {
      renderMessages();
      return;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Please complete all fields before sending.');
        return;
      }

      if (message.length > 1000) message = message.substring(0, 1000);

      var msgs = readJson(MESSAGES_KEY, []);
      msgs.unshift({
        id: 'm' + Date.now(),
        name: name,
        email: email,
        message: message,
        createdAt: new Date().toISOString()
      });
      writeJson(MESSAGES_KEY, msgs);

      form.reset();
      renderMessages();
      alert('Message saved locally. Thank you.');
    });

    var clear = document.getElementById('clearMessages');
    if (clear) {
      clear.addEventListener('click', function () {
        if (confirm('Remove all local messages?')) {
          writeJson(MESSAGES_KEY, []);
          renderMessages();
        }
      });
    }

    renderMessages();
  }

  function renderMessages() {
    var box = document.getElementById('messagesList');
    if (!box) return;
    var msgs = readJson(MESSAGES_KEY, []);
    if (!msgs.length) {
      insertHtml(box, '<p class="small">No messages yet.</p>');
      return;
    }
    var out = msgs.map(function (m) {
      var t = new Date(m.createdAt).toLocaleString();
      return '<div class="item"><h4>' + esc(m.name) + ' <small>' + esc(t) + '</small></h4>' +
        '<p>' + esc(m.message) + '</p>' +
        '<p class="small">Contact: ' + esc(m.email) + '</p></div>';
    }).join('');
    insertHtml(box, out);
  }

  document.addEventListener('DOMContentLoaded', init);
})();