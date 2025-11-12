const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateCreateProduct, validateUpdateProduct } = require("../validators/productValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/",authMiddleware.authenticateUser, productController.getAllProducts);
router.get("/:id",authMiddleware.authenticateAdmin, productController.getProductById);
router.post("/", authMiddleware.authenticateAdmin, validateCreateProduct, productController.createProduct);
router.put("/:id", authMiddleware.authenticateAdmin, validateUpdateProduct, productController.updateProduct);
router.delete("/:id", authMiddleware.authenticateAdmin, productController.deleteProduct);

module.exports = router;
