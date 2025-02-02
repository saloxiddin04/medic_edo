import React, {useEffect, useState} from 'react';
import {FaChevronRight, FaCoins, FaStar, FaTrophy, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getCoins, getScores} from "../../features/Ranking/RankingSlice";
import {getUserData} from "../../auth/jwtService";
import {AiFillEdit} from "react-icons/ai";
import UpdateRankingModal from "./UpdateRankingModal";
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
	
	const {coins, scores, currentUser, scoresPagination, coinsPagination} = useSelector((state) => state.ranking)
	
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
		1: <GiRank3 className="text-yellow text-2xl" />,
		2: <GiRank2 className="text-gray-600 text-2xl" />,
		3: <GiRank1 className="text-orange-700 text-2xl" />
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
						<div className="flex flex-col items-center my-6 mt-20 md:mt-16">
							<div className="flex justify-center items-end relative w-full md:w-2/4 h-[300px] ranking">
								
								{/* 2nd Place */}
								<div className="flex flex-col items-center justify-start w-1/4">
									<FaTrophy size={50} color="rgb(209 213 219)"/>
									<div
										className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(scores[1]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{scores[1]?.name}</h3>
									<div
										className="bg-gray-200 text-center w-full h-32 flex items-start justify-center rounded-t-md shadow-md pt-5">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">2</h3>
									</div>
								</div>
								
								{/* 1st Place */}
								<div className="flex flex-col items-center w-1/3">
									<FaTrophy size={50} color="rgb(255 207 0)"/>
									<div
										className="bg-yellow w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(scores[0]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{scores[0]?.name}</h3>
									<div
										className="bg-yellow text-center w-full h-48 flex items-start justify-center rounded-t-md shadow-md pt-5">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">1</h3>
									</div>
								</div>
								
								{/* 3rd Place */}
								<div className="flex flex-col items-center w-1/4">
									<FaTrophy size={50} color="rgb(253 186 116)"/>
									<div
										className="bg-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(scores[2]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{scores[2]?.name}</h3>
									<div
										className="bg-orange-300 text-center w-full h-24 flex items-center justify-center rounded-t-md shadow-md">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">3</h3>
									</div>
								</div>
							
							</div>
						</div>
						
						<div className="overflow-y-auto">
							<table className="w-full lg:w-[60%] mx-auto divide-y divide-gray-200 border">
								<thead className="bg-gray-50">
								<tr>
									<th scope="col"
									    className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										№
									</th>
									<th
										scope="col"
										className="px-16 sm:px-20 md:px-24 lg:px-28 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Full Name
									</th>
									<th scope="col"
									    className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										Score
									</th>
									{getUserData().role === "admin" && (
										<th scope="col"
										    className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
											Action
										</th>
									)}
								</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 text-center">
								{scores?.map((item, index) => (
									<tr key={index}>
										<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
											{rankIcons[item?.rank] || item?.rank}
										</td>
										<td className="px-2 sm:px-20 md:px-24 lg:px-28 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
					              <span
						              className="rounded-full bg-gray-300 w-8 h-8 text-dark text-xs flex justify-center items-center">
					                {getInitialsName(item?.name)}
					              </span>
												<span className="text-xs">{item.name}</span>
											</div>
										</td>
										<td
											className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">
											{item.score} <FaStar size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
												<button className="btn-warning btn-sm ml-3"
												        onClick={() => handleOpenModal(item?.id, null, item?.score, item?.name)}>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								))}
								</tbody>
							</table>
							
							<table className="mt-4 w-full lg:w-[60%] mx-auto divide-y divide-gray-200 border">
								{currentUser?.rank && (
									<tr className="bg-blue-100">
										<td className="px-4 sm:px-6 py-4 whitespace-nowrap flex items-center gap-2">
											<FaChevronRight className="text-dark text-xl"/> {currentUser?.rank}
										</td>
										<td className="px-4 sm:px-20 md:px-24 lg:px-28 py-4 whitespace-nowrap text-start">
											<div className="flex items-center gap-2">
						            <span
							            className="rounded-full bg-gray-300 w-8 h-8 text-dark text-xs flex justify-center items-center">
						              {getInitialsName(currentUser?.name)}
						            </span>
												<span className="text-xs">{currentUser.name}</span>
											</div>
										</td>
										<td
											className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1 justify-end">
											{currentUser.score} <FaStar size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
												<button className="btn-warning btn-sm ml-3"
												        onClick={() => handleOpenModal(currentUser?.id, null, currentUser?.score, currentUser?.name)}>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								)}
							</table>
						</div>
						
						<div className="mt-5 flex justify-center">
							<button
								className="bg-primary p-2 rounded text-white disabled:opacity-25"
								onClick={() => {
									if (scoresPagination?.per_page !== page) {
										setPage(prevState => prevState + 1)
									}
								}}
								disabled={scoresPagination?.per_page === page}
							>
								Load more
							</button>
						</div>
					</>
				)
			case 2:
				return (
					<>
						<div className="flex flex-col items-center my-6 mt-20 md:mt-16">
							<div className="flex justify-center items-end relative w-full md:w-2/4 h-[300px] ranking">
								
								{/* 2nd Place */}
								<div className="flex flex-col items-center justify-start w-1/4">
									<FaTrophy size={50} color="rgb(209 213 219)"/>
									<div
										className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins[1]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{coins[1]?.name}</h3>
									<div
										className="bg-gray-200 text-center w-full h-32 flex items-start justify-center rounded-t-md shadow-md pt-5">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">2</h3>
									</div>
								</div>
								
								{/* 1st Place */}
								<div className="flex flex-col items-center w-1/3">
									<FaTrophy size={50} color="rgb(255 207 0)"/>
									<div
										className="bg-yellow w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins[0]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{coins[0]?.name}</h3>
									<div
										className="bg-yellow text-center w-full h-48 flex items-start justify-center rounded-t-md shadow-md pt-5">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">1</h3>
									</div>
								</div>
								
								{/* 3rd Place */}
								<div className="flex flex-col items-center w-1/4">
									<FaTrophy size={50} color="rgb(253 186 116)"/>
									<div
										className="bg-orange-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
										{getInitialsName(coins[2]?.name)}
									</div>
									<h3 className="text-sm md:text-lg font-semibold text-center">{coins[2]?.name}</h3>
									<div
										className="bg-orange-300 text-center w-full h-24 flex items-center justify-center rounded-t-md shadow-md">
										<h3
											className="text-sm md:text-lg font-semibold w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">3</h3>
									</div>
								</div>
							
							</div>
						</div>
						
						<div className="overflow-y-auto">
							<table className="w-full md:w-[80%] lg:w-[60%] mx-auto divide-y divide-gray-200 border">
								<thead className="bg-gray-50">
								<tr>
									<th scope="col"
									    className="px-4 sm:px-6 md:px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										№
									</th>
									<th scope="col"
									    className="px-4 sm:px-6 md:px-24 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										Full Name
									</th>
									<th scope="col"
									    className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
										Coins
									</th>
									{getUserData().role === "admin" && (
										<th scope="col"
										    className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
											Action
										</th>
									)}
								</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
								{coins?.map((item, index) => (
									<tr key={index}>
										<td className="px-4 sm:px-6 md:px-10 py-4 whitespace-nowrap text-center">
											{rankIcons[item?.rank] || item?.rank}
										</td>
										<td className="px-4 sm:px-6 md:px-24 py-4 whitespace-nowrap text-start">
											<div className="flex items-center gap-2">
					              <span
						              className="rounded-full bg-gray-300 w-8 h-8 text-dark text-xs flex justify-center items-center">
					                {getInitialsName(item?.name)}
					              </span>
												<span className="text-xs">{item.name}</span>
											</div>
										</td>
										<td
											className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-center">
											{item?.coin} <FaCoins size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
												<button
													className="btn-warning btn-sm ml-3"
													onClick={() => handleOpenModal(item?.id, item?.coin, null, item?.name)}
												>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								))}
								</tbody>
							</table>
							
							<table className="mt-4 w-full md:w-[80%] lg:w-[62%] mx-auto divide-y divide-gray-200 border">
								{currentUser?.rank && (
									<tr className="bg-blue-100">
										<td className="px-4 sm:px-6 md:px-10 py-4 whitespace-nowrap flex items-center gap-2">
											<FaChevronRight className="text-dark text-xl"/> {currentUser?.rank}
										</td>
										<td className="px-4 sm:px-6 md:px-24 py-4 whitespace-nowrap text-start">
											<div className="flex items-center gap-2">
						            <span
							            className="rounded-full bg-gray-300 w-8 h-8 text-dark text-xs flex justify-center items-center">
						              {getInitialsName(currentUser?.name)}
						            </span>
												<span className="text-xs">{currentUser.name}</span>
											</div>
										</td>
										<td
											className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 flex items-center gap-1 justify-start">
											{currentUser?.coin} <FaCoins size={20} color="rgb(255 207 0)"/>
										</td>
										{getUserData().role === 'admin' && (
											<td className="px-4 sm:px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
												<button className="btn-warning btn-sm ml-3"
												        onClick={() => handleOpenModal(currentUser?.id, currentUser?.coin, null, currentUser?.name)}>
													<AiFillEdit/>
												</button>
											</td>
										)}
									</tr>
								)}
							</table>
						</div>
						
						<div className="mt-5 flex justify-center">
							<button
								className="bg-primary p-2 rounded text-white disabled:opacity-25"
								onClick={() => {
									if (coinsPagination?.per_page !== page) {
										setPage(prevState => prevState + 1)
									}
								}}
								disabled={coinsPagination?.per_page === page}
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
				<div className="flex gap-2 mb-1 w-full md:w-[70%] bg-[#f5f5f5] py-2 px-4 rounded">
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
				<div className="flex gap-2 mb-4 w-full lg:w-2/4 bg-[#f5f5f5] py-2 px-4 rounded">
					{bottomTabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => {
								setPage(1)
								setActiveBottomTab(tab.id)
							}}
							className={`py-2 px-4 w-full lg:w-11/12 flex items-center gap-2 rounded-md font-semibold transition ${
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