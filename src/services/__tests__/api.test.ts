import { userAPI, postAPI, authAPI } from '../api'

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('userAPI', () => {
    it('should have getAllUsers method', () => {
      expect(typeof userAPI.getAllUsers).toBe('function')
    })

    it('should have getUserById method', () => {
      expect(typeof userAPI.getUserById).toBe('function')
    })
  })

  describe('postAPI', () => {
    it('should have getAllPosts method', () => {
      expect(typeof postAPI.getAllPosts).toBe('function')
    })

    it('should have getPostById method', () => {
      expect(typeof postAPI.getPostById).toBe('function')
    })

    it('should have getPostsByUser method', () => {
      expect(typeof postAPI.getPostsByUser).toBe('function')
    })
  })

  describe('authAPI', () => {
    it('should login with correct credentials', async () => {
      const result = await authAPI.loginUser('admin@example.com', 'password')

      expect(result).toHaveProperty('token')
      expect(result).toHaveProperty('user')
      expect(result.user.email).toBe('admin@example.com')
    })

    it('should reject with wrong credentials', async () => {
      await expect(authAPI.loginUser('wrong@email.com', 'wrongpassword'))
        .rejects.toThrow('Invalid credentials')
    })

    it('should logout user', async () => {
      await expect(authAPI.logoutUser()).resolves.toBeUndefined()
    })
  })
})
