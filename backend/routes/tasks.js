const express = require('express');
const router = express.Router();

// Temporary basic routes to prevent server crash
router.get('/', (req, res) => {
  res.json({ message: 'Tasks route - coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create task route - coming soon' });
});

module.exports = router;