// models/Item.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false });

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 2000 },
  category: { type: String, enum: ["electronics", "clothing", "keys", "id", "pet", "other"], default: "other" },
  status: { type: String, enum: ["lost", "found"], required: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  photoUrl: { type: String },
  date: { type: Date, default: Date.now },
  location: LocationSchema,
  contactEmail: { type: String, required: true },
  contactPhone: { type: String }
}, { timestamps: true });

ItemSchema.index({ title: "text", description: "text", tags: 1, category: 1, status: 1 });

export default mongoose.model("Item", ItemSchema);

