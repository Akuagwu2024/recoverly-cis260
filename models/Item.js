import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["Lost", "Found"], default: "Lost" },
  location: String,
  date: String,
  photo: String
});

export default mongoose.model("Item", itemSchema);