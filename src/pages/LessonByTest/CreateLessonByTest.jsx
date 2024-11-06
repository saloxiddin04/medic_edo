import React, {useEffect, useRef, useState} from 'react';
// import Select, {components} from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {
	createLessonBinding, getLessonsByTestDetail,
	getLessonsByTests,
	getQuestionUnused, patchLessonBinding
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import {toast} from "react-toastify";
import {IoClose} from "react-icons/io5";

const CreateLessonByTest = ({isModalOpen, close, id}) => {
	const dispatch = useDispatch()
	const {questionsUnused, loading, lessonByTest} = useSelector(({lessonByTest}) => lessonByTest)
	
	const selectRef = useRef(null);
	
	const dropdownRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	
	const [lesson, setLesson] = useState(null)
	const [question, setQuestion] = useState([])
	const [filterText, setFilterText] = useState("");
	
	useEffect(() => {
		if (isModalOpen) {
			dispatch(getQuestionUnused({page_size: 100000}))
		}
	}, [dispatch, isModalOpen]);
	
	useEffect(() => {
		if (selectRef.current) {
			selectRef.current.scrollTop = selectRef.current.scrollHeight
		}
	}, [question, dispatch]);
	
		// useEffect(() => {
	// 	if (selectRef.current) {
	// 		const valueContainer = selectRef.current.controlRef.querySelector('.css-46gnuy-ValueContainer');
	// 		if (valueContainer) {
	// 			valueContainer.scrollTop = valueContainer.scrollHeight;
	// 		}
	// 	}
	// }, [question, dispatch]);
	
	useEffect(() => {
		if (isModalOpen && id !== null) {
			dispatch(getLessonsByTestDetail(id)).then(({payload}) => {
				setQuestion(payload?.question?.map(item => item?.id))
				setLesson(payload?.lesson)
			})
		}
	}, [isModalOpen, id, dispatch]);
	
	const handleClose = () => {
		setLesson(null)
		setQuestion([])
		setIsOpen(false)
		close()
	}
	
	const create = () => {
		if (id) {
			dispatch(patchLessonBinding({id, data: {lesson, question}})).then(({payload}) => {
				if (payload?.id) {
					toast.success('Success')
					handleClose()
					dispatch(getLessonsByTests({page_size: 10, page: 1}))
				} else {
					return toast.error('Error')
				}
			})
		} else {
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
	}
	
	const questionMap = questionsUnused?.results?.reduce((acc, item) => {
		acc[item.id] = item.question;
		return acc;
	}, {});
	
	const toggleDropdown = () => setIsOpen(!isOpen);
	
	const handleOptionClick = (option) => {
		setQuestion((prevQuestion) => {
			if (prevQuestion.includes(option)) {
				return prevQuestion.filter((item) => item !== option);
			} else {
				return [...prevQuestion, option];
			}
		});
	};
	
	const removeSelectedOption = (option) => {
		setQuestion((prevQuestion) => prevQuestion.filter((item) => item !== option));
	};
	
	const filteredOptions = questionsUnused?.results?.filter((option) =>
		option.id.toString().includes(filterText)
	);
	
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
					className="bg-white px-4 py-4 w-full flex flex-col justify-between rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-5xl sm:w-full">
					<div className={'text-right mb-6'}>
						<button className={'btn-danger btn-sm'} onClick={handleClose}>
							<IoClose/>
						</button>
					</div>
					<div className={'flex items-center justify-between py-6'}>
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
							<label htmlFor="moduleName">Select Question {question?.length}</label>
							<div className="relative w-full max-w-md mx-auto">
								<div
									className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white max-h-40 overflow-y-auto"
									ref={selectRef}
									onClick={toggleDropdown}
								>
									<div className="flex flex-wrap gap-2">
										{question.length > 0 ? (
											question.map((id) => (
												<div
													key={id}
													className="flex items-center bg-gray-200 px-1 py-1 rounded-md"
												>
													<span className="text-gray-700">{questionMap[id]}</span>
													<button
														onClick={(e) => {
															e.stopPropagation();
															removeSelectedOption(id);
														}}
														className="ml-2 text-gray-500 hover:text-gray-700"
													>
														&times;
													</button>
												</div>
											))
										) : (
											<span className="text-gray-400">Select Options</span>
										)}
									</div>
								</div>
								
								{isOpen && (
									<div
										ref={dropdownRef}
										className="absolute z-50 mt-1 w-full border border-gray-300 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto"
									>
										<div className="p-2">
											<input
												type="text"
												placeholder="Filter by ID"
												value={filterText}
												onChange={(e) => setFilterText(e.target.value)}
												className="w-full border border-gray-300 rounded-md p-2"
											/>
										</div>
										
										{filteredOptions?.map((option) => (
											<div
												key={option.id}
												onClick={() => handleOptionClick(option.id)}
												className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
													question.includes(option.id) ? 'bg-gray-200' : ''
												}`}
											>
												{option.question}
											</div>
										))}
									</div>
								)}
							</div>
							
							
							{/*<Select*/}
							{/*	ref={selectRef}*/}
							{/*	options={questionsUnused?.results}*/}
							{/*	getOptionLabel={(modul) => modul.question}*/}
							{/*	getOptionValue={(modul) => modul.id}*/}
							{/*	// getOptionValue={(modul) => console.log(modul)}*/}
							{/*	onChange={(selectedOptions) => {*/}
							{/*		const orderedSelection = selectedOptions*/}
							{/*			? selectedOptions?.map((option) => option.id)*/}
							{/*			: [];*/}
							{/*		setSelectedQuestions(orderedSelection);*/}
							{/*		setQuestion(orderedSelection);*/}
							{/*		// setQuestion(selectedOption?.map((option) => option.id));*/}
							{/*	}}*/}
							{/*	isMulti*/}
							{/*	value={questionsUnused?.results?.filter((item) => selectedQuestions.includes(item?.id))}*/}
							{/*	placeholder={'Select Question'}*/}
							{/*	styles={{*/}
							{/*		menu: (provided) => ({*/}
							{/*			...provided,*/}
							{/*			maxHeight: 200,*/}
							{/*			overflowY: 'auto'*/}
							{/*		}),*/}
							{/*		menuPortal: (base) => ({...base, zIndex: 9999999, background: '#fff'}),*/}
							{/*		multiValue: (provided) => ({*/}
							{/*			...provided,*/}
							{/*			maxWidth: '100%',*/}
							{/*			maxHeight: 400*/}
							{/*		}),*/}
							{/*		valueContainer: (provided) => ({*/}
							{/*			...provided,*/}
							{/*			maxHeight: 200,*/}
							{/*			overflowY: 'auto'*/}
							{/*		}),*/}
							{/*		option: (provided) => ({*/}
							{/*			...provided,*/}
							{/*			fontSize: '14px',*/}
							{/*			whiteSpace: 'nowrap',*/}
							{/*			overflow: 'hidden',*/}
							{/*			textOverflow: 'ellipsis',*/}
							{/*			maxWidth: '100%',*/}
							{/*			padding: '8px'*/}
							{/*		})*/}
							{/*	}}*/}
							{/*/>*/}
						</div>
					</div>
					<div className="flex items-center justify-end my-4 mt-16 gap-3">
						<button className="py-2 px-4 bg-red-400 text-white rounded text-lg" onClick={handleClose}>
							Close
						</button>
						<button
							className="py-2 px-4 bg-green-400 text-white rounded text-lg disabled:opacity-25"
							disabled={question?.length === 0 || !lesson}
							onClick={create}
						>
							{loading ? 'Loading...' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateLessonByTest;