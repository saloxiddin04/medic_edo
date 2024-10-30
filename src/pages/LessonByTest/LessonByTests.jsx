import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTests} from "../../features/modules/moduleSlice";
import {AiFillDelete, AiFillEdit, AiOutlineClose} from "react-icons/ai";
import LoadingPage from "../LoadingPage";
import {
	deleteLessonByTest,
	getLessonsByTests,
	questionsDetail
} from "../../features/LessonsByTests/LessonsByTestsSlice";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {FaUsers} from "react-icons/fa";
import DeleteConfirm from "../../components/DeleteConfirm";
import LessonByTestModal from "./LessonByTestModal";
import CreateLessonByTest from "./CreateLessonByTest";

const LessonByTests = () => {
	
	const dispatch = useDispatch()
	const {loading, lessonByTestsList, questionDetail} = useSelector(({lessonByTest}) => lessonByTest)
	
	const [searchTestState, setTestUser] = useState(localStorage.getItem('searchLessonByTest') || '');
	
	const [deleteModal, setDeleteModal] = useState(false)
	const [id, setId] = useState(null)
	
	const [questionModal, setQuestionModal] = useState(false)
	
	const page = localStorage.getItem("lessonByTest");
	
	useEffect(() => {
		dispatch(getLessonsByTests({page_size: 10, page}))
	}, []);
	
	useEffect(() => {
		if (questionModal) {
			dispatch(questionsDetail({id}))
		}
	}, [dispatch, questionModal]);
	
	const handlePageChange = (page) => {
		if (searchTestState === '') {
			localStorage.setItem("lessonByTest", page.toString());
			localStorage.setItem("currentPage", page.toString());
			dispatch(getLessonsByTests({page_size: 10, page}));
		} else {
			localStorage.setItem("lessonByTest", page.toString());
			localStorage.setItem("currentPage", page.toString());
			dispatch(getLessonsByTests({page_size: 10, page, search: searchTestState}))
		}
	};
	
	const confirmDelete = () => {
		dispatch(deleteLessonByTest(id)).then(({payload}) => {
			console.log(payload)
		})
	}
	
	const closeDeleteModal = () => {
		setDeleteModal(false)
	}
	
	const handleDetailModal = (id) => {
		setId(id)
		setQuestionModal(true)
	}
	
	const timeoutId = useRef()
	
	const searchTestFunc = (value) => {
		setTestUser(value)
		clearTimeout(timeoutId.current)
		timeoutId.current = setTimeout(() => {
			dispatch(getLessonsByTests({page_size: 10, page: 1, search: value}))
		}, 500)
	}
	
	return (
		<>
			<div className="card">
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<input
							className="border focus:border-blue-400 py-2 mt-1 px-2.5 rounded"
							type={'text'}
							value={searchTestState}
							onChange={(e) => {
								const {value} = e.target
								if (searchTestState !== '') {
									setTestUser(value)
									searchTestFunc(value)
								} else {
									localStorage.setItem('ModuleTest', '1')
									localStorage.setItem('currentPage', '1')
									localStorage.setItem('searchTestState', value)
									setTestUser(value)
									searchTestFunc(value)
								}
							}}
							placeholder={'Search Lesson Test'}
						/>
						<div
							className={'cursor-pointer'}
							onClick={() => {
								localStorage.removeItem('searchTestState')
								localStorage.removeItem('lessonByTest')
								localStorage.removeItem('currentPage')
								setTestUser('')
								dispatch(getLessonsByTests({page_size: 10, page}))
							}}
						>
							<AiOutlineClose size={20}/>
						</div>
					</div>
					
					<button
						className="btn-primary mt-1 inline-block"
					>
						Create Lesson By Test
					</button>
				</div>
				
				<div className="flex flex-col mt-3">
					<div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								{loading ? <LoadingPage/> : (
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												ID
											</th>
											<th
												scope="col"
												className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Lesson name
											</th>
											<th
												scope="col"
												className="px-7 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Tests length
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Action
											</th>
										</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
										{lessonByTestsList && lessonByTestsList?.results?.map((item) => (
											<tr key={item.id}>
												<td className="px-6 py-4 whitespace-nowrap text-center">
													{item.id}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-center">
													{item?.lesson}
												</td>
												<td className="px-1 py-4 whitespace-nowrap text-center">
													<div
														className="flex gap-2 items-center justify-center cursor-pointer"
														onClick={() => handleDetailModal(item.id)}
													>
														<FaUsers size={'22'}/>
														{item?.question?.length}
													</div>
												</td>
												<td
													className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
													<button
														className="btn-warning btn-sm inline-block"
														// to={`/create-module-test/${item.id}`}
													>
                        <span>
                          <AiFillEdit/>
                        </span>
													</button>
													
													<button
														className="btn-danger btn-sm ml-3"
														onClick={() => {
															setId(item?.id)
															setDeleteModal(true)
														}}
													>
														<AiFillDelete/>
													</button>
												</td>
											</tr>
										))}
										</tbody>
									</table>
								)}
							</div>
						</div>
					</div>
				</div>
				
				<div className="w-full flex justify-end">
					<Pagination
						totalItems={lessonByTestsList?.count}
						itemsPerPage={10}
						onPageChange={handlePageChange}
					/>
				</div>
				
				<DeleteConfirm isModalOpen={deleteModal} confirm={confirmDelete} closeModal={closeDeleteModal}/>
				
				{
					questionModal &&
					<LessonByTestModal
						isModalOpen={questionModal}
						modulId={id}
						closeModal={() => {
							setQuestionModal(false);
							setId(null)
						}}
					/>
				}
				
				<CreateLessonByTest isModalOpen={true} />
			</div>
		</>
	);
};

export default LessonByTests;