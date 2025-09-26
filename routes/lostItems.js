// routes/lostItems.js
const express = require('express');
const router = express.Router();

// Test route for lost items
router.get('/', (req, res) => {
  res.send('Lost items route is working!');
});

module.exports = router;