import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {questionsDetail} from "../../features/LessonsByTests/LessonsByTestsSlice";
import {IoClose} from "react-icons/io5";
import Pagination from "../../components/Pagination";
import LoadingPage from "../LoadingPage";
import {AiOutlineClose} from "react-icons/ai";

const LessonByTestModal = ({isModalOpen, modulId, closeModal}) => {
	const dispatch = useDispatch()
	const {questionDetail, loading} = useSelector(({lessonByTest}) => lessonByTest);
	
	const [searchUserState, setSearchUser] = useState('')
	
	const timeoutId = useRef()
	
	const searchUserFunc = (value) => {
		setSearchUser(value)
		clearTimeout(timeoutId.current)
		timeoutId.current = setTimeout(() => {
			dispatch(questionsDetail({id: modulId, search: value}))
		}, 500)
	}
	
	const handlePageChange = (page) => {
		dispatch(questionsDetail({id: modulId, page_size: 10, page}));
	};
	
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
					<div
						className="bg-white w-11/12 rounded-lg overflow-hidden shadow-xl transform transition-all md:w-11/12">
						<div className="w-full p-4 flex items-center justify-between">
							<div className="flex items-center gap-2 w-4/5">
								<input
									type="text"
									placeholder={'Search'}
									className={'w-1/4 border py-2 px-1 divide-y divide-gray-200 rounded'}
									value={searchUserState}
									onChange={(e) => searchUserFunc(e.target.value)}
								/>
								<div
									onClick={() => {
										setSearchUser('')
										dispatch(questionsDetail({id: modulId, page_size: 10, page: 1}));
									}}
									className={'cursor-pointer'}
								>
									<AiOutlineClose size={20}/>
								</div>
							</div>
							<button className={'btn-danger btn-sm'} onClick={closeModal}>
								<IoClose/>
							</button>
						</div>
						<div className={'w-[97%] overflow-y-auto m-auto'}>
							<table className="w-full divide-y divide-gray-200 border px-4 overflow-y-auto">
								<thead className="whitespace-nowrap">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										ID
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Name
									</th>
								</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
								{questionDetail?.results?.map((item) => (
									<tr key={item.id}>
										<td className="px-6 py-4 whitespace-nowrap text-center">
											{item.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-center">
											<div dangerouslySetInnerHTML={{__html: item?.question}} />
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
						<div className="flex justify-end p-2">
							<Pagination
								totalItems={questionDetail?.count}
								itemsPerPage={10}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	);
};

export default LessonByTestModal;