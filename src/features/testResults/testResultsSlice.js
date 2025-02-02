import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import {toast} from "react-toastify";

export const getTestResults = createAsyncThunk(
  "testResults/getTestResults",
  async (data, thunkAPI) => {
    try {
      if (data?.state?.is_lesson !== undefined) {
        const res = await $axios.get(
          `test/test_result/${data?.id}/result_worning_answers_statistic_by_lessons/`
        );
        return res.data
      } else {
        const res = await $axios.get(
          `test/test_result/${data?.id}/result_worning_answers_statistic/`
        );
        return res.data
      }
    } catch (err) {
      // toast.error(err.message);
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
      // toast.error(err.message);
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
      // toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTopFiveStudents = createAsyncThunk(
  'pastTest/getTopFiveStudents',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(
        '/test/test_result/top_five_students/'
      )
      return res.data
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const getUserTestHistory = createAsyncThunk(
  "pastTest/getUserTestHistory",
  async (payload, thunkAPI) => {
    try {
      if (payload?.openTab === 0) {
        const res = await $axios.get(
          `/test/test_result/${payload.id}/user_result_history/`
        );
        return res.data;
      } else {
        const res = await $axios.get(
          `/test/test_result/${payload.id}/user_result_history_by_lessons/`
        );
        return res.data;
      }
    } catch (err) {
      // toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserTestHistoryForGroup = createAsyncThunk(
  "pastTest/getUserTestHistoryForGroup",
  async (payload, thunkAPI) => {
    try {
      if (payload.page) {
        const res = await $axios.get(
          `/test/test_result/${payload.id}/user_result_history_for_group/?page_size=10&page=${payload.page}`
        );
        return res.data;
      } else {
        const res = await $axios.get(
          `/test/test_result/${payload.id}/user_result_history_for_group/`
        );
        return res.data;
      }
    } catch (err) {
      // toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTopModules = createAsyncThunk(
  'pastTest/getTopModules',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(
        '/test/test_result/top_activ_moduls/'
      )
      return res.data
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const patchTestResult = createAsyncThunk(
  'pastTest/patchTestResult',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/test/test_result/${payload.id}/result_user_statistic_patch/`, {
        user_id: payload.user_id
      })
      return res.data
    } catch (err) {
      // toast.error(err.message)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const allResultModules = createAsyncThunk(
  'pastTest/allTestResultModules',
  async (payload, thunkAPI) => {
    try {
      if (payload?.user_id || payload?.modul_id) {
        const res = await $axios.get(
          `/test/test_result/all_moduls_graph/?user_id=${payload.user_id}&modul_id=${payload.modul_id}`,
        )
        return res.data
      } else {
        const res = await $axios.get(
          `/test/test_result/all_moduls_graph/`,
        )
        return res.data
      }
    } catch (e) {
      console.log(e)
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const getUserResultCompare = createAsyncThunk(
  'pastTest/getUserResultCompare',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(
        `/test/test_result/${payload.id}/user_result_compare/`
      )
      return res.data
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const getModules = createAsyncThunk(
  'pastTest/getModules',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(
        '/test/modul/?page_size=1000'
      )
      return res.data
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const getUsers = createAsyncThunk(
  'pastTest/getUsers',
  async (params, thunkAPI) => {
    try {
      if (params) {
        const res = await $axios.get('/users/register/', {params})
        return res.data
      } else {
        const res = await $axios.get('/users/register/?page_size=10000')
        return res.data
      }
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'pastTest/deleteUser',
  async (payload, thunkAPI) => {
    try {
      await $axios.delete(`/users/register/${payload}`)
    } catch (e) {
      // toast.error(e.message)
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async (params, thunkAPI) => {
    try {
      if (params) {
        const res = await $axios.get(`/users/register/?search=${params}`)
        return res.data
      } else {
        const res = await $axios.get(`/users/register/${params}`, {params})
        return res.data
      }
    } catch (err) {
      // toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
)

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
    userTestHistory: {
      isFilled: false
    },
    userTestHistoryForGroup: {
      isFilled: false
    },
    loading: false
  },
  
  extraReducers: (builder) => {
    // Test results
    builder.addCase(getTestResults.pending, (state) => {
      state.testResults.isFilled = false;
    });
    
    builder.addCase(getTestResults.fulfilled, (state, {payload}) => {
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
    
    builder.addCase(getExplanation.fulfilled, (state, {payload}) => {
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
      (state, {payload}) => {
        state.userStatisticsForAdmin = payload;
        state.userStatisticsForAdmin.isFilled = true;
      }
    );
    
    builder.addCase(getUserStatisticsForAdmin.rejected, (state) => {
      state.userStatisticsForAdmin.isFilled = false;
    });
    
    // get top five students
    builder.addCase(getTopFiveStudents.pending, (state) => {
      state.loading = true
    })
    
    builder.addCase(getTopFiveStudents.fulfilled,
      (state, {payload}) => {
        state.topFiveStudents = payload
        state.loading = false
      }
    )
    
    builder.addCase(getTopFiveStudents.rejected, (state) => {
      state.loading = false
    })
    
    // get top modules
    builder.addCase(getTopModules.pending, (state) => {
      state.loading = true
    })
    
    builder.addCase(getTopModules.fulfilled,
      (state, {payload}) => {
        state.topModules = payload
        state.loading = false
      }
    )
    
    builder.addCase(getTopModules.rejected, (state) => {
      state.loading = false
    })
    
    // User test history
    builder.addCase(getUserTestHistory.pending, (state) => {
      state.userTestHistory.isFilled = false
    })
    
    builder.addCase(getUserTestHistory.fulfilled, (state, {payload}) => {
      state.userTestHistory = payload
      state.userTestHistory.isFilled = true
    })
    
    builder.addCase(getUserTestHistory.rejected, (state) => {
      state.userTestHistory.isFilled = false;
    });

    // User test history for group
    builder.addCase(getUserTestHistoryForGroup.pending, (state) => {
      state.userTestHistoryForGroup.isFilled = false
    })

    builder.addCase(getUserTestHistoryForGroup.fulfilled, (state, {payload}) => {
      state.userTestHistoryForGroup = payload
      state.userTestHistoryForGroup.isFilled = true
    })

    builder.addCase(getUserTestHistoryForGroup.rejected, (state) => {
      state.userTestHistoryForGroup.isFilled = false;
    });
    
    // get all modules result
    builder.addCase(allResultModules.pending, (state) => {
      state.loading = true
    })
    builder.addCase(allResultModules.fulfilled,
      (state, {payload}) => {
        state.loading = false
        state.allTestResultModules = payload
      }
    )
    builder.addCase(allResultModules.rejected, (state) => {
      state.loading = false
    })
    
    // get modules
    builder.addCase(getModules.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getModules.fulfilled,
      (state, {payload}) => {
        state.modules = payload
        state.loading = false
      }
    )
    builder.addCase(getModules.rejected, (state) => {
      state.loading = false
    })
    
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUsers.fulfilled,
      (state, {payload}) => {
        state.users = payload
        state.loading = false
      }
    )
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false
    })
    
    // search user
    builder.addCase(searchUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(searchUser.fulfilled, (state, {payload}) => {
      state.loading = false
      state.users = payload
    })
    builder.addCase(searchUser.rejected, (state) => {
      state.loading = false
    })
    
    // get user result compare
    builder.addCase(getUserResultCompare.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUserResultCompare.fulfilled, (state, {payload}) => {
      state.loading = false
      state.userResultCompare = payload
    })
    builder.addCase(getUserResultCompare.rejected, (state) => {
      state.loading = false
    })
  },
});

export default testResultsSlice.reducer;
