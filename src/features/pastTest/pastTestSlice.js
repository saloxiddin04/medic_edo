import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import {toast} from "react-toastify";
import {setItem} from "../LocalStorageSlice/LocalStorageSlice";

export const startTest = createAsyncThunk(
  "pastTest/startTestPost",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.post(`/test/test_result/start_test/`, payload);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTestsById = createAsyncThunk(
  "pastTest/getTestsById",
  async (data, thunkAPI) => {
    try {
      if (data.id !== undefined) {
        const res = await $axios.get(`/test/test_result/${data.id}/start_test_get/${data.is_reload !== undefined ? '?/is_reload=true' : ''}`);
        return res.data;
      }
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getExactTest = createAsyncThunk(
  "pastTest/getExactTest",
  async (params, thunkAPI) => {
    try {
      if (params.id) {
        const res = await $axios.get(`test/test_result/get_detail_test/?id=${params.id}&test_id=${params.test_id}`);
        return res.data;
      }
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const submitTheAnswer = createAsyncThunk(
  "pastTest/startTest",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/test/test_result/${payload.id}/test_check/`,
        payload
      );
      setItem({key: "testID", value: res.data.id});
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const submitMarked = createAsyncThunk(
  "pastTest/marked",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/test/test_result/${payload?.id}/mark_check/`,
        payload
      );
      return res.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const submitSelectQuestion = createAsyncThunk(
  "pastTest/selected",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/test/test_result/${payload?.id}/select_yellow_text/`,
        payload
      );
      return res.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchLineOption = createAsyncThunk(
  'pastTest/line',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/test/test_result/strike_effect/`,
        payload
      )
      return res.data
    } catch (e) {
      toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

const pastTestSlice = createSlice({
  name: "pastTest",
  initialState: {
    loading: false,
    answer: null,
    question: null,
    error: null,
    testList: {
      isFilled: false,
    },
    exactTest: {
      isFilled: false,
    },
  },
  
  reducers: {
    clearAnswer: (state) => {
      state.answer = null;
    },
  },
  
  extraReducers: (builder) => {
    // get test
    builder.addCase(getTestsById.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(getTestsById.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.testList = payload;
      state.testList.isFilled = true;
    });
    builder.addCase(getTestsById.rejected, (state) => {
      state.testList.isFilled = false;
      state.loading = false;
    });
    
    // get exact test
    builder.addCase(getExactTest.pending, (state) => {
      state.loading = true;
      state.exactTest.isFilled = false;
    });
    builder.addCase(getExactTest.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.exactTest.isFilled = true;
      state.question = payload;
    });
    builder.addCase(getExactTest.rejected, (state) => {
      state.loading = false;
      state.exactTest.isFilled = false;
    });
    
    // submitTheAnswer
    builder.addCase(submitTheAnswer.pending, (state, {payload}) => {
      state.loading = true;
    });
    builder.addCase(submitTheAnswer.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.answer = payload;
    });
    builder.addCase(submitTheAnswer.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.answer = null;
    });
    
    // patch for line-through
    builder.addCase(patchLineOption.pending, (state) => {
      state.loading = true
    })
    builder.addCase(patchLineOption.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(patchLineOption.rejected, (state) => {
      state.loading = false
    })
  },
});
export const {clearAnswer} = pastTestSlice.actions;
export default pastTestSlice.reducer;
