import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types';
import { postAPI } from '@/services/api';

interface PostsState {
  postList: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  errorMessage: string | null;
  filterByUserId: number | null;
  searchText: string;
  currentPage: number;
  postsPerPage: number;
}

// Get all posts
export const getAllPosts = createAsyncThunk(
  'posts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const postList = await postAPI.getAllPosts();
      return postList;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Could not get posts';
      return rejectWithValue(errorMessage);
    }
  }
);

// Get one post by ID
export const getPostById = createAsyncThunk(
  'posts/getById',
  async (postId: number, { rejectWithValue }) => {
    try {
      const post = await postAPI.getPostById(postId);
      return post;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Could not get post';
      return rejectWithValue(errorMessage);
    }
  }
);

// Get posts by user
export const getPostsByUser = createAsyncThunk(
  'posts/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const postList = await postAPI.getPostsByUser(userId);
      return postList;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Could not get posts';
      return rejectWithValue(errorMessage);
    }
  }
);

// Starting state
const startingState: PostsState = {
  postList: [],
  selectedPost: null,
  isLoading: false,
  errorMessage: null,
  filterByUserId: null,
  searchText: '',
  currentPage: 1,
  postsPerPage: 6,
};

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: startingState,
  reducers: {
    // Set filter by user ID
    setUserFilter: (state, action: PayloadAction<number | null>) => {
      state.filterByUserId = action.payload;
      state.currentPage = 1; // Go back to first page when filtering
    },
    // Update search text
    updateSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.currentPage = 1; // Go back to first page when searching
    },
    // Change current page
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Change posts per page
    changePostsPerPage: (state, action: PayloadAction<number>) => {
      state.postsPerPage = action.payload;
      state.currentPage = 1; // Go back to first page
    },
    // Set selected post
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    // Clear selected post
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    // Clear error message
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When getting all posts starts
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // When getting all posts succeeds
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
        state.errorMessage = null;
      })
      // When getting all posts fails
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      })
      // When getting post by ID starts
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // When getting post by ID succeeds
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPost = action.payload;
        state.errorMessage = null;
      })
      // When getting post by ID fails
      .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      })
      // When getting posts by user starts
      .addCase(getPostsByUser.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      // When getting posts by user succeeds
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
        state.errorMessage = null;
      })
      // When getting posts by user fails
      .addCase(getPostsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const {
  setUserFilter,
  updateSearchText,
  changeCurrentPage,
  changePostsPerPage,
  selectPost,
  clearSelectedPost,
  clearError,
} = postsSlice.actions;

export default postsSlice.reducer;
