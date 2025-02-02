import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  isTestCountOpen: true
};

export const setItemAsync = createAsyncThunk(
  'localStorage/setItemAsync',
  async (payload, { dispatch }) => {
    const { key, value } = payload;
    localStorage.setItem(key, JSON.stringify(value)); // Set localStorage
    dispatch(setItem({ key, value })); // Dispatch setItem action to update the state
    return value; // Return value so you can chain `.then()`
  }
);

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
