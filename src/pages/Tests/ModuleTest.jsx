import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";

import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {getTests, searchTests} from "../../features/modules/moduleSlice";

// icon
import {AiFillDelete, AiFillEdit, AiOutlineClose} from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import Pagination from "../../components/Pagination";
import {getUsers} from "../../features/testResults/testResultsSlice";

const ModuleTest = () => {
  const dispatch = useDispatch();
  const {testList} = useSelector(({module}) => module);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [searchTestState, setTestUser] = useState('')
  
  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page.toString());
    dispatch(getTests({page_size: 10, page}));
  };
  
  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setTestToDelete(id);
  };
  
  const closeModal = () => setIsModalOpen(false);
  
  const timeoutId = useRef()
  const searchTestFunc = (value) => {
    setTestUser(value)
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      dispatch(searchTests(value))
    }, 500)
  }
  
  useEffect(() => {
    const page = localStorage.getItem("currentPage");
    dispatch(getTests({page_size: 10, page}));
  }, [dispatch]);
  
  return (
    <div className="card">
      <div className="flex justify-between">
        <div className={'flex items-center gap-5'}>
          <Link
            to={ROUTES.CREATEMODULETEST}
            className="btn-primary mt-1 inline-block"
          >
            Create Test
          </Link>
          <input
            className='border focus:border-blue-400 py-2 mt-1 px-2.5 rounded'
            type={'text'}
            value={searchTestState}
            onChange={(e) => searchTestFunc(e.target.value)}
            placeholder={'Search Test'}
          />
          <div
            className={'cursor-pointer'}
            onClick={() => {
              setTestUser('')
              const page = localStorage.getItem("currentPage");
              dispatch(getTests({page_size: 10, page}))
            }}
          >
            <AiOutlineClose size={20}/>
          </div>
        </div>
        
        <Pagination
          totalItems={testList.count} // Replace with the total number of items you have
          itemsPerPage={10} // Replace with the number of items to display per page
          onPageChange={handlePageChange} // Pass the handlePageChange function
        />
      </div>
      <div className="flex flex-col mt-3">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    Image 1
                  </th>
                  <th
                    scope="col"
                    className="px-7 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Modul
                  </th>
                  <th
                    scope="col"
                    className="px-7 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    System
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Question
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image 2
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image 3
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Correct Answer Key
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
                {testList?.results?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <img src={item?.image3} alt="" className={'w-[100px] h-[40px] object-cover'}/>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-center">
                      {item.modul_name}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-center">
                      {item.sistema_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        <span
                          className="max-w-[200px] inline-block overflow-hidden"
                          dangerouslySetInnerHTML={{__html: item.question}}
                        ></span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <img src={item?.image} alt="" className={'w-[100px] h-[40px] object-cover'}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <img src={item?.image2} alt="" className={'w-[100px] h-[40px] object-cover'}/>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.correct_answer_key}
                    </td>
                    
                    <td
                      className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link
                        className="btn-warning btn-sm inline-block"
                        to={`/create-module-test/${item.id}`}
                      >
                          <span>
                            <AiFillEdit/>
                          </span>
                      </Link>
                      
                      <button
                        className="btn-danger btn-sm ml-3"
                        onClick={() => handleDeleteModal(item.id)}
                      >
                        <AiFillDelete/>
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        testId={testToDelete}
      />
    </div>
  );
};

export default ModuleTest;
