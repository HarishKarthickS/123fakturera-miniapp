const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { validateCreateProduct, validateUpdateProduct } = require("../validators/productValidator");
const authMiddleware = require("../middleware/authMiddleware");

// Get all products
router.get("/",authMiddleware.authenticateAdmin, productController.getAllProducts);

// Get a single product by ID
router.get("/:id",authMiddleware.authenticateAdmin, productController.getProductById);

// Admin: Add a new product
router.post("/", authMiddleware.authenticateAdmin, validateCreateProduct, productController.createProduct);

// Admin: Update an existing product
router.put("/:id", authMiddleware.authenticateAdmin, validateUpdateProduct, productController.updateProduct);

// Admin: Delete a product
router.delete("/:id", authMiddleware.authenticateAdmin, productController.deleteProduct);

module.exports = router;
