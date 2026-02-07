// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This allows you to read JSON from requests

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Stop the server if DB fails
  });

// ✅ Simple test route
app.get('/', (req, res) => {
  res.send('🚜 FarmFresh Hub API is LIVE!');
});

// ✅ Import and use Product Routes (we'll create this next)
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});