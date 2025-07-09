const express = require('express');
const router = express.Router();

// Temporary basic routes to prevent server crash
router.post('/register', (req, res) => {
  res.json({ message: 'Register route - coming soon' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login route - coming soon' });
});

router.get('/profile', (req, res) => {
  res.json({ message: 'Profile route - coming soon' });
});

module.exports = router;