import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import { toast } from "react-toastify";

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.get(`/users/register/${payload}/`)
      return res.data
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export const patchUserDetail = createAsyncThunk(
  'user/patchUserDetail',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/users/register/${payload.id}/`, {
        username: payload.username,
        name: payload.name,
        password: payload.password
      })
      console.log(payload)
      return res.data
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
)

const userDetailSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    // get user detail
    builder.addCase(getUserDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUserDetail.fulfilled, (state, {payload}) => {
      state.loading = false
      state.user = payload
    })
    builder.addCase(getUserDetail.rejected, (state) => {
      state.loading = false
    })

    // patch user detail
    builder.addCase(patchUserDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(patchUserDetail.fulfilled, (state, {payload}) => {
      state.loading = false
      state.user = payload
    })
    builder.addCase(patchUserDetail.rejected, (state) => {
      state.loading = false
    })
  }
})

export default userDetailSlice.reducer