// routes/messages.js
import { Router } from "express";
import { z } from "zod";
import Message from "../models/Message.js";
import Item from "../models/Item.js";

const router = Router();

const createMessageSchema = z.object({
  itemId: z.string().min(1),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(5).max(2000)
});

router.post("/", async (req, res) => {
  const parsed = createMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
  }
  const { itemId, name, email, message } = parsed.data;

  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const saved = await Message.create({ itemId, name, email, message });

    // NOTE: You can integrate email here later (e.g., SendGrid/Mailgun).
    // For class scope, we just persist the message.

    return res.status(201).json({ ok: true, id: saved._id });
  } catch (e) {
    return res.status(500).json({ error: "Failed to save message" });
  }
});

// (Optional) list messages for an item — could be admin-only
router.get("/by-item/:itemId", async (req, res) => {
  try {
    const docs = await Message.find({ itemId: req.params.itemId }).sort({ createdAt: -1 });
    return res.json({ messages: docs });
  } catch (e) {
    return res.status(400).json({ error: "Invalid item id" });
  }
});

export default router;

