import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {AiOutlineClose, AiOutlineLoading3Quarters} from "react-icons/ai";
import {getGroupBinding, updateGroupBinding} from "../../features/modules/moduleSlice";

const AddTeacherModal = ({ isModalOpen, groupName, groupId, closeModal, teacherId }) => {
	const dispatch = useDispatch();
	const {teacherList} = useSelector(({module}) => module);
	
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [teacher, setTeacher] = useState(null)
	
	useEffect(() => {
		if (teacherId !== null) setTeacher(teacherId)
	}, [teacherId]);
	
	const updateTeacher = () => {
		if (isSubmitted) return;
		const data = {
			teacher: Number(teacher) === 0 ? null : Number(teacher)
		}
		dispatch(updateGroupBinding({
			id: Number(groupId),
			data
		})).then(({payload}) => {
			console.log(payload)
			if (payload?.id) {
				closeModal()
				setTeacher(null)
				dispatch(getGroupBinding({page_size: 10}));
				setIsSubmitted(false)
			}
		})
		setIsSubmitted(true)
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
					<div className="bg-gray-100 p-4 flex justify-between items-center">
						<h3 className="text-lg font-medium text-gray-900">Add Teacher</h3>
						<div
							onClick={() => {
								setTeacher(null)
								closeModal()
							}}
							className={'cursor-pointer mb-4'}
						>
							<AiOutlineClose size={20}/>
						</div>
					</div>
					<div className="p-4">
						<div
							className="input flex flex-col w-full"
						>
							<label htmlFor="name">Group Name</label>
							<input
								type="text"
								id={'name'}
								className={`py-2.5 px-2 rounded mt-2 outline-none border`}
								value={groupName}
								disabled={true}
							/>
						</div>
						
						<div className="flex items-end justify-between">
							<div
								className="input flex flex-col w-[90%] mt-4"
							>
								<label htmlFor="name">Teacher Name</label>
								<select
									value={teacher || ''}
									onChange={(e) => setTeacher(e.target.value)}
									className={`py-2.5 px-2 rounded mt-2 outline-none border`}
								>
									<option value={null}>select...</option>
									{teacherList && teacherList?.results?.map((item) => (
										<option value={item?.id}>{item?.name}</option>
									))}
								</select>
							</div>
							
							<div
								onClick={() => {
									setTeacher(null)
								}}
								className={'cursor-pointer mb-4'}
							>
								<AiOutlineClose size={20}/>
							</div>
						</div>
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
								<AiOutlineLoading3Quarters className="animate-spin"/>
								Processing...
							</button>
						) : (
							<button
								type="submit"
								className="btn-success"
								onClick={updateTeacher}
							>
								Save
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddTeacherModal;
