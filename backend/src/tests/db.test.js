const { connectDB, pool } = require("../db/db");
const logger = require("../utils/logger");

jest.mock("pg", () => {
  const mockPool = {
    connect: jest.fn(),
  };
  return { Pool: jest.fn(() => mockPool) };
});

jest.mock("../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("Database Connection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to PostgreSQL successfully", async () => {
    const mockClient = { release: jest.fn() };
    pool.connect.mockResolvedValue(mockClient);

    await connectDB();

    expect(pool.connect).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Connected to PostgreSQL (Docker network)")
    );
    expect(mockClient.release).toHaveBeenCalledTimes(1);
  });

  it("should log an error and throw if PostgreSQL connection fails", async () => {
    const errorMessage = "Connection failed";
    pool.connect.mockRejectedValue(new Error(errorMessage));

    await expect(connectDB()).rejects.toThrow(errorMessage);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(`PostgreSQL connection failed: ${errorMessage}`)
    );
  });
});
