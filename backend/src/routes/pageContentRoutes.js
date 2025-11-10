const express = require("express");
const router = express.Router();

const pageContentController = require("../controllers/pageContentController");

const { 
  validateCreatePageContent, 
  validateUpdatePageContent, 
  validatePageParams, 
  validateContentId 
} = require("../validators/pageContentValidator");

const authMiddleware = require("../middleware/authMiddleware");

// Get content for a specific page and language
router.get("/:pageName/:language", validatePageParams, pageContentController.getPageContent);

// Admin: Get all page content
router.get("/", authMiddleware.authenticateAdmin, pageContentController.getAllPageContent);

// Admin: Create new page content
router.post("/", authMiddleware.authenticateAdmin, validateCreatePageContent, pageContentController.createPageContent);

// Admin: Update existing page content
router.put("/:id", authMiddleware.authenticateAdmin, validateContentId, validateUpdatePageContent, pageContentController.updatePageContent);

// Admin: Delete page content
router.delete("/:id", authMiddleware.authenticateAdmin, validateContentId, pageContentController.deletePageContent);

module.exports = router;