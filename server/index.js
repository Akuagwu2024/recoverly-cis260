// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import 'dotenv/config';

import itemsRouter from "../routes/items.js";
import messagesRouter from "../routes/messages.js";
import healthRouter from "../routes/health.js";

const app = express();

// --- Basic Security / Middleware ---
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173","http://localhost:3000"],
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "..", "public")));
//app.get("/.*/", (req, res, next) => {
  // only send index.html for non-API routes
//  if (_req.path.startsWith("/api")) return next();
//  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
//});

const limiter = rateLimit({
  windowMs: 60_000, // 1 min
  limit: 120,       // 120 req/min
});
app.use(limiter);

// --- Routes ---
app.use("/api/health", healthRouter);
app.use("/api/items", itemsRouter);
app.use("/api/messages", messagesRouter);

// --- DB + Server ---
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/recoverly";

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: process.env.MONGO_DB || "recoverly" });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

