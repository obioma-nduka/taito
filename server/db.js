const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env

// Create a connection pool for better performance and connection management
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default to 3306 if not specified
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0 // Unlimited queueing
});

// Test the connection and export the pool
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to Google Cloud SQL MySQL database');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit if connection fails
  }
})();

module.exports = pool;