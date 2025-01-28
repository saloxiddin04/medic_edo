import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {getAttendance, patchAttendance, postAttendance} from "../../features/attendance/attendanceSlice";
import {useLocation, useParams} from "react-router-dom";
import {getUserData} from "../../auth/jwtService";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {LuChevronsLeft, LuChevronsRight} from "react-icons/lu";

const Attendance = () => {
	const dispatch = useDispatch();
	const {id} = useParams()
	const {state} = useLocation()
	
	const tableRef = useRef(null);
	
	const { loading, attendance } = useSelector((state) => state.attendance);
	
	const [currentDate, setCurrentDate] = useState(new Date());
	
	const [shouldScrollToCurrentDay, setShouldScrollToCurrentDay] = useState(true);
	
	// Calculate days in the current month
	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	
	const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	
	useEffect(() => {
		// Get the index of the current date in the daysArray
		if (shouldScrollToCurrentDay) {
			const today = moment().format("D");
			const currentDayIndex = daysArray.indexOf(parseInt(today));
			
			// Scroll to the column of the current day
			if (tableRef.current && currentDayIndex !== -1) {
				const headerCells = tableRef.current.querySelectorAll("thead th");
				const targetCell = headerCells[currentDayIndex + 1]; // +1 to account for the "Name" column
				
				if (targetCell) {
					targetCell.scrollIntoView({behavior: "smooth", inline: "center"});
					setShouldScrollToCurrentDay(false);
				}
			}
		}
	}, [daysArray, shouldScrollToCurrentDay, dispatch, currentDate]);
	
	useEffect(() => {
		setShouldScrollToCurrentDay(true);
	}, [currentDate]);
	
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
	
	const handleYearChange = (direction) => {
		setCurrentDate((prevDate) => {
			const newDate = new Date(prevDate);
			newDate.setFullYear(newDate.getFullYear() + (direction === "prev" ? -1 : 1));
			return newDate;
		});
	};
	
	// Handle attendance change
	const handleChange = (e, existAttendance, user, date, attendance_id) => {
		e.preventDefault()
		
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
				<h1 className="text-xl font-bold mb-4">Attendance Table {" "} <span className="text-sm">({state?.group_name})</span></h1>
				<div className="flex items-center justify-between mb-4">
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						onClick={() => setCurrentDate(new Date())}
					>
						Current
					</button>
					<div className="flex items-center gap-2">
						<div className="flex gap-1">
							<button
								onClick={() => handleYearChange("prev")}
								className="p-2 bg-gray-200 rounded hover:bg-gray-300"
							>
								<LuChevronsLeft/>
							</button>
							<button
								onClick={() => handleMonthChange("prev")}
								className="p-2 bg-gray-200 rounded hover:bg-gray-300"
							>
								<BiChevronLeft/>
							</button>
						</div>
						<span className="font-medium">{getMonthYearLabel()}</span>
						<div className="flex gap-1">
							<button
								onClick={() => handleMonthChange("next")}
								className="p-2 bg-gray-200 rounded hover:bg-gray-300"
							>
								<BiChevronRight/>
							</button>
							<button
								onClick={() => handleYearChange("next")}
								className="p-2 bg-gray-200 rounded hover:bg-gray-300"
							>
								<LuChevronsRight/>
							</button>
						</div>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table ref={tableRef} className="table-auto w-full border-collapse border border-gray-300">
						<thead>
						<tr className="bg-gray-200">
							<th className="text-xs border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200">
								Name
							</th>
							{daysArray.map((day) => (
								<th key={day} className="text-xs border border-gray-300 px-2 py-1">
									{day}{" "}
									{currentDate.toLocaleString("default", {
										month: "short",
									})}
								</th>
							))}
						</tr>
						</thead>
						<tbody>
						{attendance?.map((user) => (
							<tr key={user.id}>
								<td className="text-xs border border-gray-300 px-4 py-2 sticky left-0 bg-white z-10">
									{user.name}
								</td>
								{daysArray.map((day, index) => {
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
										isAdmin ||
										(isTeacher && moment(currentDate).date(day).isSame(moment(), "day"));
									
									const isCurrentDate = moment().isSame(moment(currentDate).date(day), "day");
									
									return (
										<td
											key={day}
											className={`border border-gray-300 px-4 py-2 text-xs ${!isEditable ? 'bg-gray-100' : ''} ${isCurrentDate ? 'border-2 border-x-blue-500' : ''}`}
										>
											<select
												value={existAttendance?.status || ""}
												onChange={(e) =>
													handleChange(
														e,
														existAttendance,
														user?.id,
														date,
														existAttendance?.id
													)
												}
												disabled={!isEditable}
												className={`focus:outline-none disabled:opacity-25 p-2 border border-gray-300 rounded ${
													existAttendance?.status
														? existAttendance?.status === "was"
															? "bg-green-500 text-white"
															: "bg-red-500 text-white"
														: ""
												}`}
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
