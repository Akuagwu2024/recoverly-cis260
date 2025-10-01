// routes/items.js
import { Router } from "express";
import { z } from "zod";
import Item from "../models/Item.js";

const router = Router();

// Zod schemas
const createItemSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(5).max(2000),
  category: z.enum(["electronics","clothing","keys","id","pet","other"]).optional(),
  status: z.enum(["lost","found"]),
  tags: z.array(z.string().min(1)).optional().default([]),
  photoUrl: z.string().url().optional(),
  date: z.coerce.date().optional(),
  location: z.object({
    address: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional()
});

const listQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["lost","found"]).optional(),
  category: z.enum(["electronics","clothing","keys","id","pet","other"]).optional(),
  tag: z.string().optional(),
  since: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12)
});

// Create item
router.post("/", async (req, res) => {
  const parsed = createItemSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }
  try {
    const doc = await Item.create(parsed.data);
    return res.status(201).json(doc);
  } catch (e) {
    return res.status(500).json({ error: "Failed to create item" });
  }
});

// List / search items
router.get("/", async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query", details: parsed.error.flatten() });
  }
  const { q, status, category, tag, since, until, page, limit } = parsed.data;

  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (since || until) {
    filter.date = {};
    if (since) filter.date.$gte = since;
    if (until) filter.date.$lte = until;
  }

  let query = Item.find(filter).sort({ createdAt: -1 });

  if (q) {
    // Use text search if index exists
    query = Item.find({ $text: { $search: q }, ...filter }).sort({ score: { $meta: "textScore" } });
  }

  try {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      query.skip(skip).limit(limit).exec(),
      Item.countDocuments(filter)
    ]);
    return res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Get single item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Update item (partial)
router.patch("/:id", async (req, res) => {
  const parsed = createItemSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

export default router;

