import React, {useState} from 'react';
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {getInitialsName} from "./Ranking";
import {FaCoins, FaStar} from "react-icons/fa";
import {getCoins, getScores, updateRank} from "../../features/Ranking/RankingSlice";

const UpdateRankingModal = ({isModalOpen, closeModal, id, score, coin, user, page, activeBottomTab}) => {
	const dispatch = useDispatch();
	const [isSubmitted, setIsSubmitted] = useState(false);
	
	const [update_coin, setCoin] = useState(coin)
	const [update_score, setScore] = useState(score)
	
	const updatedRank = () => {
		if (isSubmitted) return;
		dispatch(updateRank({
			type: score !== null ? 'score' : 'coin',
			data: {
				id,
				score: score !== null ? update_score : undefined,
				coin: coin !== null ? update_coin : undefined,
			}
		})).then(() => {
			const params = {
				page,
				page_size: 10,
				status: activeBottomTab === 1 ? 'by_groups' : undefined
			}
			
			if (score !== null) {
				dispatch(getScores(params))
			} else {
				dispatch(getCoins(params))
			}
			closeModal();
			setIsSubmitted(false);
		})
		setIsSubmitted(true);
	}
	
	return (
		<div
			className={
				isModalOpen
					? "fixed z-50 inset-0 overflow-y-auto"
					: "opacity-0 pointer-events-none"
			}
		>
			<div
				className={
					isModalOpen
						? "flex items-center justify-center min-h-screen"
						: "hidden"
				}
			>
				<div className="fixed inset-0 bg-gray-500 opacity-75"></div>
				<div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
					<div className="bg-gray-100 p-4">
						<h3 className="text-lg font-medium text-gray-900">Update rank</h3>
					</div>
					<div className="p-4 flex flex-col items-center gap-2">
						<span className="py-2 px-3 rounded-full text-dark bg-gray-300">{getInitialsName(user)}</span>
						<h4>{user}</h4>
						{score !== null && score >= 0 && (
							<>
								<FaStar size={20} color="rgb(255 207 0)" />
								<input
									className="border rounded py-2 px-3"
									type="text"
									value={update_score || ''}
									onChange={(e) => setScore(e.target.value)}
								/>
							</>
						)}
						
						{coin !== null && coin >= 0 && (
							<>
								<FaCoins size={20} color="rgb(255 207 0)" />
								<input
									className="border rounded py-2 px-3"
									type="text"
									value={update_coin || ''}
									onChange={(e) => setCoin(e.target.value)}
								/>
							</>
						)}
					</div>
					<div className="bg-gray-100 p-4 flex gap-5 justify-end">
						<button className="btn-secondary" onClick={closeModal}>
							Cancel
						</button>
						{isSubmitted ? (
							<button
								type="button"
								disabled
								className="btn-primary flex gap-3 items-center justify-between"
							>
								<AiOutlineLoading3Quarters className="animate-spin" />
								Processing...
							</button>
						) : (
							<button
								type="submit"
								className="btn-warning"
								onClick={updatedRank}
							>
								Update
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateRankingModal;