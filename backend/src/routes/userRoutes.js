const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateRegister, validateLogin, validateProfileUpdate } = require("../validators/userValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", validateRegister, userController.register);
router.post("/login", validateLogin, userController.login);
router.post("/refresh", userController.refresh);
router.post("/logout", authMiddleware.authenticateUser, userController.logout);
router.get("/", authMiddleware.authenticateUser, userController.getProfile);
router.put("/", authMiddleware.authenticateUser, validateProfileUpdate, userController.updateProfile);
router.delete("/:id", authMiddleware.authenticateAdmin , userController.deleteUser);

module.exports = router;
