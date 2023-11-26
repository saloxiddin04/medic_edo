import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGroupBinding} from "../../features/modules/moduleSlice";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import Pagination from "../../components/Pagination";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import DeleteGroupBinding from "./DeleteGroupBinding";
import { FaChevronCircleRight } from "react-icons/fa";
import DetailGroupBinding from "./DetailGroupBinding";


const GroupBinding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {groupBindingList} = useSelector(({module}) => module);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [ModulToDetail, setModulToDetail] = useState(null);
  const [ModulToDelete, setModulToDelete] = useState(null);
  
  const handlePageChange = (page) => {
    dispatch(getGroupBinding({page_size: 10, page}));
  };
  
  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setModulToDelete(id);
  };
  
  const handleDetailModal = (id) => {
    setIsDetailModalOpen(true)
    setModulToDetail(id)
  }
  
  const closeModalDetail = () => setIsDetailModalOpen(false)
  
  const closeModal = () => setIsModalOpen(false);
  
  useEffect(() => {
    dispatch(getGroupBinding({page_size: 10, page: 1}));
  }, [dispatch]);
  
  return (
    <div className="card">
      <div className="flex justify-between">
        <input type="text" placeholder={'Search'} className={'w-1/4 border py-1 px-1 divide-y divide-gray-200' +
          ' rounded'}/>
        <Link
          to={ROUTES.GROUP_BINDING_BINDING}
          className="btn-primary mt-3 inline-block"
        >
          Group Binding
        </Link>
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
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Group Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Users length
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
                {groupBindingList?.results?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item?.group?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      <div className='flex gap-2 items-center justify-center cursor-pointer' onClick={() => handleDetailModal(item.id)}>
                        <FaUsers size={'22'}/>
                        {item.users.length}
                      </div>
                    </td>
                    
                    <td
                      className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link
                        className="btn-warning btn-sm inline-block"
                        to={`/create-group-binding/${item.id}`}
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
                      <button
                        className={'btn-success btn-sm ml-3'}
                        onClick={() => navigate(`/create-group-binding/${item.id}`)}
                      >
                        <FaChevronCircleRight />
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className={'w-full flex items-center justify-end'}>
              <Pagination
                totalItems={groupBindingList.count} // Replace with the total number of items you have
                itemsPerPage={10} // Replace with the number of items to display per page
                onPageChange={handlePageChange} // Pass the handlePageChange function
              />
            </div>
          </div>
        </div>
      </div>
      
      <DeleteGroupBinding
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modulId={ModulToDelete}
      />
      
      <DetailGroupBinding
        isModalOpen={isDetailModalOpen}
        closeModal={closeModalDetail}
        modulId={ModulToDetail}
      />
    </div>
  );
}

export default GroupBinding