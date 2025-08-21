import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials } from '@/types';
import { authAPI } from '@/services/api';

// Simple login action
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userInfo: LoginCredentials, { rejectWithValue }) => {
    try {
      const result = await authAPI.loginUser(userInfo.email, userInfo.password);
      localStorage.setItem('userToken', result.token);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Simple logout action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logoutUser();
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Starting state
const startingState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: startingState,
  reducers: {
    // Clear any error messages
    clearError: (state) => {
      state.error = null;
    },
    // Check if user is already logged in
    checkIfLoggedIn: (state) => {
      const userToken = localStorage.getItem('userToken');
      const savedUser = localStorage.getItem('currentUser');
      if (userToken && savedUser) {
        state.isAuthenticated = true;
        state.user = JSON.parse(savedUser);
      }
    },
    // Simple logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    builder
      // When login starts
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When login succeeds
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      // When login fails
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // When logout starts
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      // When logout succeeds
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      // When logout fails
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, checkIfLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
