import React, {useEffect, useState} from 'react';
import {FaCoins, FaStar, FaTrophy, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getCoins, getScores} from "../../features/Ranking/RankingSlice";
import {getUserData} from "../../auth/jwtService";
import {AiFillEdit} from "react-icons/ai";
import UpdateRankingModal from "./UpdateRankingModal";
import LoadingPage from "../LoadingPage";

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
						<div className="flex justify-center flex-wrap mt-4">
							<div className="w-full md:w-2/6 flex justify-evenly items-start ranking h-[250px]">
								<h1 className="mt-5">test2</h1>
								<h1 className="-mt-5">test1</h1>
								<h1 className="mt-16">test3</h1>
							</div>
						</div>
						<table className="w-full divide-y divide-gray-200 overflow-y-auto border">
							<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									NO
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Full Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Score
								</th>
								{getUserData().role === "admin" && (
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Action
									</th>
								)}
							</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 text-center">
							{loading
								?
								<tr>
									<td colSpan={4}>
										<div className="py-10 flex justify-center items-center">
						          <span className="relative flex h-16 w-16">
						            <span
							            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
						            <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>
						          </span>
										</div>
									</td>
								</tr>
								:
								scores?.data?.map((item) => (
									<tr key={item.id}>
										<td className="px-6 py-4 whitespace-nowrap text-center">
											{item?.rank}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-center">
										<span
											className="rounded-full bg-gray-300 text-dark p-2">{getInitialsName(item?.name)}</span> {item.name}
										</td>
										<td
											className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">
											{item.score} <FaStar size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td
												className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
											>
												<button
													className="btn-warning btn-sm ml-3"
													onClick={() => {
														handleOpenModal(item?.id, null, item?.score, item?.name)
													}}
												>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								))
							}
							</tbody>
						</table>
						
						<div className="mt-5 flex justify-center">
							<button
								className="bg-primary p-2 rounded text-white disabled:opacity-25"
								onClick={() => {
									if (scores?.per_page !== page) {
										setPage(prevState => prevState + 1)
									}
								}}
								disabled={scores?.per_page === page}
							>
								Load more
							</button>
						</div>
					</>
				)
			case 2:
				return (
					<>
						{/*<div className="flex justify-center flex-wrap mt-16">*/}
						{/*	<div className="w-full md:w-1/2 flex justify-between items-start ranking h-[250px]">*/}
						{/*		<div className="mt-1 flex flex-col items-center">*/}
						{/*			<span*/}
						{/*				className="bg-gray-300 py-2 px-3 rounded-full text-dark">{getInitialsName(coins?.data[1]?.name)}</span>*/}
						{/*			<h3>{coins?.data[1]?.name}</h3>*/}
						{/*		</div>*/}
						{/*		<div className="-mt-12 flex flex-col items-center">*/}
						{/*			<span*/}
						{/*				className="bg-yellow py-2 px-3 rounded-full text-dark">{getInitialsName(coins?.data[0]?.name)}</span>*/}
						{/*			<h3>{coins?.data[0]?.name}</h3>*/}
						{/*		</div>*/}
						{/*		<div className="mt-10 flex flex-col items-center">*/}
						{/*			<span className="bg-orange-400 py-2 px-3 rounded-full text-dark">{getInitialsName(coins?.data[2]?.name)}</span>*/}
						{/*			<h3>{coins?.data[2]?.name}</h3>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*</div>*/}
						
						<div className="flex flex-col items-center my-6">
							<h2 className="text-2xl font-bold mb-1">Ranking</h2>
							<div className="flex justify-evenly items-end relative w-full h-[300px] ranking">
								{/* 2nd Place */}
								<div className="flex flex-col items-center">
									<div>
										<FaTrophy size={50} color="rgb(209 213 219)"/>
									</div>
									<div
										className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins?.data[1]?.name)}
									</div>
									<div
										className="bg-gray-200 text-center w-[95%] h-32 flex items-center justify-center rounded-t-md shadow-md"
									>
										<h3 className="text-lg font-semibold">{coins?.data[1]?.name}</h3>
									</div>
								</div>
								
								{/* 1st Place */}
								<div className="flex flex-col items-center w-[20%]">
									<div>
										<FaTrophy size={50} color="rgb(255 207 0)"/>
									</div>
									<div
										className="bg-yellow w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins?.data[0]?.name)}
									</div>
									<div
										className="bg-yellow text-center w-[95%] h-48 flex items-center justify-center rounded-t-md shadow-md"
									>
										<h3 className="text-lg font-semibold">{coins?.data[0]?.name}</h3>
									</div>
								</div>
								
								{/* 3rd Place */}
								<div className="flex flex-col items-center">
									<div>
										<FaTrophy size={50} color="rgb(253 186 116)"/>
									</div>
									<div
										className="bg-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins?.data[2]?.name)}
									</div>
									<div
										className="bg-orange-300 text-center w-[95%] h-24 flex items-center rounded-t-md shadow-md"
									>
										<h3 className="text-lg font-semibold">{coins?.data[2]?.name}</h3>
									</div>
								</div>
							</div>
						</div>
						
						
						<table className="w-full divide-y divide-gray-200 overflow-y-auto border">
							<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									NO
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Full Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Coins
								</th>
								{getUserData().role === "admin" && (
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Action
									</th>
								)}
							</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
							{loading
								?
								<tr>
									<td colSpan={4}>
										<div className="py-10 flex justify-center items-center">
						          <span className="relative flex h-16 w-16">
						            <span
							            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
						            <span className="relative inline-flex rounded-full h-16 w-16 bg-primary"></span>
						          </span>
										</div>
									</td>
								</tr>
								:
								coins?.data?.map((item) => (
									<tr key={item.id}>
										<td className="px-6 py-4 whitespace-nowrap text-center">
											{item?.rank}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-center">
										<span
											className="rounded-full bg-gray-300 text-dark p-2">{getInitialsName(item?.name)}</span> {item?.name}
										</td>
										<td
											className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">
											{item?.coin} <FaCoins size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td
												className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
											>
												<button
													className="btn-warning btn-sm ml-3"
													onClick={() => {
														handleOpenModal(item?.id, item?.coin, null, item?.name)
													}}
												>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								))
							}
							</tbody>
						</table>
						
						<div className="mt-5 flex justify-center">
							<button
								className="bg-primary p-2 rounded text-white disabled:opacity-25"
								onClick={() => {
									if (coins?.per_page !== page) {
										setPage(prevState => prevState + 1)
									}
								}}
								disabled={coins?.per_page === page}
							>
								Load more
							</button>
						</div>
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
				<div className="flex gap-2 mb-1 w-full bg-[#f5f5f5] py-2 px-4 rounded">
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
				<div className="flex gap-2 mb-4 w-11/12 bg-[#f5f5f5] py-2 px-4 rounded">
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