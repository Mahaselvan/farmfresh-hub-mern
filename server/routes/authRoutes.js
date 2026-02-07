const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    console.log('📝 Signup attempt for:', req.body.email);
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    
    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Create user (plain password for now)
    const user = new User({
      name,
      email,
      password,
      role: req.body.role || 'consumer'
    });
    
    await user.save();
    console.log('✅ User saved:', email);
    
    res.status(201).json({
      message: 'Signup successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/auth/login  
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      message: 'Login successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;