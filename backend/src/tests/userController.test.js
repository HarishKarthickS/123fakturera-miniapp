// Fixed mockResponse and updated expectations for res.json() calls
const userController = require("../controllers/userController");
const userService = require("../services/userService");

jest.mock("../services/userService", () => ({
  registerUser: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  getAllUsers: jest.fn(),
  getUserByRefreshToken: jest.fn(),
  saveRefreshToken: jest.fn(),
  clearRefreshToken: jest.fn(),
}));

jest.mock('../utils/authUtils', () => ({
  generateAccessToken: jest.fn(() => 'mocked-access-token'),
  generateRefreshToken: jest.fn(() => 'mocked-refresh-token'),
  verifyRefreshToken: jest.fn(() => true),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => 'hashedpassword'),
  compare: jest.fn(() => Promise.resolve(true))
}));

const mockRequest = (body = {}, user = null, params = {}) => ({
  body,
  user,
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockImplementation(() => res);
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockNext = jest.fn();

describe("User Controller", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    require('../utils/authUtils').generateAccessToken.mockImplementation(() => 'fake-access-token');
    require('../utils/authUtils').generateRefreshToken.mockImplementation(() => 'fake-refresh-token');
    require('../utils/authUtils').verifyRefreshToken.mockImplementation(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a user and return 201", async () => {
      const req = mockRequest({ email: "test@example.com" });
      const res = mockResponse();
      const user = { id: 1, email: "test@example.com" };
      userService.registerUser.mockResolvedValue(user);

      await userController.register(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User registered successfully..",
        user,
      });
    });

    it("should handle registration failure", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const error = new Error("Registration failed");
      userService.registerUser.mockRejectedValue(error);

      await userController.register(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("loginUser", () => {
    it("should login a user and return tokens", async () => {
      const req = mockRequest({ email: "test@example.com", password: "password123" });
      const res = mockResponse();
      const user = { 
        id: 1, 
        email: "test@example.com", 
        username: "testuser", 
        password: "hashedpassword", 
        role: "user" 
      };
      userService.findUserByEmail.mockResolvedValue(user);
      userService.saveRefreshToken.mockResolvedValue();

      await userController.login(req, res, mockNext);

      expect(userService.findUserByEmail).toHaveBeenCalledWith("test@example.com");
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Login successfully..",
        user: { id: 1, username: "testuser", email: "test@example.com", role: "user" },
        tokens: { accessToken: "fake-access-token", refreshToken: "fake-refresh-token" },
      });
    });

    it("should handle login failure", async () => {
      const req = mockRequest({ email: "test@example.com", password: "wrongpassword" });
      const res = mockResponse();
      userService.findUserByEmail.mockResolvedValue(null); // User not found

      await userController.login(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404); // User not found returns 404
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "No account found with this email.."
      });
    });
  });

  describe("refreshToken", () => {
    it("should refresh the token and return new tokens", async () => {
      const req = mockRequest({ refreshToken: "validtoken" });
      const res = mockResponse();
      const storedUser = { id: 1, email: "test@example.com", username: "testuser" };
      userService.getUserByRefreshToken.mockResolvedValue(storedUser);

      await userController.refresh(req, res, mockNext);

      expect(userService.getUserByRefreshToken).toHaveBeenCalledWith("validtoken");
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        accessToken: expect.any(String),
      });
    });

    it("should handle token refresh failure", async () => {
      const req = mockRequest({ refreshToken: "invalidtoken" });
      const res = mockResponse();
      userService.getUserByRefreshToken.mockResolvedValue(null); // Token not found

      await userController.refresh(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(403); // Invalid token returns 403
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid refresh token.."
      });
    });
  });

  describe("logoutUser", () => {
    it("should logout a user", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();

      await userController.logout(req, res, mockNext);

      expect(userService.clearRefreshToken).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "You’ve been logged out successfully.",
      });
    });

    it("should handle logout failure", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();
      const error = new Error("Logout failed");
      userService.clearRefreshToken.mockRejectedValue(error);

      await userController.logout(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getUserProfile", () => {
    it("should get user profile", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();
      const user = { id: 1, email: "test@example.com" };
      userService.findUserById.mockResolvedValue(user);

      await userController.getProfile(req, res, mockNext);

      expect(userService.findUserById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user,
      });
    });

    it("should handle user not found", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();
      userService.findUserById.mockResolvedValue(null);

      await userController.getProfile(req, res, mockNext);

      expect(userService.findUserById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: null,
      });
    });

    it("should handle profile fetch failure", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();
      const error = new Error("Fetch failed");
      userService.findUserById.mockRejectedValue(error);

      await userController.getProfile(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("updateUserProfile", () => {
    it("should update user profile", async () => {
      const req = mockRequest(
        { username: "New Name" },
        { id: 1, email: "test@example.com" }
      );
      const res = mockResponse();
      const updatedUser = { id: 1, username: "New Name", email: "test@example.com" };
      userService.updateUser.mockResolvedValue(updatedUser);

      await userController.updateProfile(req, res, mockNext);

      expect(userService.updateUser).toHaveBeenCalledWith(1, "New Name", undefined, undefined);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Profile updated successfully..",
        user: updatedUser,
      });
    });

    it("should handle profile update failure", async () => {
      const req = mockRequest({}, { id: 1, email: "test@example.com" });
      const res = mockResponse();
      const error = new Error("Update failed");
      userService.updateUser.mockRejectedValue(error);

      await userController.updateProfile(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });



  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      userService.deleteUser.mockResolvedValue(true); // Return true for successful deletion

      await userController.deleteUser(req, res, mockNext);

      expect(userService.deleteUser).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User deleted successfully..",
      });
    });

    it("should handle delete user failure", async () => {
      const req = mockRequest({}, null, { id: 1 });
      const res = mockResponse();
      userService.deleteUser.mockResolvedValue(false); // Return false for user not found

      await userController.deleteUser(req, res, mockNext);

      expect(userService.deleteUser).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User not found."
      });
    });
  });
});
