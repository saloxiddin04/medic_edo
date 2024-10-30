import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {getQuestionUnused} from "../../features/LessonsByTests/LessonsByTestsSlice";

const CreateLessonByTest = ({isModalOpen}) => {
	const dispatch = useDispatch()
	const {questionsUnused} = useSelector(({lessonByTest}) => lessonByTest)
	
	const [lesson, setLesson] = useState(null)
	const [question, setQuestion] = useState([])
	
	useEffect(() => {
		if (isModalOpen) dispatch(getQuestionUnused({page_size: 100000}))
	}, [dispatch, isModalOpen]);
	
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
				<div
					className="bg-white p-4 w-full rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-5xl sm:w-full">
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
									setQuestion((prevState) => ({
										...prevState,
										...selectedOption?.id
									}))
								}}
								value={questionsUnused?.results?.find(item => item?.id === question)}
								placeholder={'Select Quesion'}
							/>
						</div>
					</div>
					<div className="flex items-center justify-end mt-5 gap-3">
						<button className="py-2 px-4 bg-red-400 text-white rounded text-lg">Back
						</button>
						<button
							className="py-2 px-4 bg-green-400 text-white rounded text-lg"
							// disabled={data?.users?.length === 0 || data?.group === null}
							// onClick={saveData}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateLessonByTest;