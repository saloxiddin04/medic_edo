// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {useLocation, useParams} from "react-router-dom";
// import {getAttendance, patchAttendance, postAttendance} from "../../features/attendance/attendanceSlice";
// import moment from "moment";
// import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
// import {getUserData} from "../../auth/jwtService";
// import LoadingPage from "../LoadingPage";
//
// const Attendance = () => {
// 	const dispatch = useDispatch()
// 	const {id} = useParams()
// 	const {state} = useLocation()
//
// 	const {loading, attendance} = useSelector(state => state.attendance)
//
// 	const [currentDate, setCurrentDate] = useState(new Date());
//
// 	const daysInMonth = new Date(
// 		currentDate.getFullYear(),
// 		currentDate.getMonth() + 1,
// 		0
// 	).getDate();
//
// 	useEffect(() => {
// 		if (id) {
// 			const data = {
// 				group_binding_id: id,
// 				date: moment(currentDate).format('YYYY-MM-DD')
// 			}
// 			dispatch(getAttendance(data))
// 		}
// 	}, [dispatch, id, currentDate]);
//
// 	const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
//
// 	const getMonthYearLabel = () => {
// 		return currentDate.toLocaleString("default", {
// 			month: "long",
// 			year: "numeric",
// 		});
// 	};
//
// 	const handleMonthChange = (direction) => {
// 		setCurrentDate((prevDate) => {
// 			const newDate = new Date(prevDate);
// 			newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
// 			return newDate;
// 		});
// 	};
//
// 	const handleChange = (e, existAttendance, user, date) => {
// 		console.log(existAttendance)
// 		console.log(date)
// 		console.log(moment(currentDate).format('YYYY-MM-DD'))
// 		console.log(!existAttendance && (moment(currentDate).format('YYYY-MM-DD') === date))
// 		const data = {
// 			status: e,
// 			author: getUserData()?.id,
// 			group: state?.group,
// 			date,
// 			user
// 		}
//
// 		if (!existAttendance && (moment(currentDate).format('YYYY-MM-DD') === date)) {
// 			dispatch(postAttendance(data)).then(({payload}) => {
// 				if (payload?.id) {
// 					const dataGet = {
// 						group_binding_id: id,
// 						date: moment(currentDate).format('YYYY-MM-DD')
// 					}
// 					dispatch(getAttendance(dataGet))
// 				}
// 			})
// 		} else {
// 			dispatch(patchAttendance({user, data})).then(({payload}) => {
// 				if (payload?.id) {
// 					const dataGet = {
// 						group_binding_id: id,
// 						date: moment(currentDate).format('YYYY-MM-DD')
// 					}
// 					dispatch(getAttendance(dataGet))
// 				}
// 			})
// 		}
// 	}
//
// 	return (
// 		<div className="card">
// 			<div className="p-4">
// 				<h1 className="text-2xl font-bold mb-4">Attendance</h1>
//
// 				{/* Header with navigation */}
// 				<div className="flex items-center justify-between mb-4">
// 					<button
// 						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// 						onClick={() => setCurrentDate(new Date())}
// 					>
// 						Current
// 					</button>
// 					<div className="flex items-center gap-2">
// 						<button
// 							onClick={() => handleMonthChange("prev")}
// 							className="p-2 bg-gray-200 rounded hover:bg-gray-300"
// 						>
// 							<BiChevronLeft/>
// 						</button>
// 						<span className="font-medium">{getMonthYearLabel()}</span>
// 						<button
// 							onClick={() => handleMonthChange("next")}
// 							className="p-2 bg-gray-200 rounded hover:bg-gray-300"
// 						>
// 							<BiChevronRight/>
// 						</button>
// 					</div>
// 				</div>
//
// 				{/* Attendance Table */}
// 				<div className="overflow-x-auto">
// 					<table className="table-auto w-full border-collapse border border-gray-300">
// 						<thead>
// 						<tr>
// 							<th className="border border-gray-300 px-4 py-2">Name</th>
// 							{daysArray.map((day) => (
// 								<th key={day} className="border border-gray-300 px-2 py-1">
// 									{day}{" "}
// 									{currentDate.toLocaleString("default", {
// 										month: "short",
// 									})}
// 								</th>
// 							))}
// 						</tr>
// 						</thead>
// 						<tbody>
// 						{loading
// 							?
// 							<LoadingPage/>
// 							:
// 							<>
// 								{attendance && attendance?.map((person) => (
// 									<tr key={person?.id}>
// 										<td className="border border-gray-300 px-4 py-2 font-medium">
// 											{person?.name}
// 										</td>
// 										{daysArray?.map((day) => {
// 											console.log(person?.attendance)
//
// 											return (
// 												<td
// 													key={day}
// 													className={`border border-gray-300 px-2 py-1 text-center cursor-pointer`}
// 													// onClick={() => toggleAttendance(person.id, day)}
// 												>
// 													<select
// 														name="attendance"
// 														id="attendance"
// 														// value={attendanceStatus}
// 														onChange={(e) =>
// 															handleChange(
// 																e.target.value,
// 																// attendanceItems[attendanceItems.length - 1],
// 																person?.id,
// 																// moment(cellDate).format('YYYY-MM-DD')
// 															)}
// 														className="focus:outline-none bg-transparent"
// 													>
// 														<option value=""></option>
// 														<option value="was">was</option>
// 														<option value="not">not</option>
// 													</select>
// 												</td>
// 											)
// 											// const attendanceItems = person.attendance.filter((entry) => {
// 											// 	const entryDate = new Date();
// 											// 	return (
// 											// 		entryDate.getDate() === day &&
// 											// 		entryDate.getMonth() === currentDate.getMonth() &&
// 											// 		entryDate.getFullYear() === currentDate.getFullYear()
// 											// 	);
// 											// });
// 											//
// 											// const cellDate = new Date(
// 											// 	currentDate.getFullYear(),
// 											// 	currentDate.getMonth(),
// 											// 	day
// 											// );
// 											//
// 											// const attendanceStatus = attendanceItems.length
// 											// 	? attendanceItems[attendanceItems.length - 1].status // Get the latest status if multiple
// 											// 	: "";
// 											//
// 											// return (
// 											// 	<td
// 											// 		key={day}
// 											// 		className={`border border-gray-300 px-2 py-1 text-center cursor-pointer ${attendanceItems ? (attendanceItems?.status === 'was' ? 'bg-green-500' : 'bg-red-500') : ''}`}
// 											// 		// onClick={() => toggleAttendance(person.id, day)}
// 											// 	>
// 											// 		<select
// 											// 			name="attendance"
// 											// 			id="attendance"
// 											// 			value={attendanceStatus}
// 											// 			onChange={(e) =>
// 											// 				handleChange(
// 											// 					e.target.value,
// 											// 					attendanceItems[attendanceItems.length - 1],
// 											// 					person?.id,
// 											// 					moment(cellDate).format('YYYY-MM-DD')
// 											// 				)}
// 											// 			className="focus:outline-none bg-transparent"
// 											// 		>
// 											// 			<option value=""></option>
// 											// 			<option value="was">was</option>
// 											// 			<option value="not">not</option>
// 											// 		</select>
// 											// 	</td>
// 											// );
// 										})}
// 									</tr>
// 								))}
// 							</>
// 						}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
//
// export default Attendance;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {getAttendance, patchAttendance, postAttendance} from "../../features/attendance/attendanceSlice";
import {useLocation, useParams} from "react-router-dom";
import {getUserData} from "../../auth/jwtService";

const Attendance = () => {
	const dispatch = useDispatch();
	const {id} = useParams()
	const {state} = useLocation()
	const { loading, attendance } = useSelector((state) => state.attendance);
	
	const [currentDate, setCurrentDate] = useState(new Date());
	
	// Calculate days in the current month
	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	
	const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	
	// Fetch attendance data when `id` or `currentDate` changes
	useEffect(() => {
		if (id) {
			const data = {
				group_binding_id: id,
				date: moment(currentDate).format("YYYY-MM-DD"),
			};
			dispatch(getAttendance(data));
		}
	}, [dispatch, id, currentDate]);
	
	// Handle month navigation
	const handleMonthChange = (direction) => {
		setCurrentDate((prevDate) => {
			const newDate = new Date(prevDate);
			newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
			return newDate;
		});
	};
	
	// Handle attendance change
	const handleChange = (e, existAttendance, user, date) => {
		const data = {
			status: e.target.value,
			author: getUserData()?.id,
			group: attendance.group,
			date,
			user,
		};
		
		if (!existAttendance && moment(currentDate).format("YYYY-MM-DD") === date) {
			// POST new attendance
			dispatch(postAttendance(data)).then(({ payload }) => {
				if (payload?.id) {
					const dataGet = {
						group_binding_id: id,
						date: moment(currentDate).format("YYYY-MM-DD"),
					};
					dispatch(getAttendance(dataGet));
				}
			});
		} else {
			// PATCH existing attendance
			dispatch(patchAttendance({ id: user, data })).then(({ payload }) => {
				if (payload?.id) {
					const dataGet = {
						group_binding_id: id,
						date: moment(currentDate).format("YYYY-MM-DD"),
					};
					dispatch(getAttendance(dataGet));
				}
			});
		}
	};
	
	// Get current month and year label
	const getMonthYearLabel = () => {
		return currentDate.toLocaleString("default", {
			month: "long",
			year: "numeric",
		});
	};
	
	return (
		<div className="card">
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-4">Attendance Table</h1>
				<div className="flex justify-between items-center mb-4">
					<button
						onClick={() => handleMonthChange("prev")}
						className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
					>
						Previous
					</button>
					<span className="text-xl font-semibold">{getMonthYearLabel()}</span>
					<button
						onClick={() => handleMonthChange("next")}
						className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
					>
						Next
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="table-auto w-full border-collapse border border-gray-300">
						<thead>
						<tr className="bg-gray-200">
							<th className="border border-gray-300 px-4 py-2">Name</th>
							{daysArray.map((day) => (
								<th key={day} className="border border-gray-300 px-4 py-2">
									{day}
								</th>
							))}
						</tr>
						</thead>
						<tbody>
						{attendance?.map((user) => (
							<tr key={user.id}>
								<td className="border border-gray-300 px-4 py-2">{user.name}</td>
								{daysArray.map((day) => {
									const date = moment(currentDate)
										.date(day)
										.format("YYYY-MM-DD");
									const existAttendance = user.attendance.find(
										(a) => moment(a.date).format("YYYY-MM-DD") === date
									);
									return (
										<td key={day} className="border border-gray-300 px-4 py-2">
											<select
												value={existAttendance?.status || ""}
												onChange={(e) =>
													handleChange(e, existAttendance, user?.id, date)
												}
												className="p-2 border border-gray-300 rounded"
											>
												<option value="">--</option>
												<option value="was">Was</option>
												<option value="not">Not</option>
											</select>
										</td>
									);
								})}
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Attendance;
