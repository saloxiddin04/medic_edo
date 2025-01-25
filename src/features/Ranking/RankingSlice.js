import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import {toast} from "react-toastify";

const initialState = {
	loading: false,
	coins: [],
	scores: [],
	coinsPagination: {
		currentPage: 1,
		per_page: null,
	},
	scoresPagination: {
		currentPage: 1,
		per_page: null,
	},
	currentUser: null,
};

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
			.addCase(getCoins.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCoins.fulfilled, (state, { payload }) => {
				const { data, current_page, total, current_user, per_page } = payload;
				
				state.currentUser = current_user; // Update `current_user`
				state.coins = current_page === 1 ? data : [...state.coins, ...data]; // Append or replace
				
				state.coinsPagination.currentPage = current_page;
				state.coinsPagination.per_page = per_page; // Check if there's more data
				
				state.loading = false;
			})
			.addCase(getCoins.rejected, (state) => {
				state.loading = false;
			});
		
		// getScores
		builder
			.addCase(getScores.pending, (state) => {
				state.loading = true;
			})
			.addCase(getScores.fulfilled, (state, { payload }) => {
				const { data, current_page, total, current_user, per_page } = payload;
				
				state.currentUser = current_user; // Update `current_user`
				state.scores = current_page === 1 ? data : [...state.scores, ...data]; // Append or replace
				
				state.scoresPagination.currentPage = current_page;
				state.scoresPagination.per_page = per_page; // Check if there's more data
				
				state.loading = false;
			})
			.addCase(getScores.rejected, (state) => {
				state.loading = false;
			});
	}
})

export default rankingSlice.reducer