//database connections
// db.js
const { Pool } = require('pg');

// Create a pool (connection to the database)
const pool = new Pool({
  user: 'public',
  host: 'localhost',
  database: 'postgres',
  password: 'admin123',
  port: 5432,  // Default PostgreSQL port
});

module.exports = pool;
