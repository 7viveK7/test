import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define interfaces
interface Item {
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}

interface CounterState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  data: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching data
export const fetchPosts = createAsyncThunk(
  'counter/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data.filter((item: Item) => item.id % 2 === 0);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setcurrentData: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
    },
    deleteData: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateData: (state, action: PayloadAction<Item>) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    sortingData: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.data = [...state.data].sort((a, b) =>
        action.payload === 'asc' ? a.id - b.id : b.id - a.id
      );
    },
  },
  // Add extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      // Pending state (when request starts)
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when request succeeds)
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      // Rejected state (when request fails)
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export const { setcurrentData, deleteData, updateData, sortingData } = counterSlice.actions;
export default counterSlice.reducer;