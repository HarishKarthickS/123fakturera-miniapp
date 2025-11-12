// Added authUtils mocks and updated expectations for res.json() calls
const userController = require('../controllers/userController')
const userService = require('../services/userService')

// Mock dependencies
jest.mock('../services/userService', () => ({
  registerUser: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(), // Changed from getUserById to findUserById
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  getAllUsers: jest.fn(),
  login: jest.fn(),
  getUserByRefreshToken: jest.fn(),
  saveRefreshToken: jest.fn(),
  clearRefreshToken: jest.fn()
}))
jest.mock('../utils/authUtils', () => ({
  generateAccessToken: jest.fn(() => 'mocked-access-token'),
  generateRefreshToken: jest.fn(() => 'mocked-refresh-token'),
  verifyRefreshToken: jest.fn(() => true),
  verifyAccessToken: jest.fn(() => true),
  invalidateToken: jest.fn()
}));
jest.mock('../utils/logger')
jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => 'hashedpassword'),
  compare: jest.fn(() => Promise.resolve(true))
}));

describe('User Management', () => {
  let req, res, next

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { id: 1, email: 'test@example.com' }
    }
    res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn().mockReturnThis()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('registers new user successfully', async () => {
    const userData = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123'
    }
    const createdUser = { id: 2, username: userData.username, email: userData.email }
    req.body = userData
    userService.registerUser.mockResolvedValue(createdUser)

    await userController.register(req, res, next)

    expect(userService.registerUser).toHaveBeenCalledWith(userData.username, userData.email, userData.password)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User registered successfully..',
      user: createdUser
    })
  })

  test('logs in user successfully', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    }
    const user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: 'user',
      password: 'hashedpassword' // This will be compared with bcrypt
    }
    req.body = loginData
    userService.findUserByEmail.mockResolvedValue(user)
    userService.saveRefreshToken.mockResolvedValue()

    await userController.login(req, res, next)

    expect(userService.findUserByEmail).toHaveBeenCalledWith(loginData.email)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Login successfully..',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      tokens: { accessToken: expect.any(String), refreshToken: expect.any(String) }
    })
  })

  test('gets user profile successfully', async () => {
    const user = { id: 1, email: 'test@example.com', username: 'testuser' }
    userService.findUserById.mockResolvedValue(user)

    await userController.getProfile(req, res, next)

    expect(userService.findUserById).toHaveBeenCalledWith(req.user.id)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: user
    })
  })

  test('handles user not found', async () => {
    userService.findUserById.mockResolvedValue(null)

    await userController.getProfile(req, res, next)

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: null
    })
  })

  test('refreshes token successfully', async () => {
    const refreshToken = 'old.refresh.token'
    const storedUser = { id: 1, email: 'test@example.com', username: 'testuser' }
    req.body = { refreshToken: refreshToken }
    userService.getUserByRefreshToken.mockResolvedValue(storedUser)

    await userController.refresh(req, res, next)

    expect(userService.getUserByRefreshToken).toHaveBeenCalledWith(refreshToken)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      accessToken: expect.any(String)
    })
  })

  test('logs out user successfully', async () => {
    await userController.logout(req, res, next)

    expect(userService.clearRefreshToken).toHaveBeenCalledWith(req.user.id)
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'You’ve been logged out successfully.'
    })
  })

  test('handles errors through next middleware', async () => {
    const error = new Error('Test error')
    userService.findUserById.mockRejectedValue(error)

    await userController.getProfile(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
  })
})