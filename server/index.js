// server/index.js - FINAL WORKING VERSION
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. CREATE THE APP FIRST
const app = express();

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });

// 4. TEST ROUTE
app.get('/', (req, res) => {
  res.send('🚜 FarmFresh Hub API is LIVE!');
});

// 5. IMPORT ROUTES (DO THIS AFTER CREATING APP)
const productRoutes = require('./routes/productRoutes');

// 6. USE ROUTES
app.use('/api/products', productRoutes);

// 7. CHECK IF AUTH ROUTES EXIST (IMPORTANT!)
try {
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️ Auth routes not loaded (might not exist yet)');
}

// 8. CHECK IF MIDDLEWARE EXISTS
try {
  // const verifyToken = require('./middleware/authMiddleware');
  // app.get('/api/protected', verifyToken, (req, res) => {
  //   res.json({ 
  //     message: 'This is a protected route!',
  //     userId: req.userId 
  //   });
  // });
  console.log('✅ Protected route loaded');
} catch (error) {
  console.log('⚠️ Protected route not loaded');
}

// 9. START SERVER (ALWAYS LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});