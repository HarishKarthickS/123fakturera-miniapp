const { createLogger, format, transports } = require("winston");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

// Custom format for Docker logs
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] : ${message}`;
});

// Create Winston logger
const logger = createLogger({
  level: isProduction ? "info" : "debug",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      stderrLevels: ["error"],
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
      maxsize: 5 * 1024 * 1024,
      maxFiles: 3,
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Morgan uses this stream for HTTP logging
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

// Log init message
logger.info(`🚀 Logger initialized in ${isProduction ? "production" : "development"} mode`);

module.exports = logger;
