const express = require('express');
const router = express.Router();

// SIMPLE TEST VERSION
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup attempt:', req.body);
    
    // Just return success for now
    res.status(201).json({
      message: 'User created (test)',
      token: 'test_token_' + Date.now(),
      user: {
        id: 'test_' + Date.now(),
        name: req.body.name,
        email: req.body.email,
        role: req.body.role || 'consumer'
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  res.json({
    message: 'Login successful (test)',
    token: 'test_token',
    user: {
      id: 'test_123',
      name: 'Test User',
      email: req.body.email,
      role: 'farmer'
    }
  });
});

module.exports = router;