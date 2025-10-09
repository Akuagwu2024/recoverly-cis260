import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// ➕ Add new item
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;