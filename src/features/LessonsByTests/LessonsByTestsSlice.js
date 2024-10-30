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

export const questionsDetail = createAsyncThunk(
	"lessonsByTests/questionsDetail",
	async (params, thunkAPI) => {
		try {
			if (params?.text) {
				const res = await $axios.get(`group/lesson_binding/${params?.id}/get_lesson_questions/`, {params})
				return res.data
			} else {
				const res = await $axios.get(`group/lesson_binding/${params?.id}/get_lesson_questions/`, {params})
				return res.data
			}
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getQuestionUnused = createAsyncThunk(
	"lessonByTests/getQuestionUnused",
	async (params, thunkAPI) => {
		try {
			const response = await $axios.get('group/lesson_binding/get_not_used_lesson/', {params})
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
		lessonByTest: null,
		questionsDetail: null,
		questionsUnused: null
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
		
		// questionsDetail
		builder.addCase(questionsDetail.pending, (state) => {
			state.loading = true
		})
		builder.addCase(questionsDetail.fulfilled, (state, {payload}) => {
			state.questionDetail = payload
			state.loading = false
		})
		builder.addCase(questionsDetail.rejected, (state) => {
			state.questionDetail = null
			state.loading = false
		})
		
		// getQuestionUnused
		builder.addCase(getQuestionUnused.pending, state => {
			state.loading = true
		})
		builder.addCase(getQuestionUnused.fulfilled, (state, {payload}) => {
			state.questionsUnused = payload
			state.loading = false
		})
		builder.addCase(getQuestionUnused.rejected, state => {
			state.loading = false
			state.questionsUnused = null
		})
	}
})








export default lessonsByTestsSlice.reducer