import React from "react";
import {FcBookmark} from "react-icons/fc";
import {useSelector, useDispatch} from "react-redux";
import {
	clearAnswer,
	getExactTest,
	getTestsById,
	submitMarked, submitSelectQuestion,
} from "../../features/pastTest/pastTestSlice";
import {setItem, toggleTestCount} from "../../features/LocalStorageSlice/LocalStorageSlice";
import Timer from "../../components/Timer";
import {AiOutlineClear} from "react-icons/ai";
import {SlChemistry} from "react-icons/sl";
import {BsCalculator} from "react-icons/bs";
import {useLocation, useParams} from "react-router-dom";

const Header =
	({
		 index,
		 setIndex,
		 setSelectedAnswerAnswer,
		 paragref,
		 is_clear,
		 labValues,
		 calculator,
	 }) => {
		const dispatch = useDispatch();
		const {testList, question} = useSelector(({pastTest}) => pastTest);
		const {testID, exactTestID, isTestCountOpen} = useSelector((state) => state.localStorage);
		const location = useLocation()
		
		const handleStep = (direction) => {
			if (direction === "next") {
				setSelectedAnswerAnswer({
					id: null,
					key: "",
					test_question: "",
				})
				setIndex((prev) => prev + 1);
				if (testList.count > index + 1) {
					dispatch(
						getExactTest({
							id: testList?.id,
							test_id: testList?.test_ids[index + 1]?.test_question?.id,
						})
					);
					dispatch(
						setItem({
							key: "exactTestID",
							value: testList?.test_ids[index + 1]?.test_question?.id,
						})
					);
				}
				dispatch(clearAnswer());
			} else {
				setIndex((prev) => (prev > 0 ? prev - 1 : 0));
				setSelectedAnswerAnswer({
					id: null,
					key: "",
					test_question: "",
				})
				if (index > 0) {
					dispatch(
						getExactTest({
							id: testList?.id,
							test_id: testList?.test_ids[index - 1]?.test_question?.id,
						})
					);
					dispatch(
						setItem({
							key: "exactTestID",
							value: testList?.test_ids[index - 1]?.test_question?.id,
						})
					);
					dispatch(clearAnswer());
				}
			}
		};
		
		const submitMark = () => {
			dispatch(
				submitMarked({
					id: testList?.test_ids[index]?.id,
					mark: !testList?.test_ids[index].mark,
				})
			).then(() => {
				dispatch(getTestsById({id: testID}));
				dispatch(
					getExactTest({
						id: testList?.id,
						test_id: testList?.test_ids[index]?.test_question?.id,
					})
				);
			});
		};
		
		return (
			<nav className={`fixed top-0 right-0 ${!isTestCountOpen ? 'w-full' : 'w-[90vw] sm:w-[94vw]'} h-[50px] z-10 bg-primary px-4`}>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-5 mt-1">
						<div className="flex items-center gap-7 md:hidden">
							<button
								onClick={() => dispatch(toggleTestCount())}
								className="text-white text-3xl"
							>
								&#9776;
							</button>
						</div>
						<h1 className="text-white text-center text-[10px] md:text-sm">
							Question {question?.order_number} of {testList?.count}
							<span className="block font-medium">ID: {question?.test_question?.id}</span>
						</h1>
						<div className="cursor-pointer" onClick={submitMark}>
							<FcBookmark className="text-white ml-1" size="22"/>
							<p className="text-sm text-white">Mark</p>
						</div>
					</div>
					
					<div className="flex items-center gap-x-2 md:gap-x-10 -mt-2 text-white">
						<button
							onClick={() => handleStep("prev")}
							className={`text-5xl ${index === 0 ? "opacity-20" : ""}`}
							disabled={index === 0}
						>
							&#8249;
						</button>
						<button
							onClick={() => handleStep("next")}
							className={`text-5xl ${
								index + 1 === testList.count ? "opacity-20" : ""
							}`}
							disabled={index + 1 === testList.count}
						>
							&#8250;
						</button>
					</div>
					
					<div className="flex items-center gap-7">
						{testList?.is_time && <Timer/>}
					</div>
					{location?.pathname === '/test' && (
						<div className={'flex items-center'}>
							<button
								onClick={() => {
									dispatch(
										submitSelectQuestion({
											id: question?.id,
											change_yellow_text: paragref?.current?.outerHTML,
											is_clear: !is_clear
										})
									).then(() => {
										dispatch(getExactTest({id: testID, test_id: exactTestID}))
									});
								}}
								title={'Tozalash'}
								className={`flex ml-auto`}
							>
								<AiOutlineClear size={'25'} color={'#fff'}/>
							</button>
							<button className="flex ml-4" onClick={labValues}>
								<SlChemistry size={'22'} color={'#fff'}/>
							</button>
							<button className="flex ml-4" onClick={calculator}>
								<BsCalculator size={'22'} color={'#fff'}/>
							</button>
						</div>
					)}
				</div>
			</nav>
		);
	};

export default Header;
