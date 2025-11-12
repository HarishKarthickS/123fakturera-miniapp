const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please log in to continue..",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    logger.info(`User authenticated: ${decoded.email}..`);
    next();
  } catch (error) {
    logger.warn(`Token validation failed: ${error.message}..`);
    const message =
      error.name === "TokenExpiredError"
        ? "Your session has expired. Please log in again.."
        : "Invalid authentication token. Please sign in again..";
    res.status(401).json({
      success: false,
      message,
    });
  }
};

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please log in as an admin..",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You don’t have permission to perform this action..",
      });
    }
    req.user = decoded;
    logger.info(`Admin authenticated: ${decoded.email}..`);
    next();
  } catch (error) {
    logger.warn(`Admin authentication failed: ${error.message}..`);
    res.status(401).json({
      success: false,
      message:
        "Your admin session is invalid or expired. Please sign in again..",
    });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
