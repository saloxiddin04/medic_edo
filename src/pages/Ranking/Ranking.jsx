import React, {useState} from 'react';
import {FaCoins, FaStar, FaUsers} from "react-icons/fa";

const Ranking = () => {
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
	
	return (
		<div className="card">
			{/* Top Tabs */}
			<div className="mb-1 flex justify-center">
				<div className="flex gap-2 mb-1 w-full bg-[#f5f5f5] py-2 px-4 rounded">
					{topTabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTopTab(tab.id)}
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
							onClick={() => setActiveBottomTab(tab.id)}
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
			
			<div className="flex justify-center flex-wrap mt-4">
				<div className="w-full md:w-2/6 flex justify-evenly items-start ranking h-[250px]">
					<h1 className="mt-5">test2</h1>
					<h1 className="-mt-5">test1</h1>
					<h1 className="mt-16">test3</h1>
				</div>
				{/*<div className="w-full">*/}
				{/*	<img src={RANKING} alt="ranking" className="mx-auto"/>*/}
				{/*</div>*/}
			</div>
		</div>
	);
};

export default Ranking;