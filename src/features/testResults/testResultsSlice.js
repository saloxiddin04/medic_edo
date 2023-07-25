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

export const getExplanation = createAsyncThunk(
  "testResults/getExplanation",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(`test/test_result/get_detail_test/`, {
        params,
      });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserStatisticsForAdmin = createAsyncThunk(
  "pastTest/getUserStatisticsForAdmin",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(
        `/test/test_result/${payload.id}/result_user_statistic/`
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
    explanation: {
      isFilled: false,
    },
    userStatisticsForAdmin: {
      isFilled: false,
    },
  },

  extraReducers: (builder) => {
    // Test results
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

    // Explanation
    builder.addCase(getExplanation.pending, (state) => {
      state.explanation.isFilled = false;
    });

    builder.addCase(getExplanation.fulfilled, (state, { payload }) => {
      state.explanation = payload;
      state.explanation.isFilled = true;
    });

    builder.addCase(getExplanation.rejected, (state) => {
      state.explanation.isFilled = false;
    });

    // User statistics for admin
    builder.addCase(getUserStatisticsForAdmin.pending, (state) => {
      state.userStatisticsForAdmin.isFilled = false;
    });

    builder.addCase(
      getUserStatisticsForAdmin.fulfilled,
      (state, { payload }) => {
        state.userStatisticsForAdmin = payload;
        state.userStatisticsForAdmin.isFilled = true;
      }
    );

    builder.addCase(getUserStatisticsForAdmin.rejected, (state) => {
      state.userStatisticsForAdmin.isFilled = false;
    });
  },
});

export default testResultsSlice.reducer;
