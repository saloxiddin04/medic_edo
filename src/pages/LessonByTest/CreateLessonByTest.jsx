import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {
	createLessonBinding,
	getLessonsByTests,
	getQuestionUnused
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import LoadingPage from "../LoadingPage";
import {toast} from "react-toastify";

const CreateLessonByTest = ({isModalOpen, close}) => {
	const dispatch = useDispatch()
	const {questionsUnused, loading} = useSelector(({lessonByTest}) => lessonByTest)
	
	const [lesson, setLesson] = useState(null)
	const [question, setQuestion] = useState([])
	
	useEffect(() => {
		if (isModalOpen) dispatch(getQuestionUnused({page_size: 100000}))
	}, [dispatch, isModalOpen]);
	
	const handleClose = () => {
		setLesson(null)
		setQuestion([])
		close()
	}
	
	const create = () => {
		dispatch(createLessonBinding({lesson, question})).then(({payload}) => {
			if (payload?.id) {
				toast.success('Success')
				handleClose()
				dispatch(getLessonsByTests({page_size: 10, page: 1}))
			} else {
				return toast.error('Error')
			}
		})
	}
	
	return (
		<div
			className={
				isModalOpen
					? "fixed z-10 inset-0 overflow-y-auto"
					: "opacity-0 pointer-events-none"
			}
		>
			<div
				className={
					isModalOpen
						? "flex items-center justify-center min-h-screen"
						: "hidden"
				}
			>
				<div className="fixed inset-0 bg-gray-500 opacity-75"></div>
				<div className="bg-white px-4 py-16 w-full flex flex-col justify-between rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-5xl sm:w-full">
					{loading ? <LoadingPage /> : (
						<>
							<div className={'flex items-center justify-between'}>
								<div className="w-[45%] flex flex-col">
									<label htmlFor="lesson">Lesson name</label>
									<input
										type="text"
										className="border border-gray-300 rounded outline-none p-2"
										value={lesson || ''}
										onChange={(e) => setLesson(e.target.value)}
									/>
								</div>
								<div className="w-[45%]">
									<label htmlFor="moduleName">Select Group</label>
									<Select
										options={questionsUnused?.results}
										getOptionLabel={(modul) => modul.question}
										getOptionValue={(modul) => modul.id}
										onChange={(selectedOption) => {
											setQuestion(selectedOption?.map((option) => option.id));
										}}
										isMulti
										value={questionsUnused?.results?.filter((item) => question.includes(item.id))}
										placeholder={'Select Question'}
									/>
								</div>
							</div>
							<div className="flex items-center justify-end mt-5 gap-3">
								<button className="py-2 px-4 bg-red-400 text-white rounded text-lg" onClick={handleClose}>
									Close
								</button>
								<button
									className="py-2 px-4 bg-green-400 text-white rounded text-lg"
									disabled={question?.length === 0 || !lesson}
									onClick={create}
								>
									Save
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateLessonByTest;