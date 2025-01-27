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
	const handleChange = (e, existAttendance, user, date, attendance_id) => {
		const data = {
			status: e.target.value,
			author: getUserData()?.id,
			group: state?.group,
			date,
			user,
		};
		
		if (!existAttendance) {
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
			dispatch(patchAttendance({ id: attendance_id, data })).then(({ payload }) => {
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
									
									const role = getUserData()?.role;
									const isTeacher = role === "teacher";
									const isAdmin = role === "admin";
									const isEditable =
										isAdmin || (isTeacher && moment(currentDate).date(day).isSame(moment(), "day"));
									
									return (
										<td key={day} className="border border-gray-300 px-4 py-2">
											<select
												value={existAttendance?.status || ""}
												onChange={(e) =>
													handleChange(e, existAttendance, user?.id, date, existAttendance?.id)
												}
												disabled={!isEditable}
												className={`focus:outline-none disabled:opacity-25 p-2 border border-gray-300 rounded ${existAttendance?.status ? (existAttendance?.status === 'was' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : ''}`}
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
