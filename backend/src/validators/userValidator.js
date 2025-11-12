const { body } = require("express-validator");

const validateRegister = [
  body("username")
    .trim()
    .notEmpty().withMessage("Please enter a username — it can’t be empty.")
    .isLength({ min: 3 }).withMessage("Your username should be at least 3 characters long."),

  body("email")
    .trim()
    .isEmail().withMessage("That doesn’t look like a valid email address."),

  body("password")
    .isLength({ min: 6 }).withMessage("Please choose a password with at least 6 characters.")
];

const validateLogin = [
  body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email to log in."),

  body("password")
    .notEmpty().withMessage("Password can’t be empty — please enter your password.")
];

const validateProfileUpdate = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Username should be at least 3 characters long."),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Please provide a valid email address."),

  body("password")
    .optional()
    .isLength({ min: 6 }).withMessage("Password should be at least 6 characters long.")
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate
};
