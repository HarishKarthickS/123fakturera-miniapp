const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const MOCKED_JWT_SECRET = "test_secret";
const MOCKED_REFRESH_SECRET = "test_refresh_secret";
const MOCKED_ACCESS_TOKEN_EXPIRY = "1h";
const MOCKED_REFRESH_TOKEN_EXPIRY = "30d";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock("../utils/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

process.env.JWT_SECRET = MOCKED_JWT_SECRET;
process.env.REFRESH_SECRET = MOCKED_REFRESH_SECRET;
process.env.ACCESS_TOKEN_EXPIRY = MOCKED_ACCESS_TOKEN_EXPIRY;
process.env.REFRESH_TOKEN_EXPIRY = MOCKED_REFRESH_TOKEN_EXPIRY;
process.env.NODE_ENV = "development";

const authUtils = require("../utils/authUtils");

describe("Auth Utils", () => {
  const mockUser = { id: 1, email: "test@example.com", role: "user" };
  const mockAccessToken = "mockAccessToken";
  const mockRefreshToken = "mockRefreshToken";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateAccessToken", () => {
    it("should generate an access token", () => {
      jwt.sign.mockReturnValue(mockAccessToken);
      const token = authUtils.generateAccessToken(mockUser);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        "test_secret",
        { expiresIn: expect.any(String) }
      );
      expect(logger.info).toHaveBeenCalledWith(
        `Access token issued for ${mockUser.email}..`
      );
      expect(token).toBe(mockAccessToken);
    });
  });

  describe("generateRefreshToken", () => {
    it("should generate a refresh token", () => {
      jwt.sign.mockReturnValue(mockRefreshToken);
      const token = authUtils.generateRefreshToken(mockUser);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        "test_refresh_secret",
        { expiresIn: expect.any(String) }
      );
      expect(logger.info).toHaveBeenCalledWith(
        `Refresh token issued for ${mockUser.email}..`
      );
      expect(token).toBe(mockRefreshToken);
    });
  });

  describe("verifyAccessToken", () => {
    it("should verify an access token successfully", () => {
      jwt.verify.mockReturnValue(mockUser);
      const decoded = authUtils.verifyAccessToken(mockAccessToken);
      expect(jwt.verify).toHaveBeenCalledWith(mockAccessToken, "test_secret");
      expect(decoded).toBe(mockUser);
    });

    it("should throw an error and log a warning if access token verification fails", () => {
      const error = new Error("Invalid token");
      jwt.verify.mockImplementation(() => {
        throw error;
      });
      expect(() => authUtils.verifyAccessToken(mockAccessToken)).toThrow(error);
      expect(logger.warn).toHaveBeenCalledWith(
        `Access token verification failed: ${error.message}..`
      );
    });
  });

  describe("verifyRefreshToken", () => {
    it("should verify a refresh token successfully", () => {
      jwt.verify.mockReturnValue(mockUser);
      const decoded = authUtils.verifyRefreshToken(mockRefreshToken);
      expect(jwt.verify).toHaveBeenCalledWith(
        mockRefreshToken,
        "test_refresh_secret"
      );
      expect(decoded).toBe(mockUser);
    });

    it("should throw an error and log a warning if refresh token verification fails", () => {
      const error = new Error("Invalid refresh token");
      jwt.verify.mockImplementation(() => {
        throw error;
      });
      expect(() => authUtils.verifyRefreshToken(mockRefreshToken)).toThrow(error);
      expect(logger.warn).toHaveBeenCalledWith(
        `Refresh token verification failed: ${error.message}..`
      );
    });
  });

  describe("invalidateToken", () => {
    it("should invalidate a token successfully", async () => {
      const mockPool = {
        query: jest.fn().mockResolvedValue({ rowCount: 1 }),
      };
      const userId = 1;
      await authUtils.invalidateToken(userId, mockPool);
      expect(mockPool.query).toHaveBeenCalledWith(
        "UPDATE users SET refresh_token = NULL WHERE id = $1",
        [userId]
      );
      expect(logger.info).toHaveBeenCalledWith(
        `Refresh token invalidated for user ID ${userId}..`
      );
    });

    it("should log an error if token invalidation fails", async () => {
      const mockPool = {
        query: jest.fn().mockRejectedValue(new Error("DB error")),
      };
      const userId = 1;
      const error = new Error("DB error");
      await authUtils.invalidateToken(userId, mockPool);
      expect(logger.error).toHaveBeenCalledWith(
        `Error invalidating refresh token: ${error.message}..`
      );
    });
  });
});
