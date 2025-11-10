const { Pool } = require("pg");
const logger = require("../utils/logger");

// Create PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER || "user",
  host: process.env.DB_HOST || "postgres",
  database: process.env.DB_NAME || "mydb",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  ssl: false, // Disabled for Docker
});

// Connect once to verify DB is reachable
const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.info(`[${new Date().toISOString()}] Connected to PostgreSQL (Docker network)`);
    client.release();
  } catch (error) {
    logger.error(`[${new Date().toISOString()}] PostgreSQL connection failed: ${error.message}`);
    throw error;
  }
};

// Simple query wrapper
const query = (text, params) => pool.query(text, params);

module.exports = {
  connectDB,
  query,
  pool,
};
