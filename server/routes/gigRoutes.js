const express = require('express');
const db = require('../db');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [gigs] = await db.query('SELECT * FROM gigs');
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/create', verifyToken, async (req, res) => {
  const { title, description, price } = req.body;
  try {
    await db.query(
      'INSERT INTO gigs (title, description, price, username) VALUES (?, ?, ?, ?)',
      [title, description, price, req.user.username]
    );
    res.json({ message: 'Gig created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
