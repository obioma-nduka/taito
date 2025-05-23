const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow local frontend
app.use(express.json());

// Test database route
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!['customer', 'freelancer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, username, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Gigs route
app.get('/api/gigs', async (req, res) => {
  try {
    const [gigs] = await db.query('SELECT * FROM gigs');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});