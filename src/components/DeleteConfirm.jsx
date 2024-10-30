import React from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeleteConfirm = ({ isModalOpen, confirm, closeModal }) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	
	const deleteAction = () => {
		if (isSubmitted) return;
		confirm().then(() => {
			setIsSubmitted(false)
			closeModal()
		})
		setIsSubmitted(true);
	};
	
	return (
		<div
			className={
				isModalOpen
					? "fixed z-10 inset-0 overflow-y-auto"
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
						<h3 className="text-lg font-medium text-gray-900">Delete Group</h3>
					</div>
					<div className="p-4">
						<p className="text-gray-700">
							Are you sure you want to delete this item?
						</p>
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
								className="btn-danger"
								onClick={deleteAction}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirm;
