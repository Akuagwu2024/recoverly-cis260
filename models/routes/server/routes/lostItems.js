/**
 * This route handles creating lost items in the Recoverly app.
 * It receives POST requests and saves lost item data to MongoDB.
 *
 * Author: Akuagwu2024
 */

const express = require('express');
const router = express.Router();
const LostItem = require('../../models/LostItem');

// POST /api/lost-items — create a new lost item
router.post('/', async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;