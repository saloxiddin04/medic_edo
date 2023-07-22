import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import { toast } from "react-toastify";

export const getTestResults = createAsyncThunk(
  "testResults/getTestResults",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(
        `test/test_result/${id}/result_worning_answers_statistic/`
      );
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const testResultsSlice = createSlice({
  name: "testResults",
  initialState: {
    testResults: {
      isFilled: false,
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTestResults.pending, (state) => {
      state.testResults.isFilled = false;
    });

    builder.addCase(getTestResults.fulfilled, (state, { payload }) => {
      state.testResults = payload;
      state.testResults.isFilled = true;
    });

    builder.addCase(getTestResults.rejected, (state) => {
      state.testResults.isFilled = false;
    });
  },
});

export default testResultsSlice.reducer;
