const { body, param } = require("express-validator");

// Validator for CREATING new page content
const validateCreatePageContent = [
  body("page_name")
    .trim()
    .notEmpty()
    .withMessage("Page name is required.")
    .isLength({ max: 100 })
    .withMessage("Page name should not exceed 100 characters."),

  body("section")
    .trim()
    .notEmpty()
    .withMessage("Section is required.")
    .isLength({ max: 100 })
    .withMessage("Section should not exceed 100 characters."),

  body("component_key")
    .trim()
    .notEmpty()
    .withMessage("Component key is required.")
    .isLength({ max: 100 })
    .withMessage("Component key should not exceed 100 characters."),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required.")
    .isIn(["en", "sv"])
    .withMessage("Language must be either 'en' or 'sv'."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty."),

  body("display_order")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("Display order must be a non-negative integer."),
];

// Validator for UPDATING existing page content (by ID)
const validateUpdatePageContent = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty."),
    
  body("display_order")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("Display order must be a non-negative integer."),
];

// Validator for fetching page content by name and language from path parameters
const validatePageParams = [
  param("pageName") // Updated from "page" to match the controller
    .trim()
    .notEmpty()
    .withMessage("Page name is required in the URL.")
    .isLength({ max: 100 })
    .withMessage("Page name should not exceed 100 characters."),

  param("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required in the URL.")
    .isIn(["en", "sv"])
    .withMessage("Language must be 'en' or 'sv'.")
];

// Validator for fetching a single content item by its ID
const validateContentId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("A valid content ID must be provided as a positive integer.")
];

module.exports = {
  validateCreatePageContent,
  validateUpdatePageContent,
  validatePageParams,
  validateContentId,
};