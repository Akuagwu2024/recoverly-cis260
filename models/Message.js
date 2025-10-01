// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  name: { type: String, required: true, maxlength: 80 },
  email: { type: String, required: true, maxlength: 120 },
  message: { type: String, required: true, maxlength: 2000 }
}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);

