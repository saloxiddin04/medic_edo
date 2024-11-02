import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
	getModulesForLesson,
	getQuestionModeForLesson,
	getSystemsForLesson, startLesson
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import {resetTimer} from "../../features/Timer/timerSlice";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {setItem} from "../../features/LocalStorageSlice/LocalStorageSlice";
import {ROUTES} from "../../Routes/constants";

const CreateLessonTest = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const {moduleListForLesson, systemListForLesson, questionModeList} = useSelector(({lessonByTest}) => lessonByTest);
	
	const [isTutor, setIsTutor] = useState(true);
	const [isTimer, setIsTimer] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	
	const [all_modules, setAllModules] = useState(null)
	const [all_systems, setAllSystems] = useState(null)
	const [isSubmitted, setIsSubmitted] = useState(false);
	
	const [checkedItems, setCheckedItems] = useState([])
	const [systemItems, setSystemItems] = useState([])
	const [questionMode, setQuestionMode] = useState([])
	
	const [totalCount, setTotalCount] = useState(0);
	
	const [test_count, setTestCount] = useState(null)
	
	useEffect(() => {
		calculateTotalCount()
	}, [systemItems]);
	
	const get = useMemo(() => {
		const selectedModules = Object.keys(checkedItems)
			.filter(key => checkedItems[key])
			.map(Number);
		
		const selectedSystems = Object.keys(systemItems)
			.filter((key) => systemItems[key])
			.map(Number)
		const questionModules = Object.keys(questionMode).filter((key) => questionMode[key]);
		
		const filteredQuestionModes = questionModeList?.question_mode?.filter((item) =>
			questionModules.includes(item.id.toString())
		);
		
		const dynamicParams = filteredQuestionModes?.reduce((acc, item) => {
			acc[item.name?.toLowerCase()] = true;
			return acc;
		}, {});
		
		dispatch(getModulesForLesson({
			unused: isSelected,
			...dynamicParams
		}));
		dispatch(getSystemsForLesson({
				unused: isSelected,
				modul_ides: selectedModules.length > 0 ? JSON.stringify(selectedModules) : "null",
				...dynamicParams
			}
		));
		dispatch(getQuestionModeForLesson({
			unused: isSelected,
			modul_ides: selectedModules.length > 0 ? JSON.stringify(selectedModules) : "null",
			lessons_ides: selectedSystems.length > 0 ? JSON.stringify(selectedSystems) : "null"
		}));
	}, [checkedItems, systemItems, questionMode])
	
	const handleUnusedChange = (e) => {
		setIsSelected(e.target.checked)
		const selectedModules = Object.keys(checkedItems)
			.filter(key => checkedItems[key])
			.map(Number);
		
		const selectedSystems = Object.keys(systemItems)
			.filter((key) => systemItems[key])
			.map(Number)
		
		if (e.target.checked === false) {
			setQuestionMode([]);
		}
		
		dispatch(getModulesForLesson({
			unused: e.target.checked,
		}));
		dispatch(getSystemsForLesson({
				unused: e.target.checked,
				modul_ides: selectedModules.length > 0 ? JSON.stringify(selectedModules) : "null",
			}
		));
		dispatch(getQuestionModeForLesson({
			unused: e.target.checked,
			modul_ides: selectedModules.length > 0 ? JSON.stringify(selectedModules) : "null",
			sistema_ides: selectedSystems.length > 0 ? JSON.stringify(selectedSystems) : "null",
		}));
	}
	
	const handleCheckboxChange = (event) => {
		const name = event.target.name;
		const isChecked = event.target.checked;
		
		setCheckedItems({
			...checkedItems,
			[name]: isChecked,
		});
	};
	
	const handleSystemChange = (event) => {
		const name = event.target.name;
		const isChecked = event.target.checked;
		
		setSystemItems({
			...systemItems,
			[name]: isChecked,
		});
	};
	
	const handleQuestionModeChange = (event) => {
		const name = event.target.name;
		const isChecked = event.target.checked;
		
		setQuestionMode({
			...questionMode,
			[name]: isChecked,
		});
	};
	
	const handleAllModulesChange = (e) => {
		const isChecked = e.target.checked;
		setAllModules(isChecked);
		setAllSystems(isChecked);
		
		if (isChecked) {
			const updatedCheckedItems = {};
			moduleListForLesson.forEach((item) => {
				updatedCheckedItems[item.id] = true;
			});
			const updatedCheckedSystems = {};
			systemListForLesson?.forEach((item) => {
				updatedCheckedSystems[item.id] = true;
			});
			setSystemItems(updatedCheckedSystems);
			setCheckedItems(updatedCheckedItems);
		} else {
			setCheckedItems([]);
			setSystemItems([])
		}
	};
	
	const handleAllSystemChange = (e) => {
		const isChecked = e.target.checked;
		setAllSystems(isChecked);
		
		if (isChecked) {
			const updatedCheckedItems = {};
			systemListForLesson?.forEach((item) => {
				updatedCheckedItems[item.id] = true;
			});
			setSystemItems(updatedCheckedItems);
		} else {
			setSystemItems([]);
		}
	};
	
	const getCookieItem = (name) => {
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.startsWith(name + "=")) {
				return cookie.substring(name.length + 1, cookie.length);
			}
		}
		return null;
	};
	
	const handleReset = () => {
		sessionStorage.removeItem("timerState");
		dispatch(resetTimer());
	};
	
	const pastTest = () => {
		const cookieItemValue = getCookieItem("user");
		const jsonParseCookie =
			cookieItemValue !== null ? JSON.parse(cookieItemValue) : "";
		const selectedModules = Object.keys(checkedItems).filter(
			(key) => checkedItems[key]
		);
		const questionModeFilter = Object.keys(questionMode).filter(
			(key) => questionMode[key]
		);
		const result = Object.keys(checkedItems)
			.filter(key => checkedItems[key] === true)
			.map(key => ({
				[key]: Object.keys(systemItems).filter(sysKey => systemItems[sysKey]).map(Number),
			}));
		handleReset();
		
		if (selectedModules.length > 0) {
			dispatch(
				startLesson({
					user_selected: result,
					question_mode: questionModeFilter,
					timer: isTimer,
					tutor: isTutor,
					is_selected: isSelected,
					user: jsonParseCookie.id,
					test_count: test_count ? test_count : 40
				})
			).then((res) => {
				dispatch(setItem({key: "testID", value: res.payload.id}));
				dispatch(
					setItem({
						key: "exactTestID",
						value: res.payload.test_ids[0]?.test_question?.id,
					})
				);
				dispatch(setItem({key: "idx", value: 0}));
				navigate(ROUTES.TEST);
				setIsSubmitted(false);
			});
		}
		
		setIsSubmitted(true);
	};
	
	const calculateTotalCount = () => {
		const total = Object.keys(systemItems).reduce((acc, key) => {
			if (systemItems[key]) {
				const system = systemListForLesson?.find(item => item.id === parseInt(key));
				return acc + (system ? system?.count : 0);
			}
			return acc;
		}, 0);
		setTotalCount(total);
	};
	
	const countValidation = () => {
		return (test_count <= totalCount && totalCount <= 40) || (totalCount >= 40 && test_count <= 40);
	};
	
	return (
		<>
			<div className="card">
				<h1 className="text-xl">Test Mode</h1>
				
				<div className="flex items-center gap-10 mt-10 mb-5">
					<div className="flex items-center gap-3">
						<span>Tutor:</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={isTutor}
								onChange={() => setIsTutor(!isTutor)}
								className="sr-only peer"
							/>
							<div
								className="w-11 h-6 bg-gray-200 peer-focus:outline-none
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
							></div>
						</label>
					</div>
					<div className="flex items-center gap-3">
						<span>Timer:</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								onChange={() => setIsTimer(!isTimer)}
								className="sr-only peer"
							/>
							<div
								className="w-11 h-6 bg-gray-200 peer-focus:outline-none
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
							></div>
						</label>
					</div>
					<div className="flex items-center gap-3">
						<span>Unused:</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								onChange={handleUnusedChange}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
							></div>
						</label>
					</div>
				</div>
				<hr/>
				
				<h1 className="text-xl mt-2">
					Question Mode
					<span className={'ml-3 italic'}>
            Total Available
            <span
	            className="rounded-full border border-purple-400 py-1 px-2 ml-1">{questionModeList?.question_total}</span>
          </span>
				</h1>
				<div className="mb-5 ml-4 mt-2 flex gap-10 items-center">
					{questionModeList?.question_mode?.length > 0 && questionModeList?.question_mode?.map((item) => (
						<div key={item.name}>
							<label className="mb-2 inline-block cursor-pointer">
								<input
									type="checkbox"
									name={item.id}
									disabled={item.count === 0 || item.name === 'Unused'}
									checked={item.count === 0 ? false : questionMode[item.id] || false}
									onChange={handleQuestionModeChange}
								/>
								<span className={`ml-2 ${item.count === 0 || item.name === 'Unused' ? 'opacity-50' : ''}`}>
                  {item.name}
									<span className="rounded-full border border-purple-400 px-2 py-1 ml-1">{item.count}</span>
                </span>
							</label>
						</div>
					))}
				</div>
				
				<h1 className="text-xl my-2">
					Test Modules
				</h1>
				<hr/>
				<div className="w-1/3">
					<label className="mb-2 inline-block cursor-pointer">
						<input
							type="checkbox"
							name={'all_modules'}
							checked={all_modules}
							onChange={handleAllModulesChange}
						/>
						<span className="ml-2 font-bold">All Modules</span>
					</label>
				</div>
				<div className="flex flex-wrap mb-5 mt-2 ml-4">
					{moduleListForLesson && moduleListForLesson?.map((item) => (
						<div className="w-1/2" key={item.id}>
							<label className="mb-2 inline-block cursor-pointer">
								<input
									type="checkbox"
									name={item.id}
									disabled={item.count === 0}
									checked={item.count === 0 ? false : checkedItems[item.id] || false}
									onChange={handleCheckboxChange}
								/>
								<span className="ml-2">{item.name}
									<span className="rounded-full border border-purple-400 px-2 py-1 ml-1">{item.count}</span>
                </span>
							</label>
						</div>
					))}
				</div>
			
			</div>
			
			<div className="card">
				<h1 className="text-xl">Lessons</h1>
				<hr/>
				
				<div className="w-1/3 mt-5">
					<label className="mb-2 inline-block cursor-pointer">
						<input
							type="checkbox"
							name={'all_systems'}
							checked={all_systems}
							onChange={handleAllSystemChange}
						/>
						<span className="ml-2 font-bold">All Lessons</span>
					</label>
				</div>
				<div className="flex flex-wrap mb-5 ml-4">
					{systemListForLesson?.length > 0 && systemListForLesson?.map((item) => (
						<div className="w-1/2" key={item.id}>
							<label className="mb-2 inline-block cursor-pointer">
								<input
									type="checkbox"
									name={item.id}
									checked={item.count === 0 ? false : systemItems[item.id] || false}
									onChange={handleSystemChange}
									disabled={item.count === 0}
								/>
								<span className={`ml-2 ${item.count === 0 ? 'opacity-50' : ''}`}>
									{item?.lesson}
									<span className="rounded-full border border-purple-400 px-2 py-1 ml-1">{item.count}</span>
                </span>
							</label>
						</div>
					))}
				</div>
				<hr/>
			</div>
			
			<div className="card">
				{isSubmitted ? (
					<button
						type="button"
						disabled
						className="btn-primary flex gap-3 items-center justify-between"
					>
						<AiOutlineLoading3Quarters className="animate-spin"/>
						Processing...
					</button>
				) : (
					<div className="flex items-end gap-4">
						<button
							className="btn-primary"
							onClick={pastTest}
							disabled={
								(
									!Object.values(checkedItems).some((key) => key === true) ||
									!Object.values(systemItems).some((key) => key === true) ||
									!countValidation()
								)
							}
						>
							Start Test
						</button>
						<div className="flex items-center gap-2">
							<input
								type="text"
								id="count"
								className="border p-2 outline-none rounded w-[60px]"
								value={test_count || ''}
								onChange={(e) => {
									const re = /^[0-9\b]+$/;
									
									if (e.target.value === '' || re.test(e.target.value)) {
										setTestCount(Number(e.target.value))
									}
								}}
							/>
							<label htmlFor="count">Max allowed per block{`(${totalCount > 40 ? 40 : totalCount})`}, count{`(${totalCount})`}</label>
						</div>
					</div>
				)}
			</div>
		
		</>
	);
};

export default CreateLessonTest;