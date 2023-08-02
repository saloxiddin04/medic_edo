import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    seconds: JSON.parse(sessionStorage.getItem("timerState"))?.seconds || 3600,
    startTime: null,
  },
  reducers: {
    startTimer: (state) => {
      state.startTime = Date.now();
    },
    tick: (state) => {
      if (state.seconds > 0) {
        state.seconds -= 1;
      }
    },
    resetTimer: (state) => {
      state.seconds = 3600;
      state.startTime = null;
    },
  },
});

export const { startTimer, tick, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
