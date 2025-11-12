const userService = require("../services/userService");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/authUtils");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "This email is already registered.." });
    }
    const user = await userService.registerUser(username, email, password);
    res.status(201).json({ success: true, message: "User registered successfully..", user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email.." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password. Please try again.." });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await userService.saveRefreshToken(user.id, refreshToken);
    logger.info(`User logged in: ${email}`);
    res.json({
      success: true,
      message: "Login successfully..",
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ success: false, message: "Refresh token missing.." });
    const storedUser = await userService.getUserByRefreshToken(refreshToken);
    if (!storedUser)
      return res.status(403).json({ success: false, message: "Invalid refresh token.." });
    verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken(storedUser);
    logger.info(`Access token refreshed for ${storedUser.email}..`);
    res.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.clearRefreshToken(req.user.id);
    logger.info(`User logged out: ${req.user.email}..`);
    res.json({ success: true, message: "You’ve been logged out successfully." });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const updatedUser = await userService.updateUser(req.user.id, username, email, password);
    res.json({ success: true, message: "Profile updated successfully..", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "User not found." });
    res.json({ success: true, message: "User deleted successfully.." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getProfile,
  updateProfile,
  deleteUser,
};
