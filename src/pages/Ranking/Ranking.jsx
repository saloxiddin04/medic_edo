import React, {useEffect, useState} from 'react';
import {FaChevronCircleRight, FaCoins, FaStar, FaTrophy, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getCoins, getScores} from "../../features/Ranking/RankingSlice";
import {getUserData} from "../../auth/jwtService";
import {AiFillEdit} from "react-icons/ai";
import UpdateRankingModal from "./UpdateRankingModal";
import LoadingPage from "../LoadingPage";
import {GiRank1, GiRank2, GiRank3} from "react-icons/gi";

export const getInitialsName = (name) => {
	if (!name) return '';
	const words = name.split(' ');
	if (words.length === 1) {
		return words[0].charAt(0).toUpperCase();
	}
	
	return (
		words[0].charAt(0).toUpperCase() +
		words[1].charAt(0).toUpperCase()
	);
};

const Ranking = () => {
	const dispatch = useDispatch()
	
	const {coins, scores, loading} = useSelector((state) => state.ranking)
	
	// Top tabs state
	const [activeTopTab, setActiveTopTab] = useState(1);
	const topTabs = [
		{id: 1, label: "Scores", icon: <FaStar size={20} color="rgb(255 207 0)"/>},
		{id: 2, label: "Coins", icon: <FaCoins size={20} color="rgb(255 207 0)"/>},
	];
	
	// Bottom tabs state
	const [activeBottomTab, setActiveBottomTab] = useState(1);
	const bottomTabs = [
		{id: 1, label: "By Group", icon: <FaUsers size={20} color="#000"/>},
		{id: 2, label: "All Students", icon: <FaUsers size={20} color="#000"/>},
	];
	
	const [page, setPage] = useState(1)
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [id, setId] = useState(null)
	const [coin, setCoin] = useState(null)
	const [score, setScore] = useState(null)
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		const params = {
			page,
			page_size: 10,
			status: activeBottomTab === 1 ? 'by_groups' : undefined
		}
		
		if (activeTopTab === 1) {
			dispatch(getScores(params))
		} else {
			dispatch(getCoins(params))
		}
	}, [dispatch, activeTopTab, activeBottomTab, page]);
	
	const rankIcons = {
		1: <GiRank1 className="text-yellow text-2xl" />,
		2: <GiRank2 className="text-gray-600 text-2xl" />,
		3: <GiRank3 className="text-orange-700 text-2xl" />
	}
	
	const handleOpenModal = (id, coinProps, scoreProps, user) => {
		setId(id)
		setScore(scoreProps)
		setCoin(coinProps)
		setUser(user)
		setIsModalOpen(true)
	}
	
	const handleCloseModal = () => {
		setScore(null)
		setCoin(null)
		setUser(null)
		setIsModalOpen(false)
	}
	
	const renderRanking = () => {
		switch (activeTopTab) {
			case 1:
				return (
					<>
						{/*<div className="flex flex-col items-center my-6 mt-20 md:mt-6">*/}
						{/*	<div className="flex justify-center items-end relative w-full md:w-2/4 h-[300px] ranking">*/}
						{/*		*/}
						{/*		/!* 2nd Place *!/*/}
						{/*		<div className="flex flex-col items-center justify-start w-1/4">*/}
						{/*			<FaTrophy size={50} color="rgb(209 213 219)"/>*/}
						{/*			<div*/}
						{/*				className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(scores?.data[1]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{scores?.data[1]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-gray-200 text-center w-full h-32 flex items-start justify-center rounded-t-md shadow-md pt-5">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">2</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*		*/}
						{/*		/!* 1st Place *!/*/}
						{/*		<div className="flex flex-col items-center w-1/3">*/}
						{/*			<FaTrophy size={50} color="rgb(255 207 0)"/>*/}
						{/*			<div*/}
						{/*				className="bg-yellow w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(scores?.data[0]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{scores?.data[0]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-yellow text-center w-full h-48 flex items-start justify-center rounded-t-md shadow-md pt-5">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">1</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*		*/}
						{/*		/!* 3rd Place *!/*/}
						{/*		<div className="flex flex-col items-center w-1/4">*/}
						{/*			<FaTrophy size={50} color="rgb(253 186 116)"/>*/}
						{/*			<div*/}
						{/*				className="bg-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(scores?.data[2]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{scores?.data[2]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-orange-300 text-center w-full h-24 flex items-center justify-center rounded-t-md shadow-md">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">3</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*	*/}
						{/*	</div>*/}
						{/*</div>*/}
						
						{/*<div className="overflow-y-auto">*/}
						{/*	<table className="w-[60%] mx-auto divide-y divide-gray-200 border">*/}
						{/*		<thead className="bg-gray-50">*/}
						{/*		<tr>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				NO*/}
						{/*			</th>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-28 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				Full Name*/}
						{/*			</th>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				Score*/}
						{/*			</th>*/}
						{/*			{getUserData().role === "admin" && (*/}
						{/*				<th*/}
						{/*					scope="col"*/}
						{/*					className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*				>*/}
						{/*					Action*/}
						{/*				</th>*/}
						{/*			)}*/}
						{/*		</tr>*/}
						{/*		</thead>*/}
						{/*		<tbody className="bg-white divide-y divide-gray-200 text-center">*/}
						{/*		{loading*/}
						{/*			?*/}
						{/*			<tr>*/}
						{/*				<td colSpan={4}>*/}
						{/*					<div className="py-10 flex justify-center items-center">*/}
						{/*          <span className="relative flex h-16 w-16">*/}
						{/*            <span*/}
						{/*	            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>*/}
						{/*            <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>*/}
						{/*          </span>*/}
						{/*					</div>*/}
						{/*				</td>*/}
						{/*			</tr>*/}
						{/*			:*/}
						{/*			<>*/}
						{/*				{scores?.data?.map((item) => (*/}
						{/*					<tr key={item.id}>*/}
						{/*						<td className="px-10 py-4 whitespace-nowrap text-center">*/}
						{/*							{rankIcons[item?.rank] || item?.rank}*/}
						{/*						</td>*/}
						{/*						<td className="px-24 py-4 whitespace-nowrap text-start">*/}
						{/*						<span*/}
						{/*							className="rounded-full bg-gray-300 text-dark p-2">{getInitialsName(item?.name)}</span> {item.name}*/}
						{/*						</td>*/}
						{/*						<td*/}
						{/*							className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">*/}
						{/*							{item.score} <FaStar size={20} color="rgb(255 207 0)"/>*/}
						{/*						</td>*/}
						{/*						{getUserData().role === 'admin' && (*/}
						{/*							<td*/}
						{/*								className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"*/}
						{/*							>*/}
						{/*								<button*/}
						{/*									className="btn-warning btn-sm ml-3"*/}
						{/*									onClick={() => {*/}
						{/*										handleOpenModal(item?.id, null, item?.score, item?.name)*/}
						{/*									}}*/}
						{/*								>*/}
						{/*									<AiFillEdit/>*/}
						{/*								</button>*/}
						{/*							</td>*/}
						{/*						)}*/}
						{/*					</tr>*/}
						{/*				))}*/}
						{/*				*/}
						{/*				{scores?.current_user?.rank && (*/}
						{/*					<tr className="bg-gray-200">*/}
						{/*						<td className="px-10 py-4 whitespace-nowrap text-center">*/}
						{/*							{scores.current_user.rank}*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						<td className="px-24 py-4 whitespace-nowrap text-start">*/}
						{/*	            <span className="rounded-full bg-gray-300 text-dark p-2">*/}
						{/*	              {getInitialsName(scores.current_user.name)}*/}
						{/*	            </span>{" "}*/}
						{/*							{scores.current_user.name}*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						/!* Score Column *!/*/}
						{/*						<td*/}
						{/*							className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">*/}
						{/*							{scores.current_user.score}{" "}*/}
						{/*							<FaStar size={20} color="rgb(255 207 0)"/>*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						/!* Action Column (Admin Only) *!/*/}
						{/*						{getUserData().role === "admin" && (*/}
						{/*							<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">*/}
						{/*								<button*/}
						{/*									className="btn-warning btn-sm ml-3"*/}
						{/*									onClick={() => {*/}
						{/*										handleOpenModal(*/}
						{/*											scores.current_user.id,*/}
						{/*											null,*/}
						{/*											scores.current_user.score,*/}
						{/*											scores.current_user.name*/}
						{/*										);*/}
						{/*									}}*/}
						{/*								>*/}
						{/*									<AiFillEdit/>*/}
						{/*								</button>*/}
						{/*							</td>*/}
						{/*						)}*/}
						{/*					</tr>*/}
						{/*				)}*/}
						{/*			</>*/}
						{/*		}*/}
						{/*		</tbody>*/}
						{/*	</table>*/}
						{/*</div>*/}
						
						{/*<div className="mt-5 flex justify-center">*/}
						{/*	<button*/}
						{/*		className="bg-primary p-2 rounded text-white disabled:opacity-25"*/}
						{/*		onClick={() => {*/}
						{/*			if (scores?.per_page !== page) {*/}
						{/*				setPage(prevState => prevState + 1)*/}
						{/*			}*/}
						{/*		}}*/}
						{/*		disabled={scores?.per_page === page}*/}
						{/*	>*/}
						{/*		Load more*/}
						{/*	</button>*/}
						{/*</div>*/}
					</>
				)
			case 2:
				return (
					<>
						{/*<div className="flex flex-col items-center my-6 mt-20 md:mt-6">*/}
						{/*	<div className="flex justify-center items-end relative w-full md:w-4/6 h-[300px] ranking">*/}
						{/*		*/}
						{/*		/!* 2nd Place *!/*/}
						{/*		<div className="flex flex-col items-center justify-start w-1/4">*/}
						{/*			<FaTrophy size={50} color="rgb(209 213 219)"/>*/}
						{/*			<div*/}
						{/*				className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(coins?.data[1]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{coins?.data[1]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-gray-200 text-center w-full h-32 flex items-start justify-center rounded-t-md shadow-md pt-5">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">2</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*		*/}
						{/*		/!* 1st Place *!/*/}
						{/*		<div className="flex flex-col items-center w-1/3">*/}
						{/*			<FaTrophy size={50} color="rgb(255 207 0)"/>*/}
						{/*			<div*/}
						{/*				className="bg-yellow w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(coins?.data[0]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{coins?.data[0]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-yellow text-center w-full h-48 flex items-start justify-center rounded-t-md shadow-md pt-5">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">1</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*		*/}
						{/*		/!* 3rd Place *!/*/}
						{/*		<div className="flex flex-col items-center w-1/4">*/}
						{/*			<FaTrophy size={50} color="rgb(253 186 116)"/>*/}
						{/*			<div*/}
						{/*				className="bg-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">*/}
						{/*				{getInitialsName(coins?.data[2]?.name)}*/}
						{/*			</div>*/}
						{/*			<h3 className="text-sm md:text-lg font-semibold text-center">{coins?.data[2]?.name}</h3>*/}
						{/*			<div*/}
						{/*				className="bg-orange-300 text-center w-full h-24 flex items-center justify-center rounded-t-md shadow-md">*/}
						{/*				<h3*/}
						{/*					className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">3</h3>*/}
						{/*			</div>*/}
						{/*		</div>*/}
						{/*	*/}
						{/*	</div>*/}
						{/*</div>*/}
						
						{/*<div className="overflow-y-auto">*/}
						{/*	<table className="w-[60%] mx-auto divide-y divide-gray-200 overflow-y-auto border">*/}
						{/*		<thead className="bg-gray-50">*/}
						{/*		<tr>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				NO*/}
						{/*			</th>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				Full Name*/}
						{/*			</th>*/}
						{/*			<th*/}
						{/*				scope="col"*/}
						{/*				className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*			>*/}
						{/*				Coins*/}
						{/*			</th>*/}
						{/*			{getUserData().role === "admin" && (*/}
						{/*				<th*/}
						{/*					scope="col"*/}
						{/*					className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"*/}
						{/*				>*/}
						{/*					Action*/}
						{/*				</th>*/}
						{/*			)}*/}
						{/*		</tr>*/}
						{/*		</thead>*/}
						{/*		<tbody className="bg-white divide-y divide-gray-200">*/}
						{/*		{loading*/}
						{/*			?*/}
						{/*			<tr>*/}
						{/*				<td colSpan={4}>*/}
						{/*					<div className="py-10 flex justify-center items-center">*/}
						{/*          <span className="relative flex h-16 w-16">*/}
						{/*            <span*/}
						{/*	            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>*/}
						{/*            <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>*/}
						{/*          </span>*/}
						{/*					</div>*/}
						{/*				</td>*/}
						{/*			</tr>*/}
						{/*			:*/}
						{/*			<>*/}
						{/*				{coins?.data?.map((item) => (*/}
						{/*					<tr key={item.id}>*/}
						{/*						<td className="px-10 py-4 whitespace-nowrap text-center">*/}
						{/*							{rankIcons[item?.rank] || item?.rank}*/}
						{/*						</td>*/}
						{/*						<td className="px-24 py-4 whitespace-nowrap text-start">*/}
						{/*							<span*/}
						{/*								className="rounded-full bg-gray-300 text-dark p-2">*/}
						{/*								{getInitialsName(item?.name)}*/}
						{/*							</span> {" "}*/}
						{/*							{item?.name}*/}
						{/*						</td>*/}
						{/*						<td*/}
						{/*							className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">*/}
						{/*							{item?.coin} <FaCoins size={20} color="rgb(255 207 0)"/>*/}
						{/*						</td>*/}
						{/*						{getUserData().role === 'admin' && (*/}
						{/*							<td*/}
						{/*								className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"*/}
						{/*							>*/}
						{/*								<button*/}
						{/*									className="btn-warning btn-sm ml-3"*/}
						{/*									onClick={() => {*/}
						{/*										handleOpenModal(item?.id, item?.coin, null, item?.name)*/}
						{/*									}}*/}
						{/*								>*/}
						{/*									<AiFillEdit/>*/}
						{/*								</button>*/}
						{/*							</td>*/}
						{/*						)}*/}
						{/*					</tr>*/}
						{/*				))}*/}
						{/*				*/}
						{/*				{coins?.current_user?.rank && (*/}
						{/*					<tr className="bg-gray-200">*/}
						{/*						<td className="px-10 py-4 whitespace-nowrap text-center">*/}
						{/*							{coins?.current_user?.rank}*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						<td className="px-24 py-4 whitespace-nowrap text-start">*/}
						{/*	            <span className="rounded-full bg-gray-300 text-dark p-2">*/}
						{/*	              {getInitialsName(coins?.current_user?.name)}*/}
						{/*	            </span>{" "}*/}
						{/*							{coins?.current_user?.name}*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						/!* Score Column *!/*/}
						{/*						<td*/}
						{/*							className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">*/}
						{/*							{coins?.current_user?.coin}{" "}*/}
						{/*							<FaCoins size={20} color="rgb(255 207 0)"/>*/}
						{/*						</td>*/}
						{/*						*/}
						{/*						/!* Action Column (Admin Only) *!/*/}
						{/*						{getUserData().role === "admin" && (*/}
						{/*							<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">*/}
						{/*								<button*/}
						{/*									className="btn-warning btn-sm ml-3"*/}
						{/*									onClick={() => {*/}
						{/*										handleOpenModal(*/}
						{/*											coins?.current_user?.id,*/}
						{/*											coins?.current_user?.coin,*/}
						{/*											null,*/}
						{/*											coins?.current_user?.name*/}
						{/*										);*/}
						{/*									}}*/}
						{/*								>*/}
						{/*									<AiFillEdit/>*/}
						{/*								</button>*/}
						{/*							</td>*/}
						{/*						)}*/}
						{/*					</tr>*/}
						{/*				)}*/}
						{/*			</>*/}
						{/*		}*/}
						{/*		</tbody>*/}
						{/*	</table>*/}
						{/*</div>*/}
						
						{/*<div className="mt-5 flex justify-center">*/}
						{/*	<button*/}
						{/*		className="bg-primary p-2 rounded text-white disabled:opacity-25"*/}
						{/*		onClick={() => {*/}
						{/*			if (coins?.per_page !== page) {*/}
						{/*				setPage(prevState => prevState + 1)*/}
						{/*			}*/}
						{/*		}}*/}
						{/*		disabled={coins?.per_page === page}*/}
						{/*	>*/}
						{/*		Load more*/}
						{/*	</button>*/}
						{/*</div>*/}
					</>
				)
			default:
				return <h1>Wrong tab</h1>
		}
	}
	
	return (
		<div className="card">
			{/* Top Tabs */}
			<div className="mb-1 flex justify-center">
				<div className="flex gap-2 mb-1 w-[70%] bg-[#f5f5f5] py-2 px-4 rounded">
					{topTabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => {
								setPage(1)
								setActiveTopTab(tab.id)
							}}
							className={`py-2 px-4 w-full flex items-center gap-2 rounded-md font-semibold transition ${
								activeTopTab === tab.id
									? "bg-white text-dark"
									: "bg-transparent text-gray-700 hover:bg-gray-300"
							}`}
						>
							{tab.label} {tab.icon}
						</button>
					))}
				</div>
			</div>
			
			{/* Bottom Tabs */}
			<div className="flex justify-center">
				<div className="flex gap-2 mb-4 w-2/4 bg-[#f5f5f5] py-2 px-4 rounded">
					{bottomTabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => {
								setPage(1)
								setActiveBottomTab(tab.id)
							}}
							className={`py-2 px-4 w-11/12 flex items-center gap-2 rounded-md font-semibold transition ${
								activeBottomTab === tab.id
									? "bg-white text-dark"
									: "bg-transparent text-gray-700 hover:bg-gray-300"
							}`}
						>
							{tab.label} {tab.icon}
						</button>
					))}
				</div>
			</div>
			
			{renderRanking()}
			
			<UpdateRankingModal
				isModalOpen={isModalOpen}
				closeModal={handleCloseModal}
				id={id}
				score={score}
				coin={coin}
				user={user}
				page={page}
				activeBottomTab={activeBottomTab}
			/>
		</div>
	);
};

export default Ranking;