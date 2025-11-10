const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateRegister, validateLogin, validateProfileUpdate } = require("../validators/userValidator");
const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", validateRegister, userController.register);

// Login
router.post("/login", validateLogin, userController.login);

// Refresh token
router.post("/refresh", userController.refresh);

// Logout
router.post("/logout", authMiddleware.authenticateUser, userController.logout);

// Get profile
router.get("/me", authMiddleware.authenticateUser, userController.getProfile);

// Update profile
router.put("/me", authMiddleware.authenticateUser, validateProfileUpdate, userController.updateProfile);

// Delete user (admin only — handled in auth middleware)
router.delete("/:id", authMiddleware.authenticateAdmin , userController.deleteUser);

module.exports = router;
