const { body } = require("express-validator");

const validateCreateProduct = [
  body("article_no")
    .trim()
    .notEmpty()
    .withMessage("Article number is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Article number should be between 3 and 50 characters."),

  body("item_name")
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Product name should be between 2 and 255 characters."),

  body("in_price")
    .notEmpty()
    .withMessage("In price is required.")
    .isFloat({ min: 0 })
    .withMessage("In price should be a valid positive number."),

  body("out_price")
    .notEmpty()
    .withMessage("Out price is required.")
    .isFloat({ min: 0 })
    .withMessage("Out price should be a valid positive number."),

  body("unit")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Unit name should not exceed 100 characters."),

  body("in_stock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Stock should be a valid non-negative number."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description should not exceed 1000 characters."),
];

const validateUpdateProduct = [
  body("item_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("Product name should be between 2 and 255 characters."),

  body("in_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("In price should be a valid positive number."),

  body("out_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Out price should be a valid positive number."),

  body("unit")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Unit name should not exceed 100 characters."),

  body("in_stock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Stock should be a valid non-negative number."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description should not exceed 1000 characters."),
];

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};
