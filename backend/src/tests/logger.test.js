const logger = require("../utils/logger");
const { transports } = require("winston");

// Mock winston transports to prevent actual file writing during tests
jest.mock("winston", () => {
  const mFormat = {
    printf: jest.fn((fn) => fn),
    combine: jest.fn((...args) => args),
    timestamp: jest.fn(() => "mocked-timestamp-format"),
  };
  const mTransports = {
    Console: jest.fn(function (options) {
      this.options = options;
      return this; // Ensure the constructor returns 'this'
    }),
    File: jest.fn(function (options) {
      this.options = options;
      return this; // Ensure the constructor returns 'this'
    }),
  };
  return {
    createLogger: jest.fn((options) => ({
      level: options.level, // Dynamically set the level based on options
      format: options.format,
      transports: options.transports,
      exitOnError: options.exitOnError,
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      stream: {
        write: jest.fn(),
      },
    })),
    format: mFormat,
    transports: mTransports,
  };
});

describe("Logger", () => {
  let originalNodeEnv;

  beforeAll(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  beforeEach(() => {
    // Reset modules before each test to ensure clean state
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalNodeEnv; // Reset to original value
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("should initialize logger in development mode", () => {
    process.env.NODE_ENV = "development";
    // Re-apply mockImplementation after resetModules
    transports.Console.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    transports.File.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    const devLogger = require("../utils/logger");

    expect(devLogger.level).toBe("debug");
    expect(devLogger.info).toHaveBeenCalledWith(
      "Logger initialized in development mode"
    );
    expect(transports.Console).toHaveBeenCalledTimes(1);
    const consoleTransportInstance = transports.Console.mock.results[0].value;
    expect(consoleTransportInstance.options).toEqual({
      handleExceptions: true,
      stderrLevels: ["error"],
    });
    expect(transports.File).toHaveBeenCalledTimes(2); // For error.log and combined.log
  });

  it("should initialize logger in production mode", () => {
    process.env.NODE_ENV = "production";
    jest.resetModules(); // Reset all modules to clear cache
    // Re-apply mockImplementation after resetModules
    const winston = require('winston');
    winston.transports.Console.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    winston.transports.File.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    const prodLogger = require("../utils/logger");

    expect(prodLogger.level).toBe("info");
    expect(prodLogger.info).toHaveBeenCalledWith(
      "Logger initialized in production mode"
    );
    expect(winston.transports.Console).toHaveBeenCalledTimes(1);
    const consoleTransportInstance = winston.transports.Console.mock.results[0].value;
    expect(consoleTransportInstance.options).toEqual({
      handleExceptions: true,
      stderrLevels: ["error"],
    });
    expect(winston.transports.File).toHaveBeenCalledTimes(2); // For error.log and combined.log
  });

  it("should write messages to stream using logger.info", () => {
    process.env.NODE_ENV = "development";
    // Re-apply mockImplementation after resetModules
    transports.Console.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    transports.File.mockImplementation(function (options) {
      this.options = options;
      return this;
    });
    const testLogger = require("../utils/logger");

    const message = "Test message for stream";
    testLogger.stream.write(message + "\n"); // Simulate morgan adding newline

    expect(testLogger.info).toHaveBeenCalledWith(message);
  });
});
