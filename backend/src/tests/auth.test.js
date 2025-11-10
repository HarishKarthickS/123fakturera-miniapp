const jwt = require('jsonwebtoken')
const authUtils = require('../utils/authUtils')

jest.mock('jsonwebtoken')
jest.mock('../utils/logger')

describe('Authentication', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    role: 'user'
  }

  beforeEach(() => {
    jwt.sign.mockReturnValue('mock.jwt.token')
    jwt.verify.mockReturnValue({ id: 1, email: 'test@example.com' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('generates access token correctly', () => {
    const token = authUtils.generateAccessToken(mockUser)
    
    expect(token).toBe('mock.jwt.token')
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role
      }),
      expect.any(String),
      expect.objectContaining({ expiresIn: expect.any(String) })
    )
  })

  test('generates refresh token correctly', () => {
    const token = authUtils.generateRefreshToken(mockUser)
    
    expect(token).toBe('mock.jwt.token')
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email
      }),
      expect.any(String),
      expect.objectContaining({ expiresIn: expect.any(String) })
    )
  })

  test('verifies access token correctly', () => {
    const token = 'valid.access.token'
    const decoded = authUtils.verifyAccessToken(token)
    
    expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String))
    expect(decoded).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String)
    }))
  })

  test('verifies refresh token correctly', () => {
    const token = 'valid.refresh.token'
    const decoded = authUtils.verifyRefreshToken(token)
    
    expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String))
    expect(decoded).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String)
    }))
  })

  test('handles invalid token verification', () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token')
    })

    expect(() => {
      authUtils.verifyAccessToken('invalid.token')
    }).toThrow('Invalid token')
  })
})