import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import { toast } from "react-toastify";
import axiosIns from "../../plugins/axios";

export const getUserDetail = createAsyncThunk(
  'user/getUserDetail',
  async (params, thunkAPI) => {
    try {
      if (params?.id) {
        const res = await $axios.get(`/users/register/${params.id}/`, {params})
        return res.data
      }
    } catch (err) {
      // toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export const patchUserDetail = createAsyncThunk(
  'user/patchUserDetail',
  async (payload, thunkAPI) => {
    try {
      const res = await $axios.patch(`/users/register/${payload.id}/`, payload)
      if (res) {
        toast.success('Profile updated successfully!')
      }
      return res.data
    } catch (err) {
      if (err.response.data.name) {
        toast.error(err.response.data.name[0])
      } else if (err.response.data.username) {
        toast.error(err.response.data.username[0])
      } else if (err.response.data.email) {
        toast.error(err.response.data.email[0])
      } else {
        toast.error(err.message)
      }
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export const getCoinAndScore = createAsyncThunk(
  "user/getCoinAndScore",
  async () => {
    try {
      const response = await axiosIns.get("/users/coin_and_score/")
      return response.data
    } catch (e) {
      return e;
    }
  }
)

const userDetailSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
    coin: null,
    score: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // getCoinAndScore
    builder.addCase(getCoinAndScore.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCoinAndScore.fulfilled, (state, {payload}) => {
      state.loading = false
      state.coin = payload?.coin
      state.score = payload?.score
    })
    builder.addCase(getCoinAndScore.rejected, (state) => {
      state.loading = false
    })
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