import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define TypeScript interface for the data items if using TypeScript
interface Item {
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}

interface CounterState {
  data: Item[];
}

const initialState: CounterState = {
  data: [],
};

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
});


export const { setcurrentData, deleteData, updateData, sortingData } = counterSlice.actions;
export default counterSlice.reducer;