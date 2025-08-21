import { configureStore } from '@reduxjs/toolkit'
import usersReducer, { getAllUsers, setSearchTerm, setCurrentPage } from '../usersSlice'

// Mock the API service
jest.mock('../../../services/api', () => ({
  userAPI: {
    getAllUsers: jest.fn(),
  },
}))

describe('usersSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: usersReducer,
      },
    })
  })

  it('should handle initial state', () => {
    const state = store.getState().users
    expect(state.users).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
    expect(state.searchTerm).toBe('')
    expect(state.currentPage).toBe(1)
    expect(state.usersPerPage).toBe(5)
  })

  it('should handle setSearchTerm', () => {
    store.dispatch(setSearchTerm('john'))
    const state = store.getState().users
    expect(state.searchTerm).toBe('john')
    expect(state.currentPage).toBe(1) // Should reset to page 1
  })

  it('should handle setCurrentPage', () => {
    store.dispatch(setCurrentPage(3))
    const state = store.getState().users
    expect(state.currentPage).toBe(3)
  })

  it('should handle getAllUsers.pending', () => {
    store.dispatch(getAllUsers.pending('', undefined))
    const state = store.getState().users
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle getAllUsers.fulfilled', () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]

    store.dispatch(getAllUsers.fulfilled(mockUsers, '', undefined))
    const state = store.getState().users
    expect(state.loading).toBe(false)
    expect(state.users).toEqual(mockUsers)
    expect(state.error).toBe(null)
  })

  it('should handle getAllUsers.rejected', () => {
    const errorMessage = 'Failed to fetch users'
    store.dispatch(getAllUsers.rejected(new Error(errorMessage), '', undefined))
    const state = store.getState().users
    expect(state.loading).toBe(false)
    expect(state.error).toBe(errorMessage)
  })
})
