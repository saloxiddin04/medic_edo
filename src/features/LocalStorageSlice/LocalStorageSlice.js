import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    setItem: (state, action) => {
      const { key, value } = action.payload;
      localStorage.setItem(key, JSON.stringify(value));
      state[key] = value;
    },
    getItem: (state, action) => {
      const { key } = action.payload;
      const item = localStorage.getItem(key);
      state[key] = item ? JSON.parse(item) : null;
    },
  },
});

export const { setItem, getItem } = localStorageSlice.actions;
export default localStorageSlice.reducer;
