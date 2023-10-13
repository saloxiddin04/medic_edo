import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import { toast } from "react-toastify";

export const createModule = createAsyncThunk(
  "modules/createModule",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.post(`/test/modul/`, payload);
      toast.success("successfully created");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createSystem = createAsyncThunk(
  "modules/createModule",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.post(`/test/sistema/`, payload);
      toast.success("successfully created");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateModule = createAsyncThunk(
  "modules/updateModule",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/test/modul/${payload.id}/`, payload);
      toast.success("successfully updated");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateSystem = createAsyncThunk(
  "modules/updateModule",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/test/sistema/${payload.id}/`, payload);
      toast.success("successfully updated");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getModules = createAsyncThunk(
  "modules/getModules",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(`test/modul/`, { params });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSystems = createAsyncThunk(
  "modules/getModules",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(`test/sistema/`, { params });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getModulesForTest = createAsyncThunk(
  "modules/getModulesForTest",
  async (_, thunkAPI) => {
    try {
      const res = await $axios.get(`test/modul/get_modules_used/`);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getModuleById = createAsyncThunk(
  "modules/getModuleById",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(`/test/modul/${id}`);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSystemById = createAsyncThunk(
  "modules/getModuleById",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(`/test/sistema/${id}`);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteModul = createAsyncThunk(
  "modules/deleteModul",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.delete(`/test/modul/${id}`);
      toast.success("successfully deleted");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteSystem = createAsyncThunk(
  "modules/deleteModul",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.delete(`/test/sistema/${id}`);
      toast.success("successfully deleted");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createTest = createAsyncThunk(
  "modules/createTest",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.post(`/test/create_test/`, payload);
      toast.success("successfully created");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateTest = createAsyncThunk(
  "modules/updateTest",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/test/create_test/${payload.get("id")}/`,
        payload
      );
      toast.success("successfully updated");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTests = createAsyncThunk(
  "modules/getTests",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(`/test/create_test/`, { params });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTestById = createAsyncThunk(
  "modules/getTestById",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(`/test/create_test/${id}/`);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteTest = createAsyncThunk(
  "modules/deleteTest",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.delete(`/test/create_test/${id}`);
      toast.success("successfully deleted");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    moduleList: [],
    moduleListForTest: [],
    modul: {},
    testList: [],
    test: {},
    isLoading: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    // get modules
    builder.addCase(getModules.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getModules.fulfilled, (state, { payload }) => {
      state.moduleList = payload;
      state.isLoading = false;
    });
    builder.addCase(getModules.rejected, (state) => {
      state.isLoading = false;
    });

    // get tests
    builder.addCase(getTests.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTests.fulfilled, (state, { payload }) => {
      state.testList = payload;
      state.isLoading = false;
    });
    builder.addCase(getTests.rejected, (state) => {
      state.isLoading = false;
    });

    // get test by id
    builder.addCase(getTestById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTestById.fulfilled, (state, { payload }) => {
      state.test = payload;
      state.isLoading = false;
    });
    builder.addCase(getTestById.rejected, (state) => {
      state.isLoading = false;
    });

    // get modul by id
    builder.addCase(getModuleById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getModuleById.fulfilled, (state, { payload }) => {
      state.modul = payload;
      state.isLoading = false;
    });
    builder.addCase(getModuleById.rejected, (state) => {
      state.isLoading = false;
    });

    // modul for test
    builder.addCase(getModulesForTest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getModulesForTest.fulfilled, (state, { payload }) => {
      state.moduleListForTest = payload;
      state.isLoading = false;
    });
    builder.addCase(getModulesForTest.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moduleSlice.reducer;
