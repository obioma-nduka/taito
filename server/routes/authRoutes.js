const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, email, password, role } = req.body;
  if (!['customer', 'freelancer'].includes(role))
    return res.status(400).json({ message: 'Invalid role' });

  const hashed = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, username, email, hashed, role]
    );
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  if (!rows.length || !(await bcrypt.compare(password, rows[0].password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: rows[0].id, role: rows[0].role, username: rows[0].username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, role: rows[0].role });
});

module.exports = router;
