import React, {useEffect, useMemo} from 'react';
import {MdOutlinePlaylistAdd} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import {CgMoveTask} from "react-icons/cg";
import {getUserData} from "../../auth/jwtService";
import {useDispatch, useSelector} from "react-redux";
import {
	getResultUserStatistic,
	getTopFiveStudentsLesson,
	getTopModulesLesson, getUserResultHistoryLesson
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import {Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, Tooltip, XAxis, YAxis} from "recharts";
import {GiPlainCircle} from "react-icons/gi";
import {IoReload} from "react-icons/io5";
import {BiChevronRightCircle} from "react-icons/bi";

const PassLesson = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const {
		loading,
		resultUserStatistic,
		topFiveStudents,
		topModules,
		userTestHistory
	} = useSelector(({lessonByTest}) => lessonByTest)
	
	const COLORS = ["#1d89e4", "#ffcf00"];
	const TOP_STUDENTS_COLORS = ['#2C728C', '#AAC6D1', '#A7ECF5', '#E6E6E6', '#0092ED']
	
	const adminData = [
		{
			name: "Count of correct answers",
			value: resultUserStatistic?.correct_answer_count,
		},
		{
			name: "Count of incorrect answers",
			value: resultUserStatistic?.worning_count,
		},
	];
	
	// const userCompareResult = [
	// 	{
	// 		name: 'Peers accuracy',
	// 		value: userResultCompare?.peers_accuracy
	// 	},
	// 	{
	// 		name: 'Your accuracy',
	// 		value: userResultCompare?.your_accuracy
	// 	}
	// ]
	
	let option = useMemo(() => {
		return {
			title: {
				text: "",
				subtext: "",
			},
			tooltip: {
				trigger: "axis",
			},
			legend: {
				data: ["Users count"],
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ["line", "bar"]},
					restore: {show: true},
					saveAsImage: {show: true},
				},
			},
			calculable: true,
			
			xAxis: {
				type: "category",
				data: [],
				axisLabel: {
					interval: 0,
					fontSize: "10",
				},
			},
			
			yAxis: [
				{
					type: "value",
				},
			],
			series: {
				name: "Number of students",
				type: "bar",
				data: [],
				markPoint: {
					data: [
						{
							name: "Your point",
							value: null,
							xAxis: null,
							yAxis: null,
							itemStyle: {
								color: "yellow",
							},
						},
						{
							name: "Minimum point",
							value: 196,
							xAxis: 3,
							yAxis: 1,
							itemStyle: {
								color: "black",
							},
						},
					],
				},
			},
		};
	}, []);
	
	useEffect(() => {
		dispatch(getTopFiveStudentsLesson());
		dispatch(getTopModulesLesson())
		dispatch(getResultUserStatistic(getUserData()?.id))
		dispatch(getUserResultHistoryLesson(getUserData()?.id))
	}, [dispatch]);
	
	const renderCustomizedLabel = (props) => {
		const {x, y, width, height, value} = props;
		const offsetNumber = value?.toString()?.length < 5 ? -40 : -80;
		
		const fireOffset = value?.toString()?.length;
		const offset = fireOffset ? offsetNumber : 10;
		
		return (
			<text
				x={x + width - offset}
				y={y + height - 20}
				fill="#343B45"
				textAnchor="end"
			>
				{`${value}%`}
			</text>
		);
	};
	
	const renderCustomizedLabelModules = (props) => {
		const {x, y, width, height, value} = props;
		const offsetNumber = value?.toString()?.length < 5 ? -40 : -80;
		
		const fireOffset = value?.toString()?.length;
		const offset = fireOffset ? offsetNumber : 10;
		
		return (
			<text
				x={x + width - offset}
				y={y + height - 20}
				fill="#343B45"
				textAnchor="end"
			>
				{`${value}`}
			</text>
		);
	}
	const renderCustomizedLabelSort = (props) => {
		const {x, y, width, value} = props;
		
		return (
			<text
				x={x + width - 45}
				y={y - 10}
				fill="#343B45"
				textAnchor="end"
			>
				{`${value}`}
			</text>
		);
	}
	
	return (
		<section>
			<div className="flex items-center gap-8">
				<div className="card w-full">
					<div className="flex items-center gap-5">
						<MdOutlinePlaylistAdd size="30" className="text-primary"/>
						<h1 className="text-xl">Lesson By Tests</h1>
					</div>
					<p className="my-5">
						Configure custom tests by choosing test modes, number of questions,
						subjects, and systems.
					</p>
					<Link
						to={ROUTES.CREATE_LESSON_TEST}
						className="btn-primary font-semibold btn-small block w-fit"
					>
						CREATE LESSON TEST
					</Link>
				</div>
			</div>
			
			<div className="card mt-8">
				{(getUserData()?.role === "admin" || getUserData()?.role === "teacher") ? (
					<>
						<h1 className="text-xl mb-5">Performance & Adaptive Review</h1>
						<div className="flex item-center justify-between">
							<div className="flex items-center gap-5">
								<PieChart width={180} height={200}>
									<Pie
										data={adminData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{adminData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip/>
								</PieChart>
								{/*<div>*/}
								{/*	<h2 className="text-lg mb-5">Peer Comparison:</h2>*/}
								{/*	<ul>*/}
								{/*		<li className="flex items-center gap-3 ">*/}
								{/*			<GiPlainCircle className="mt-1 text-primary" size="20"/>*/}
								{/*			<span>*/}
                {/*        {" "}*/}
								{/*				Correct Answers:{" "}*/}
								{/*				<b>*/}
                {/*          {userStatisticsForAdmin?.correct_answer_interest}%*/}
                {/*        </b>*/}
                {/*      </span>*/}
								{/*		</li>*/}
								{/*		<li className="flex items-center gap-3 mt-2">*/}
								{/*			<GiPlainCircle className="mt-1 text-yellow" size="20"/>*/}
								{/*			<span>*/}
                {/*        {" "}*/}
								{/*				Incorrect Answer:{" "}*/}
								{/*				<b>{userStatisticsForAdmin?.worning_interest}%</b>*/}
                {/*      </span>*/}
								{/*		</li>*/}
								{/*	</ul>*/}
								{/*</div>*/}
							</div>
							
							<div className='flex flex-col text-center'>
								<h1>Top 5 students</h1>
								<BarChart
									margin={{
										top: 5,
										right: 50,
										left: 70,
										bottom: 5
									}}
									maxBarsize={10}
									width={400}
									height={250}
									data={topFiveStudents}
									layout="vertical"
								>
									<CartesianGrid strokeDasharray="4 4"/>
									<XAxis type="number" hide height={10}/>
									<YAxis
										height={10}
										type="category"
										dataKey="name"
										axisLine={true}
										tickLine={false}
									/>
									<Bar
										height={10}
										dataKey="value"
										fill="#DBC8A4"
										stackId="value"
										isAnimationActive={false}
									>
										{topFiveStudents && topFiveStudents.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={TOP_STUDENTS_COLORS[index % TOP_STUDENTS_COLORS.length]}
											/>
										))}
										<LabelList
											dataKey="value"
											content={renderCustomizedLabel}
											position="insideRight"
										/>
									</Bar>
								</BarChart>
							</div>
							
							<div className='flex flex-col text-center'>
								<h1>Active modules</h1>
								<BarChart
									margin={{
										top: 5,
										right: 40,
										left: 50,
										bottom: 5
									}}
									width={350}
									height={250}
									data={topModules}
									layout="vertical"
								>
									<CartesianGrid strokeDasharray="3 3"/>
									<XAxis type="number" hide height={10}/>
									<YAxis
										height={10}
										type="category"
										dataKey="modul_name"
										axisLine={true}
										tickLine={false}
									/>
									<Bar
										height={10}
										dataKey="count_moduls"
										fill="#DBC8A4"
										stackId="a"
										isAnimationActive={false}
									>
										{topModules && topModules.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={TOP_STUDENTS_COLORS[index % TOP_STUDENTS_COLORS.length]}
											/>
										))}
										<LabelList
											dataKey="count_moduls"
											content={renderCustomizedLabelModules}
											position="insideRight"
										/>
									</Bar>
								</BarChart>
							</div>
						</div>
					</>
				) : (
					<>
					
					</>
				)}
			</div>
			
			<div className="card"></div>
			
			{(getUserData()?.role !== 'admin' || getUserData()?.role !== 'teacher') && (
				<div className="card mt-8">
					<div>
						<section>
							<div className='flex items-center justify-center text-center gap-8'>
								<div className='border py-2 px-2.5 rounded'>
									<h1>All tests</h1>
									<span>{userTestHistory?.all_test_count}</span>
								</div>
								<div className='border py-2 px-2.5 rounded'>
									<h1>Correct answers</h1>
									<span>{userTestHistory?.correct_answer_count}</span>
								</div>
								<div className='border py-2 px-2.5 rounded'>
									<h1>Unsolved answers</h1>
									<span>{userTestHistory?.unsolved_test}</span>
								</div>
								<div className='border py-2 px-2.5 rounded'>
									<h1>Wrong answers</h1>
									<span>{userTestHistory?.worning_answer_count}</span>
								</div>
							</div>
						</section>
					</div>
					<div className='mt-3'>
						<table className='min-w-full bg-gray-200'>
							<thead className='bg-gray-50'>
							<tr>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									id
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Correct answer
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Wrong answer
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Start test
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Mode
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									End test
								</th>
								<th
									scope={'row'}
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Action
								</th>
							</tr>
							</thead>
							<tbody>
							{userTestHistory && (
								userTestHistory?.tests_history.map((item) => (
									<tr className='bg-white px-2 py-1 text-center mt-2' key={item.id}>
										<td>{item.id}</td>
										<td>{item.correct_answer_count}</td>
										<td>{item.worning_answer_count}</td>
										<td>{item.start_date ? item.start_date?.split('T')[0] : '-'}</td>
										<td>{item.is_tutor ? 'Tutor' : '-'}</td>
										<td>{item.end_date ? item.end_date?.split('T')[0] : '-'}</td>
										<td>
											<button
												className='mt-2 mr-1'
												onClick={() => {
													localStorage.setItem("testID", item.id)
													navigate(`/test`, {state: {is_reload: true}})
												}}
											>
												<IoReload size='30' color={'rgb(29 137 228)'}/>
											</button>
											<button
												className='mt-2'
												onClick={() => {
													localStorage.setItem("testID", item.id)
													navigate(`/test-results`)
												}}
											>
												<BiChevronRightCircle size='30' color={'#28CD41'}/>
											</button>
										</td>
									</tr>
								))
							)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</section>
	);
};

export default PassLesson;