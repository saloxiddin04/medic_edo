import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $axios from "../../plugins/axios";
import {toast} from "react-toastify";

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

export const createLessonBinding = createAsyncThunk(
	"lessonByTests/createLessonByTests",
	async (data, thunkAPI) => {
		try {
			const response = await $axios.post('group/lesson_binding/', data)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const patchLessonBinding = createAsyncThunk(
	"lessonByTests/patchLessonByTests",
	async (data, thunkAPI) => {
		try {
			const response = await $axios.patch(`group/lesson_binding/${data.id}/`, data.data)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getResultUserStatistic = createAsyncThunk(
	"lessonByTests/getResultUserStatistic",
	async (id, thunkAPI) => {
		try {
			const response = await $axios.get(`test/test_result/${id}/result_user_statistic_by_lessons/`)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getTopFiveStudentsLesson = createAsyncThunk(
	"lessonByTests/getTopFiveStudentsLesson",
	async (payload, thunkAPI) => {
		try {
			const response = await $axios.get('test/test_result/top_five_students_by_lessons/')
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getTopModulesLesson = createAsyncThunk(
	"lessonByTests/getTopModulesLesson",
	async (_, thunkAPI) => {
		try {
			const response = await $axios.get('test/test_result/top_activ_moduls_by_lessons/')
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getUserResultHistoryLesson = createAsyncThunk(
	"lessonByTests/getUserResultHistoryLesson",
	async (id, thunkAPI) => {
		try {
			const response = await $axios.get(`test/test_result/${id}/user_result_history_by_lessons/`)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const allResultModulesLesson = createAsyncThunk(
	"lessonByTests/allResultModulesLesson",
	async (params, thunkAPI) => {
		try {
			const response = await $axios.get(`test/test_result/all_moduls_graph_by_lessons/`, {params})
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getUserResultCompareLesson = createAsyncThunk(
	"lessonByTests/getUserResultCompareLesson",
	async (id, thunkAPI) => {
		try {
			const response = await $axios.get(`test/test_result/${id}/user_result_compare_by_lessons/`)
			return response.data
		} catch (e) {
			toast.error(e.message)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const getModulesForLesson = createAsyncThunk(
	"lessonByTests/getModulesForLesson",
	async (params, thunkAPI) => {
		try {
			const res = await $axios.get(`test/modul/get_modules_used_by_lessons/`, {params});
			return res.data;
		} catch (err) {
			toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getSystemsForLesson = createAsyncThunk(
	"lessonByTests/getSystemsForLesson",
	async (params, thunkAPI) => {
		try {
			const res = await $axios.get(
				`test/sistema/get_lessons_used/`, { params }
			);
			return res.data;
		} catch (err) {
			toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const getQuestionModeForLesson = createAsyncThunk(
	"lessonByTests/getQuestionModeForLesson",
	async (params, thunkAPI) => {
		try {
			const res = await $axios.get(
				`test/test_result/question_mode_get_by_lessons/`, { params }
			);
			return res.data;
		} catch (err) {
			toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const startLesson = createAsyncThunk(
	"lessonByTests/startLesson",
	async (payload, thunkAPI) => {
		try {
			const res = await $axios.post(`/test/test_result/start_test_by_lessons/`, payload);
			return res.data;
		} catch (err) {
			toast.error(err.message);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const lessonsByTestsSlice = createSlice({
	name: 'lessonsByTests',
	initialState: {
		loading: false,
		lessonByTestsList: null,
		lessonByTest: null,
		questionsDetail: null,
		questionsUnused: null,
		
		resultUserStatistic: null,
		topFiveStudents: null,
		topModules: null,
		userTestHistory: null,
		allTestResultModules: null,
		userResultCompare: null,
		
		moduleListForLesson: null,
		systemListForLesson: null,
		questionModeList: null
	},
	extraReducers: (builder) => {
		// getQuestionModeForLesson
		builder
			.addCase(getQuestionModeForLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getQuestionModeForLesson.fulfilled, (state, {payload}) => {
				state.questionModeList = payload
				state.loading = false
			})
			.addCase(getQuestionModeForLesson.rejected, (state, {payload}) => {
				state.loading = false
				state.questionModeList = null
			})
		
		// getSystemsForLesson
		builder
			.addCase(getSystemsForLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getSystemsForLesson.fulfilled, (state, {payload}) => {
				state.systemListForLesson = payload
				state.loading = false
			})
			.addCase(getSystemsForLesson.rejected, (state) => {
				state.loading = false
				state.systemListForLesson = null
			})
		
		// getModulesForLesson
		builder
			.addCase(getModulesForLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getModulesForLesson.fulfilled, (state, {payload}) => {
				state.moduleListForLesson = payload
				state.loading = false
			})
			.addCase(getModulesForLesson.rejected, (state) => {
				state.loading = false
				state.moduleListForLesson = null
			})
		
		// getUserResultCompareLesson
		builder
			.addCase(getUserResultCompareLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getUserResultCompareLesson.fulfilled, (state, {payload}) => {
				state.userResultCompare = payload
				state.loading = false
			})
			.addCase(getUserResultCompareLesson.rejected, (state) => {
				state.userResultCompare = null
				state.loading = false
			})
		
		// allResultModulesLesson
		builder
			.addCase(allResultModulesLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(allResultModulesLesson.fulfilled, (state, {payload}) => {
				state.allTestResultModules = payload
				state.loading = false
			})
			.addCase(allResultModulesLesson.rejected, (state, {payload}) => {
				state.loading = false
				state.allTestResultModules = null
			})
		
		// getUserResultHistoryLesson
		builder
			.addCase(getUserResultHistoryLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getUserResultHistoryLesson.fulfilled, (state, {payload}) => {
				state.userTestHistory = payload
				state.loading = false
			})
			.addCase(getUserResultHistoryLesson.rejected, (state) => {
				state.loading = false
				state.userTestHistory = null
			})
		
		// getTopModulesLesson
		builder
			.addCase(getTopModulesLesson.pending, (state) => {
				state.loading = true
			})
			.addCase(getTopModulesLesson.fulfilled, (state, {payload}) => {
				state.topModules = payload
				state.loading = false
			})
			.addCase(getTopModulesLesson.rejected, (state) => {
				state.loading = false
				state.topModules = null
			})
		
		// getTopFiveStudentsLesson
		builder
			.addCase(getTopFiveStudentsLesson.pending, state => {
				state.loading = true
			})
			.addCase(getTopFiveStudentsLesson.fulfilled, (state, {payload}) => {
				state.topFiveStudents = payload
				state.loading = false
			})
			.addCase(getTopFiveStudentsLesson.rejected, (state) => {
				state.loading = false
				state.topFiveStudents = null
			})
		
		// getResultUserStatistic
		builder
			.addCase(getResultUserStatistic.pending, state => {
				state.loading = true
			})
			.addCase(getResultUserStatistic.fulfilled, (state, {payload}) => {
				state.resultUserStatistic = payload
				state.loading = false
			})
			.addCase(getResultUserStatistic.rejected, state => {
				state.loading = false
				state.resultUserStatistic = null
			})
		
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
		
		// createLessonBinding
		builder.addCase(createLessonBinding.pending, (state) => {
			state.loading = true
		})
		builder.addCase(createLessonBinding.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(createLessonBinding.rejected, (state) => {
			state.loading = false
		})
		
		// patchLessonBinding
		builder.addCase(patchLessonBinding.pending, (state) => {
			state.loading = true
		})
		builder.addCase(patchLessonBinding.fulfilled, (state) => {
			state.loading = false
		})
		builder.addCase(patchLessonBinding.rejected, (state) => {
			state.loading = false
		})
	}
})

export default lessonsByTestsSlice.reducer