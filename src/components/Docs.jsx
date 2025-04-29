import React, {useEffect, useRef, useState} from 'react';
import JoditEditor from "jodit-react";
import {IoClose} from "react-icons/io5";
import {useLocation} from "react-router-dom";
import axiosIns from "../plugins/axios";
import {toast} from "react-toastify";
import {getUserData} from "../auth/jwtService";

const Docs = ({isModalOpen, closeModal}) => {
	const {pathname} = useLocation()
	const editor = useRef(null);
	
	const [id, setId] = useState(null)
	const [text, setText] = useState("")
	
	const handleGetDocs = async () => {
		try {
			const response = await axiosIns.get(`/users/docs/?status=${pathname === "/main" ? "QUESTION" : "LESSON"}`)
			return response?.data
		} catch (e) {
			return e;
		}
	}
	
	const handleUpdateDocs = async () => {
		try {
			await axiosIns.patch("/users/docs/", {
				id,
				text,
				status: pathname === "/main" ? "QUESTION" : "LESSON"
			}).then(() => {
				toast.success("Successfully saved!")
				handleGetDocs().then((res) => {
					setId(res?.id)
					setText(res?.text)
				})
			})
		} catch (e) {
			return e;
		}
	}
	
	useEffect(() => {
		if (isModalOpen) {
			handleGetDocs().then((res) => {
				setId(res?.id)
				setText(res?.text)
			})
		}
	}, [isModalOpen])
	
	return (
		<div>
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
					<div className="bg-white w-[90%] lg:w-11/12 rounded-lg overflow-hidden shadow-xl transform transition-all">
						<div className="w-full p-4 flex items-center justify-between flex-col gap-4">
							<button className={'btn-danger btn-sm ml-auto'} onClick={closeModal}>
								<IoClose/>
							</button>
							<div className="w-full lg:w-3/4">
								<JoditEditor
									ref={editor}
									className="mt-1 mb-3"
									defaultValue={text}
									onBlur={(newContent) => setText(newContent)}
									value={text}
									config={{
										readonly: getUserData()?.role !== "admin",
										toolbar: getUserData()?.role === "admin",
									}}
								/>
							</div>
						</div>
						<div className="flex gap-4 ml-auto bg-gray-100 p-4 w-full justify-end">
							<button
								className="btn btn-secondary"
								onClick={() => {
									closeModal()
									setId(null)
									setText("")
								}}
							>
								Cancel
							</button>
							{getUserData()?.role === "admin" && (
								<button className="btn btn-success" onClick={handleUpdateDocs}>Save
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Docs;