const express = require("express");
const router = express.Router();
const pageContentController = require("../controllers/pageContentController");
const {validateCreatePageContent,validateUpdatePageContent,validatePageParams,validateContentId} = require("../validators/pageContentValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:pageName/:language", validatePageParams, pageContentController.getPageContent);
router.get("/", authMiddleware.authenticateAdmin, pageContentController.getAllPageContent);
router.post("/", authMiddleware.authenticateAdmin, validateCreatePageContent, pageContentController.createPageContent);
router.put("/:id", authMiddleware.authenticateAdmin, validateContentId, validateUpdatePageContent, pageContentController.updatePageContent);
router.delete("/:id", authMiddleware.authenticateAdmin, validateContentId, pageContentController.deletePageContent);

module.exports = router;