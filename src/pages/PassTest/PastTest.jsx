import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FcBookmark} from "react-icons/fc";
import {FaCheck, FaCircle} from "react-icons/fa";
import Footer from "./Footer";
import Header from "./Header";
import {
	clearAnswer,
	getExactTest,
	getTestsById, patchLineOption, submitSelectQuestion,
	submitTheAnswer,
} from "../../features/pastTest/pastTestSlice";
import {
	setItem,
	getItem, toggleSidebar, toggleTestCount,
} from "../../features/LocalStorageSlice/LocalStorageSlice";
import {VscError} from "react-icons/vsc";
import TimeUpModal from "./TimeUpModal";
import {useLocation, useNavigate} from "react-router-dom";
import LabValues from "./LabValues";
import Calculator from "./Calculator";
import {ROUTES} from "../../Routes/constants";
import {resetTimer} from "../../features/Timer/timerSlice";
import {patchTestResult} from "../../features/testResults/testResultsSlice";
import {getUserData} from "../../auth/jwtService";

const PastTest = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const {testList, question} = useSelector(
		({pastTest}) => pastTest
	);
	const {testID, exactTestID, isTestCountOpen} = useSelector((state) => state.localStorage);
	const {seconds} = useSelector(({timer}) => timer);
	
	const dispatch = useDispatch();
	
	const selectedAnswerInput = document.querySelector(
		'input[name="keys"]:checked'
	);
	
	const [selectedAnswer, setSelectedAnswerAnswer] = useState({
		id: null,
		key: "",
		test_question: "",
	});
	
	const [countIndex, setCountIndex] = useState(0);
	const [isTimeUp, setIsTimeUp] = useState(false);
	const [is_clear, setClear] = useState(false)
	
	const [lab_values, setLabValues] = useState(false)
	const [calculator, setCalculator] = useState(false)
	
	const handleLabValuesOpen = () => {
		setLabValues(true)
	}
	const handleLabValuesClose = () => setLabValues(false)
	
	const handleCalculatorOpen = () => {
		setCalculator(true)
	}
	const handleCalculatorClose = () => setCalculator(false)
	
	const changeTest = (id, test_id, idx) => {
		dispatch(setItem({key: "exactTestID", value: test_id}));
		dispatch(getExactTest({id, test_id}));
		dispatch(clearAnswer());
		setSelectedAnswerAnswer({
			test_question: "",
			key: "",
			id: null,
		});
		setCountIndex(idx);
		dispatch(setItem({key: "idx", value: idx}));
		
		if (window.innerWidth <= 425) {
			dispatch(toggleTestCount())
		}
	};
	
	const currentAnswer = (option) => {
		setSelectedAnswerAnswer({
			id: option.id,
			key: option.key,
			test_question: option.test_question,
		});
	};
	
	const submitOnClick = () => {
		if (!question.is_tutor) {
			setCountIndex((prevState) =>
				testList?.count > prevState ? prevState + 1 : prevState
			);
			dispatch(
				submitTheAnswer({
					id: selectedAnswer.id,
					answer: selectedAnswer.key,
					test_question_id: selectedAnswer.test_question,
					start_test_id: testList.id,
				})
			).then(() => {
				dispatch(getTestsById({id: testID, is_reload: location.state?.is_reload}));
				testList.count === countIndex + 1 &&
				dispatch(getExactTest({id: testID, test_id: exactTestID}));
				testList.count > countIndex + 1 &&
				dispatch(
					getExactTest({
						id: testList?.id,
						test_id: testList?.test_ids[countIndex + 1]?.test_question?.id,
					})
				);
				setSelectedAnswerAnswer({
					test_question: "",
					key: "",
					id: null,
				});
			});
		} else {
			dispatch(
				submitTheAnswer({
					id: selectedAnswer.id,
					answer: selectedAnswer.key,
					test_question_id: selectedAnswer.test_question,
					start_test_id: testList.id,
				})
			).then(() => {
				dispatch(getTestsById({id: testID, is_reload: location.state?.is_reload}));
				dispatch(getExactTest({id: testID, test_id: exactTestID}));
			});
		}
	};
	
	useEffect(() => {
		dispatch(getItem({key: "testID"}));
		dispatch(getItem({key: "exactTestID"}));
	}, [dispatch]);
	
	useEffect(() => {
		if (location?.state?.is_reload) {
			dispatch(getTestsById({id: testID, is_reload: location.state?.is_reload})).then(({payload}) => {
				dispatch(getExactTest({id: testID, test_id: payload?.test_ids[countIndex]?.test_question?.id})).then(() => {
					dispatch(setItem({key: "exactTestID", value: payload?.test_ids[countIndex]?.test_question?.id}));
				})
			})
		} else {
			dispatch(getTestsById({id: testID}));
			if (countIndex === 0) {
				dispatch(getExactTest({id: testID, test_id: exactTestID}));
			}
		}
	}, [dispatch, exactTestID, testID]);
	
	// useEffect(() => {
	// 	if (location?.state?.is_reload) {
	// 		navigate(location.pathname, {
	// 			state: { is_reload: false }
	// 		});
	// 	}
	// }, []);
	
	useEffect(() => {
		dispatch(getExactTest({id: testID, test_id: exactTestID}));
	}, []);
	
	useEffect(() => {
		if (seconds <= 0) {
			setIsTimeUp(true);
		}
	}, [seconds]);
	
	useEffect(() => {
		const handleBack = () => {
			// navigate(ROUTES.RESULTS);
			dispatch(resetTimer());
			dispatch(
				patchTestResult({
					id: testID,
					user_id: getUserData().id
				})
			).then(() => {
				navigate(ROUTES.RESULTS, {state: {is_lesson: location?.state?.is_lesson}});
				localStorage.removeItem('highlight')
			})
		};
		
		window.addEventListener("popstate", handleBack);
		
		return () => {
			window.removeEventListener("popstate", handleBack);
		};
	}, [navigate]);
	
	const handleStep = (direction) => {
		if (direction === "next") {
			setSelectedAnswerAnswer({
				id: null,
				key: "",
				test_question: "",
			})
			setCountIndex((prev) => prev + 1);
			if (testList.count > countIndex + 1) {
				dispatch(
					getExactTest({
						id: testList?.id,
						test_id: testList?.test_ids[countIndex + 1]?.test_question?.id,
					})
				);
				dispatch(
					setItem({
						key: "exactTestID",
						value: testList?.test_ids[countIndex + 1]?.test_question?.id,
					})
				);
			}
			dispatch(clearAnswer());
		} else {
			setCountIndex((prev) => (prev > 0 ? prev - 1 : 0));
			setSelectedAnswerAnswer({
				id: null,
				key: "",
				test_question: "",
			})
			if (countIndex > 0) {
				dispatch(
					getExactTest({
						id: testList?.id,
						test_id: testList?.test_ids[countIndex - 1]?.test_question?.id,
					})
				);
				dispatch(
					setItem({
						key: "exactTestID",
						value: testList?.test_ids[countIndex - 1]?.test_question?.id,
					})
				);
				dispatch(clearAnswer());
			}
		}
	};
	
	const timeoutId = useRef(null);
	const highlightSelectedText = () => {
		const selection = window.getSelection();
		const selectedText = selection.toString();
		
		if (selectedText !== '') {
			const range = selection.getRangeAt(0);
			const span = document.createElement('span');
			span.className = 'highlight';
			range.surroundContents(span);
			
			if (paragraphRef.current.outerHTML) {
				clearTimeout(timeoutId.current);
				timeoutId.current = setTimeout(() => {
					dispatch(
						submitSelectQuestion({
							id: question?.id,
							change_yellow_text: paragraphRef.current.outerHTML,
							is_clear
						})
					).then(() => {
						dispatch(getExactTest({id: testID, test_id: exactTestID}))
					});
				}, 200);
			}
		}
	};
	
	const paragraphRef = useRef(null);
	
	useEffect(() => {
		const paragraph = paragraphRef.current;
		
		if (paragraph) {
			paragraph.addEventListener('mouseup', highlightSelectedText);
			paragraph.addEventListener('touchend', highlightSelectedText);
		}
		
		return () => {
			if (paragraph) {
				paragraph.removeEventListener('mouseup', highlightSelectedText);
				paragraph.removeEventListener('touchend', highlightSelectedText);
			}
		};
	}, []);
	
	// useEffect(() => {
	// 	if (paragraphRef.current) {
	// 		paragraphRef.current.addEventListener('mouseup', highlightSelectedText);
	// 	}
	//
	// 	return () => {
	// 		if (paragraphRef.current) {
	// 			paragraphRef.current.removeEventListener('mouseup', highlightSelectedText);
	// 		}
	// 	};
	// }, []);
	
	return (
		<div className="min-h-screen bg-darkLayoutStrm flex flex-wrap pb-20 relative">
			<div
				className={`${
					isTestCountOpen ? 'block sm:block md:hidden lg:hidden' : 'hidden'
				} fixed top-12 sm:top-14 md:top-[56px] lg:top-16 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50`}
				onClick={() => dispatch(toggleTestCount())}
			></div>
			{isTestCountOpen && (
				<ul className={`w-[12%] ${window.innerWidth < 768 ? 'z-50' : ''} h-full overflow-y-auto bg-white border-r-2 fixed md:relative sm:fixed md:w-[6%]`}>
					{testList &&
						testList?.test_ids?.map((test, index) => (
							<li
								onClick={() =>
									changeTest(testList.id, test.test_question.id, index)
								}
								key={index}
								className={`${index % 2 === 0 && "bg-gray-300"}
                h-6 flex items-center justify-center cursor-pointer ${
									test?.order_number === question?.order_number
										? "bg-blue-400 text-white"
										: ""
								}`}
							>
								<div className="flex relative justify-center items-center w-full">
                <span
	                className={`absolute top-2 left-2 ${
		                test?.order_number === question?.order_number
			                ? "bg-blue-400 text-white"
			                : "text-dark"
	                }`}
                >
                  {!test.is_check && <FaCircle size="6"/>}
                </span>
									{test.order_number}
									<span className="absolute top-1 right-2">
                  {test.mark && (
	                  <FcBookmark className="text-white ml-1" size="14"/>
                  )}
                </span>
								</div>
							</li>
						))}
				</ul>
			)}
			
			<Header
				index={countIndex}
				setIndex={setCountIndex}
				setSelectedAnswerAnswer={setSelectedAnswerAnswer}
				paragref={paragraphRef}
				is_clear={is_clear}
				labValues={handleLabValuesOpen}
				calculator={handleCalculatorOpen}
			/>
			
			<div
				className={`mt-[3rem] overflow-y-auto p-5 ${
					!isTestCountOpen ? "w-full" : lab_values ? "w-[64%]" : "w-[94%]"
				} question md:w-[93%] test`}
			>
			
				{/*<button*/}
				{/*  onClick={() => {*/}
				{/*    dispatch(*/}
				{/*      submitSelectQuestion({*/}
				{/*        id: question?.id,*/}
				{/*        change_yellow_text: paragraphRef.current.outerHTML,*/}
				{/*        is_clear: !is_clear*/}
				{/*      })*/}
				{/*    ).then(() => {*/}
				{/*      dispatch(getExactTest({id: testID, test_id: exactTestID}))*/}
				{/*    });*/}
				{/*  }}*/}
				{/*  title={'Tozalash'}*/}
				{/*  className={`mb-4 flex ml-auto`}*/}
				{/*>*/}
				{/*  <AiOutlineClear size={'25'}/>*/}
				{/*</button>*/}
				<div
					dangerouslySetInnerHTML={{
						__html: question?.test_question?.question,
					}}
					ref={paragraphRef}
					onMouseUp={highlightSelectedText}
					onTouchEnd={highlightSelectedText}
					// onMouseDown={selection}
					// onMouseEnter={selection}
					// onBlur={selection}
				/>
				{question?.test_question?.image2 && (
					<img
						src={question?.test_question?.image2}
						className="max-w-[60vw] max-h-[600px]"
						alt=""
					/>
				)}
				
				<div className="border-primary border-2 mt-10 px-5 w-full">
					{question?.test_question?.options?.map((option, idx) => (
						<div key={idx} className="flex items-center gap-2 mt-2">
							<label
								className={`flex items-center gap-2 cursor-pointer my-1 ${
									question.is_tutor
										? (option.key === question.wrong_key && `text-danger`) ||
										(option.key === question.right_key && `text-success`)
										: `${
											question?.is_check
												? option?.key === question?.answer && `text-gray-400`
												: option?.key === selectedAnswer.key &&
												`text-gray-400`
										}`
								} ${option.is_strik ? 'line-through' : ''}`}
								htmlFor={option.key}
								key={idx}
							>
								<input
									type="radio"
									name="keys"
									id={option.key}
									value={option.key}
									disabled={question?.is_check}
									checked={
										question.answer
											? option?.key === question?.answer
											: option.id === selectedAnswer.id
									}
									onChange={() => currentAnswer(option)}
								/>
								<span className="uppercase">{option.key}</span>
							</label>
							<span
								className={`cursor-pointer ${
									question.is_tutor
										? (option.key === question.wrong_key && `text-danger`) ||
										(option.key === question.right_key && `text-success`)
										: `${
											question?.is_check
												? option?.key === question?.answer && `text-gray-400`
												: option?.key === selectedAnswer.key &&
												`text-gray-400`
										}`
								} ${option.is_strik ? 'line-through' : ''}`}
								onClick={() => {
									dispatch(
										patchLineOption({
											start_test_id: question?.start_test_result,
											test_id: question?.id,
											option_id: option?.id,
											is_strik: !option.is_strik
										})
									).then(() => {
										dispatch(getExactTest({id: testID, test_id: exactTestID}))
									})
								}}
							>
                {option.answer}
              </span>
						</div>
					))}
				</div>
				<div className="flex items-center gap-5">
					<button
						className="btn-primary mt-10 inline-block"
						onClick={() => submitOnClick()}
						disabled={selectedAnswer?.key === "" || question?.is_check}
					>
						Submit the Answer
					</button>
					<button
						className="btn-primary mt-10 inline-block"
						onClick={() => handleStep('next')}
						disabled={countIndex + 1 === testList.count}
					>
						{'Next'}
					</button>
				</div>
				{question?.is_tutor && question?.is_check && (
					<div className="p-2 my-4 rounded shadow-lg shadow-blue-400 border border-blue-400">
						{selectedAnswerInput?.value === question?.right_key ? (
							<FaCheck
								className="text-4xl m-auto"
								color={"green"}
								title={"correct"}
							/>
						) : (
							<VscError
								className="text-4xl m-auto"
								color={"red"}
								title={"Incorrect"}
							/>
						)}
					</div>
				)}
				{question?.is_tutor && question?.is_check && (
					<>
						{question?.test_question.image3 && (
							<img src={question?.test_question.image3} alt={"img"} className="max-w-[60vw] max-h-[600px]"/>
						)}
						{question?.test_question.image && (
							<img src={question?.test_question.image} alt={"img"} className="max-w-[60vw] max-h-[600px]"/>
						)}
					</>
				)}
				{question?.is_tutor && (
					<div className="py-10 overflow-y-auto">
						{question?.is_check && (
							<div className="mt-3">
								<div className="p-3 border-blue-400 border-2">
									<strong className="text-3xl">Explation:</strong>
									<div
										dangerouslySetInnerHTML={{
											__html: question?.test_question?.correct_answer
												? `
                          <span class="font-black">Correct Answer ${question?.test_question.correct_answer_key}:</span> ${question?.test_question?.correct_answer}
                        `
												: "",
										}}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			
			<Footer/>
			<TimeUpModal isModalOpen={isTimeUp}/>
			{lab_values && (
				<LabValues closeModal={handleLabValuesClose}/>
			)}
			{calculator && <Calculator closeModal={handleCalculatorClose}/>}
		</div>
	);
};

export default PastTest;
