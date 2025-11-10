const jwt = require("jsonwebtoken");

const logger = require("../utils/logger");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "dev_refresh_secret";
const ACCESS_TOKEN_EXPIRY = process.env.NODE_ENV === "production" ? "15m" : "1h";
const REFRESH_TOKEN_EXPIRY = process.env.NODE_ENV === "production" ? "7d" : "30d";

// Create a short-lived access token
const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  logger.info(`Access token issued for ${user.email}`);
  return token;
};

// Create a longer-lived refresh token
const generateRefreshToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

  logger.info(`Refresh token issued for ${user.email}`);
  return token;
};

// Verify access tokens
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.warn(`Access token verification failed: ${error.message}`);
    throw error;
  }
};

// Verify refresh tokens
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    logger.warn(`Refresh token verification failed: ${error.message}`);
    throw error;
  }
};

// Invalidate refresh token (handled by DB in service layer)
const invalidateToken = async (userId, pool) => {
  try {
    await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [userId]);
    logger.info(`Refresh token invalidated for user ID ${userId}`);
  } catch (error) {
    logger.error(`Error invalidating refresh token: ${error.message}`);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  invalidateToken,
};
