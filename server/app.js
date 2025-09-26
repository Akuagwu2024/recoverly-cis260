// CIS 260 Project – Recoverly: Lost & Found Hub
// Author: Zitta Gardell Norwood
// Purpose: This file sets up the Express server and connects to MongoDB
// Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import and use routes
const lostItemsRouter = require('./routes/lostItems');
app.use('/api/lost-items', lostItemsRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

