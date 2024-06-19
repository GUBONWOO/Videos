'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  progress: number;
  reactProgress: number;
  vueProgress: number;
  selectedCategory: string;
}

const initialState: ProgressState = {
  progress: 0,
  reactProgress: 0,
  vueProgress: 0,
  selectedCategory: '전체',
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setReactProgress: (state, action: PayloadAction<number>) => {
      state.reactProgress = action.payload;
    },
    setVueProgress: (state, action: PayloadAction<number>) => {
      state.vueProgress = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setProgress,
  setReactProgress,
  setVueProgress,
  setSelectedCategory,
} = progressSlice.actions;

export default progressSlice.reducer;
