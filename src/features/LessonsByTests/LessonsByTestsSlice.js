import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import { toast } from "react-toastify";

export const getLessonsByTests = createAsyncThunk(
	"lessonsByTests/getLessonsByTests",
	async (params, thunkAPI) => {
		try {
			const response = await $axios.get('group/lesson_binding/', {params})
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getLessonsByTestDetail = createAsyncThunk(
	"lessonsByTests/getLessonsByTestDetail",
	async (id, thunkAPI) => {
		try {
			const response = await $axios.get(`group/lesson_binding/${id}/`)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const deleteLessonByTest = createAsyncThunk(
	"lessonsByTests/deleteLessonByTest",
	async (id, thunkAPI) => {
		try {
			const response = await $axios.delete(`group/lesson_binding/${id}/`)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

const lessonsByTestsSlice = createSlice({
	name: 'lessonsByTests',
	initialState: {
		loading: false,
		lessonByTestsList: null,
		lessonByTest: null
	},
	extraReducers: (builder) => {
		// getLessonsByTests
		builder.addCase(getLessonsByTests.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getLessonsByTests.fulfilled, (state, {payload}) => {
			state.lessonByTestsList = payload
			state.loading = false
		})
		builder.addCase(getLessonsByTests.rejected, (state) => {
			state.loading = false
			state.lessonByTestsList = null
		})
		
		// getLessonsByTestDetail
		builder.addCase(getLessonsByTestDetail.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getLessonsByTestDetail.fulfilled, (state, {payload}) => {
			state.lessonByTest = payload
			state.loading = false
		})
		builder.addCase(getLessonsByTestDetail.rejected, (state) => {
			state.loading = false
			state.lessonByTest = null
		})
		
		// deleteLessonByTest
		builder.addCase(deleteLessonByTest.pending, (state) => {
			state.loading = true
		})
		builder.addCase(deleteLessonByTest.fulfilled, (state, {payload}) => {
			state.loading = false
		})
		builder.addCase(deleteLessonByTest.rejected, (state) => {
			state.loading = false
		})
	}
})

export default lessonsByTestsSlice.reducer