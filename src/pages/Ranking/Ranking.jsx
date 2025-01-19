import React, {useEffect, useState} from 'react';
import {FaCoins, FaStar, FaUsers} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {getCoins, getScores} from "../../features/Ranking/RankingSlice";

const Ranking = () => {
	const dispatch = useDispatch()
	
	const {coins, scores} = useSelector((state) => state.ranking)
	
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
	}, [dispatch, activeTopTab, activeBottomTab]);
	
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
					</>
				)
			case 2:
				return (
					<></>
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
			<div className="mt-5 flex justify-center">
				<button
					className="bg-primary p-2 rounded text-white"
				>
					Load more
				</button>
			</div>
		</div>
	);
};

export default Ranking;