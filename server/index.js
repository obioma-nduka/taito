const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database pool from db.js

const app = express();

// Middleware
app.use(cors({ origin: 'https://taito-client-xyz.vercel.app' })); // Allow requests from your Vercel frontend
app.use(express.json()); // Parse JSON request bodies

// Test database route
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});