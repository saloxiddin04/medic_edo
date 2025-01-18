import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  isTestCountOpen: true
};

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
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    toggleTestCount: state => {
      state.isTestCountOpen = !state.isTestCountOpen
    }
  },
});

export const { setItem, getItem, toggleSidebar, toggleTestCount } = localStorageSlice.actions;
export default localStorageSlice.reducer;
