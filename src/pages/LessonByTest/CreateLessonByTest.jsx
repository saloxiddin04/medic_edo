import React, {useEffect, useRef, useState} from 'react';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {
	createLessonBinding, getLessonsByTestDetail,
	getLessonsByTests,
	getQuestionUnused, patchLessonBinding
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import LoadingPage from "../LoadingPage";
import {toast} from "react-toastify";
import {IoClose} from "react-icons/io5";

const LazyLoadSelect = ({options, onChange, value}) => {
	const [visibleOptions, setVisibleOptions] = useState([]);
	const [loadCount, setLoadCount] = useState(10);
	
	useEffect(() => {
		setVisibleOptions(options?.slice(0, loadCount));
	}, [loadCount, options]);
	
	const handleMenuScroll = (event) => {
		const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
		if (bottom && loadCount < options.length) {
			setLoadCount((prevCount) => prevCount + 10);
		}
	};
	
	console.log(loadCount)
	
	return (
		<Select
			options={visibleOptions}
			onChange={onChange}
			value={value}
			isMulti
			placeholder="Select Question"
			styles={{
				menu: (provided) => ({
					...provided,
					maxHeight: 200,
				}),
			}}
			onMenuScrollToBottom={handleMenuScroll}
			components={{
				Menu: (props) => (
					<div {...props.innerProps} onScroll={handleMenuScroll} style={{maxHeight: 200, overflowY: 'auto'}}>
						{props.children}
					</div>
				),
			}}
		/>
	);
};

const CreateLessonByTest = ({isModalOpen, close, id}) => {
	const dispatch = useDispatch()
	const {questionsUnused, loading, lessonByTest} = useSelector(({lessonByTest}) => lessonByTest)
	
	const selectRef = useRef(null);
	
	const [lesson, setLesson] = useState(null)
	const [question, setQuestion] = useState([])
	
	useEffect(() => {
		if (isModalOpen) {
			dispatch(getQuestionUnused({page_size: 100000}))
		}
	}, [dispatch, isModalOpen]);
	
	useEffect(() => {
		if (selectRef.current) {
			const valueContainer = selectRef.current.controlRef.querySelector('.css-46gnuy-ValueContainer');
			if (valueContainer) {
				valueContainer.scrollTop = valueContainer.scrollHeight;
			}
		}
	}, [question, dispatch]);
	
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
	
	console.log(selectRef.current?.controlRef)
	
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
							<label htmlFor="moduleName">Select Question</label>
							<Select
								ref={selectRef}
								options={questionsUnused?.results}
								getOptionLabel={(modul) => modul.question}
								getOptionValue={(modul) => modul.id}
								onChange={(selectedOption) => {
									setQuestion(selectedOption?.map((option) => option.id));
								}}
								isMulti
								value={questionsUnused?.results?.filter((item) => question.includes(item?.id))}
								placeholder={'Select Question'}
								styles={{
									menu: (provided) => ({
										...provided,
										maxHeight: 200,
										overflowY: 'auto'
									}),
									menuPortal: (base) => ({...base, zIndex: 9999999, background: '#fff'}),
									multiValue: (provided) => ({
										...provided,
										maxWidth: '100%',
										maxHeight: 400
									}),
									valueContainer: (provided) => ({
										...provided,
										maxHeight: 100,
										overflowY: 'auto',
									}),
									option: (provided) => ({
										...provided,
										fontSize: '14px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										maxWidth: '100%',
										padding: '8px'
									})
								}}
							/>
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