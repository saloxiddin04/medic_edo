import {createAsyncThunk, createSlice, prepareAutoBatched} from "@reduxjs/toolkit";
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
  "modules/createSystem",
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
  "modules/updateSystem",
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
  "modules/getSystems",
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
  async (boolean, thunkAPI) => {
    try {
      const res = await $axios.get(`test/modul/get_modules_used/?unused=${boolean}`);
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSystemsForTest = createAsyncThunk(
  "modules/getSystemsForTest",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(
        `test/sistema/get_sistems_used/?unused=${params.unused}&modul_ides=${params.modul_ides.length > 0 ? [params.modul_ides] : null}`
      );
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getQuestionModeForTest = createAsyncThunk(
  "modules/getQuestionModeForTest",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get(
        `test/test_result/question_mode_get/?unused=${params.unused}&modul_ides=${params.modul_ides.length > 0 ? [params.modul_ides] : null}&sistema_ides=${params.sistema_ides.length > 0 ? [params.sistema_ides] : null}`
      );
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
  "modules/getSystemById",
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
  "modules/deleteSystem",
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

export const getGroup = createAsyncThunk(
  "modules/getTest",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get('/group/groups/', {params})
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getGroupById = createAsyncThunk(
  "modules/getGroupById",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(`/group/groups/${id}`)
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const postGroup = createAsyncThunk(
  "modules/postGroup",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.post(`/group/groups/`, params)
      toast.success("successfully created");
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateGroup = createAsyncThunk(
  "modules/updateGroup",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(
        `/group/groups/${payload.id}/`,
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

export const deleteGroup = createAsyncThunk(
  "modules/deleteGroup",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.delete(
        `/group/groups/${id}`
      );
      toast.success("successfully deleted");
      return res.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ------------------------------------------------- //
export const getGroupBinding = createAsyncThunk(
  "modules/getGroupBinding",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.get('/group/group_binding_user/', {params})
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getGroupBindingById = createAsyncThunk(
  "modules/getGroupBindingById",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.get(`/group/group_binding_user/${id}/`)
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const postGroupBinding = createAsyncThunk(
  "modules/postGroup",
  async (params, thunkAPI) => {
    try {
      const res = await $axios.post(`/group/group_binding_user/`, params)
      toast.success("successfully created");
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateGroupBinding = createAsyncThunk(
  "modules/updateGroupBinding",
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/group/group_binding_user/${payload.id}/`, payload?.data)
      toast.success("successfully updated");
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const deleteGroupBinding = createAsyncThunk(
  "modules/deleteGroupBinding",
  async (id, thunkAPI) => {
    try {
      const res = await $axios.delete(`/group/group_binding_user/${id}`)
      toast.success("successfully deleted");
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getUsersGroupBinding = createAsyncThunk(
  "modules/getUsersGroupBinding",
  async (_, thunkAPI) => {
    try {
      const res = await $axios.get(`/group/group_binding_user/get_group_not_joined_users/`)
      return res.data
    }catch (err) {
      toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    moduleList: [],
    systemList: [],
    groupList: [],
    groupBindingList: [],
    moduleListForTest: [],
    systemListForTest: [],
    questionModeList: [],
    modul: {},
    system: {},
    testList: [],
    test: {},
    group: {},
    groupBinding: {},
    groupBindingUsers: [],
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
    
    // get systems
    builder.addCase(getSystems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSystems.fulfilled, (state, { payload }) => {
      state.systemList = payload;
      state.isLoading = false;
    });
    builder.addCase(getSystems.rejected, (state) => {
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
    
    // get system by id
    builder.addCase(getSystemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSystemById.fulfilled, (state, { payload }) => {
      state.system = payload;
      state.isLoading = false;
    });
    builder.addCase(getSystemById.rejected, (state) => {
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
    
    // system for test
    builder.addCase(getSystemsForTest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSystemsForTest.fulfilled, (state, { payload }) => {
      state.systemListForTest = payload;
      state.isLoading = false;
    });
    builder.addCase(getSystemsForTest.rejected, (state) => {
      state.isLoading = false;
    });
    
    // question mode for test
    builder.addCase(getQuestionModeForTest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQuestionModeForTest.fulfilled, (state, { payload }) => {
      state.questionModeList = payload;
      state.isLoading = false;
    });
    builder.addCase(getQuestionModeForTest.rejected, (state) => {
      state.isLoading = false;
    });
    
    // group
    builder.addCase(getGroup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getGroup.fulfilled, (state, {payload}) => {
      state.groupList = payload
      state.isLoading = false
    })
    builder.addCase(getGroup.rejected, (state) => {
      state.isLoading = false;
    });
    
    // group by id
    builder.addCase(getGroupById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getGroupById.fulfilled, (state, {payload}) => {
      state.group = payload
      state.isLoading = false
    })
    builder.addCase(getGroupById.rejected, (state) => {
      state.isLoading = false;
    });
    
    // group binding by id
    builder.addCase(getGroupBindingById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getGroupBindingById.fulfilled, (state, {payload}) => {
      state.groupBinding = payload
      state.isLoading = false
    })
    builder.addCase(getGroupBindingById.rejected, (state) => {
      state.isLoading = false;
    });
    
    // group
    builder.addCase(getGroupBinding.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getGroupBinding.fulfilled, (state, {payload}) => {
      state.groupBindingList = payload
      state.isLoading = false
    })
    builder.addCase(getGroupBinding.rejected, (state) => {
      state.isLoading = false;
    });
    
    // group binding users
    builder.addCase(getUsersGroupBinding.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUsersGroupBinding.fulfilled, (state, {payload}) => {
      state.groupBindingUsers = payload
      state.isLoading = false
    })
    builder.addCase(getUsersGroupBinding.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moduleSlice.reducer;
