import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";

const initialState = {
	loading: false,
	attendance: null
}

export const getAttendance = createAsyncThunk(
	"attendance/getAttendance",
	async (params) => {
		try {
			const response = await $axios.get('users/attendance/', {params})
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const postAttendance = createAsyncThunk(
	"attendance/postAttendance",
	async (data) => {
		try {
			const response = await $axios.post('users/attendance/', data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const patchAttendance = createAsyncThunk(
	"attendance/patchAttendance",
	async (data) => {
		try {
			const response = await $axios.patch(`users/attendance/${data.id}/`, data.data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	extraReducers: builder => {
		// getAttendance
		builder
			.addCase(getAttendance.pending, (state) => {
				state.loading = true
			})
			.addCase(getAttendance.fulfilled, (state, {payload}) => {
				state.attendance = payload
				state.loading = false
			})
			.addCase(getAttendance.rejected, (state) => {
				state.loading = false
				state.attendance = null
			})
		
		// postAttendance
		builder
			.addCase(postAttendance.pending, (state) => {
				state.loading = true
			})
			.addCase(postAttendance.fulfilled, (state) => {
				state.loading = false
			})
			.addCase(postAttendance.rejected, (state) => {
				state.loading = false
			})
		
		// patchAttendance
		builder
			.addCase(patchAttendance.pending, (state) => {
				state.loading = true
			})
			.addCase(patchAttendance.fulfilled, (state) => {
				state.loading = false
			})
			.addCase(patchAttendance.rejected, (state) => {
				state.loading = false
			})
	}
})

export default attendanceSlice.reducer