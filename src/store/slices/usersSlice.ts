import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { userAPI } from '@/services/api';

interface UsersState {
  userList: User[];
  selectedUser: User | null;
  isLoading: boolean;
  errorMessage: string | null;
  searchText: string;
  currentPage: number;
  usersPerPage: number;
}

// Get all users
export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const userList = await userAPI.getAllUsers();
      return userList;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Could not get users';
      return rejectWithValue(errorMessage);
    }
  }
);

// Get one user by ID
export const getUserById = createAsyncThunk(
  'users/getById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const user = await userAPI.getUserById(userId);
      return user;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Could not get user';
      return rejectWithValue(errorMessage);
    }
  }
);

// Starting state
const startingState: UsersState = {
  userList: [],
  selectedUser: null,
  isLoading: false,
  errorMessage: null,
  searchText: '',
  currentPage: 1,
  usersPerPage: 5,
};

// Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: startingState,
  reducers: {
    // Update search text
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1; // Go back to first page when searching
    },
    // Change current page
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Change users per page
    changeUsersPerPage: (state, action: PayloadAction<number>) => {
      state.usersPerPage = action.payload;
      state.currentPage = 1; // Go back to first page
    },
    // Clear selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    // Clear error message
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When getting all users starts
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // When getting all users succeeds
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
        state.errorMessage = null;
      })
      // When getting all users fails
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      })
      // When getting user by ID starts
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // When getting user by ID succeeds
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
        state.errorMessage = null;
      })
      // When getting user by ID fails
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  updateSearchText,
  changeCurrentPage,
  changeUsersPerPage,
  clearSelectedUser,
  clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
