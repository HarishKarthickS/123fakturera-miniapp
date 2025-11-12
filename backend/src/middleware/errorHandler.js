const { validationResult } = require("express-validator");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const formatted = validationErrors.array().map((e) => ({
      field: e.param,
      message: e.msg,
    }));
    logger.warn(`Validation failed: ${formatted.map(f => f.message).join(", ")}`);
    return res.status(400).json({
      success: false,
      type: "validation_error",
      message: "Please check the details you entered and try again..",
      errors: formatted,
    });
  }
  if (err.name === "UnauthorizedError") {
    logger.warn("Unauthorized access attempt detected..");
    return res.status(401).json({
      success: false,
      type: "authorization_error",
      message: "You’re not authorized to access this resource. Please log in first..",
    });
  }
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    logger.warn(`JWT issue: ${err.message}`);
    return res.status(401).json({
      success: false,
      type: "token_error",
      message: "Your session has expired or the token is invalid. Please sign in again..",
    });
  }

  if (err.code === "23505") {
    logger.warn("Duplicate record attempt detected");
    return res.status(400).json({
      success: false,
      type: "duplicate_error",
      message: "This record already exists. Try using a different value..",
    });
  }

  if (err.status === 404) {
    logger.warn(`Not found: ${req.originalUrl}`);
    return res.status(404).json({
      success: false,
      type: "not_found",
      message: "The resource you’re looking for doesn’t exist..",
    });
  }

  if (err.status === 400) {
    logger.warn(`Bad request: ${err.message}`);
    return res.status(400).json({
      success: false,
      type: "bad_request",
      message: err.message || "There was a problem with your request..",
    });
  }

  if (err.code && err.code.startsWith("P")) {
    logger.error(`PostgreSQL error: ${err.message}`);
    return res.status(500).json({
      success: false,
      type: "database_error",
      message: "Something went wrong while accessing the database..",
    });
  }

  logger.error(`Server error: ${err.message || "Unknown error"}`);
  if (err.stack) logger.debug(err.stack);
  res.status(err.status || 500).json({
    success: false,
    type: "server_error",
    message: err.message || "Something went wrong on our end. Please try again later..",
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
