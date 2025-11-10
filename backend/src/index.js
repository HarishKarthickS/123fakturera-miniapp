const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./db/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const pageContentRoutes = require("./routes/pageContentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging setup
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined", { stream: logger.stream }));
  logger.info("🪵 Morgan logging enabled (production mode)");
} else {
  app.use(morgan("dev"));
  logger.info("🪵 Morgan logging enabled (development mode)");
}

// route mounts
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pages", pageContentRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend API is running 🚀" });
});

// Error handler
app.use(errorHandler);

// Startup
(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`[${new Date().toISOString()}] Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (err) {
    logger.error(`[${new Date().toISOString()}] Failed to start server: ${err.message}`);
    process.exit(1);
  }
})();
