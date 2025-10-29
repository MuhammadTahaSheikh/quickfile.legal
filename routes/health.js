const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

module.exports = router;



