import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import {toast} from "react-toastify";

const initialState = {
	loading: false,
	coins: null,
	scores: null
}

export const getCoins = createAsyncThunk(
	'ranking/getCoins',
	async (params, thunkAPI) => {
		try {
			const res = await $axios.get(`/users/coin/`, {params})
			return res.data
		} catch (err) {
			// toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
)

export const getScores = createAsyncThunk(
	'ranking/getScores',
	async (params, thunkAPI) => {
		try {
			const res = await $axios.get(`/users/score/`, {params})
			return res.data
		} catch (err) {
			// toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
)

export const updateRank = createAsyncThunk(
	'ranking/updateRank',
	async (data, thunkAPI) => {
		try {
			return await $axios.patch(`/users/${data.type}/`, data.data)
		} catch (err) {
			// toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
)

const rankingSlice = createSlice({
	name: 'ranking',
	initialState,
	extraReducers: (builder) => {
		// getCoins
		builder
			.addCase(getCoins.pending, state => {
				state.loading = true
			})
			.addCase(getCoins.fulfilled, (state, {payload}) => {
				state.coins = payload
				state.loading = false
			})
			.addCase(getCoins.rejected, (state) => {
				state.coins = null
				state.loading = false
			})
		
		// getScores
		builder
			.addCase(getScores.pending, state => {
				state.loading = true
			})
			.addCase(getScores.fulfilled, (state, {payload}) => {
				state.scores = payload
				state.loading = false
			})
			.addCase(getScores.rejected, (state) => {
				state.scores = null
				state.loading = false
			})
	}
})

export default rankingSlice.reducer