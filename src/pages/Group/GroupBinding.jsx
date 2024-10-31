import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGroupBinding, getTeacherList} from "../../features/modules/moduleSlice";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import Pagination from "../../components/Pagination";
import {AiFillDelete, AiFillEdit, AiOutlineClose} from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import {FaUsers} from "react-icons/fa";
import DeleteGroupBinding from "./DeleteGroupBinding";
import {FaChevronCircleRight} from "react-icons/fa";
import DetailGroupBinding from "./DetailGroupBinding";
import {getUserData} from "../../auth/jwtService"
import AddTeacherModal from "./AddTeacherModal";

const GroupBinding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {groupBindingList} = useSelector(({module}) => module);

  const timeoutId = useRef()

  const [searchGroupState, setGroupUser] = useState('')

  const storagePage = localStorage.getItem('GroupBinding')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(localStorage.getItem('detailGroupBinding') ? JSON.parse(localStorage.getItem('detailGroupBinding') || '[]') : false);
  const [ModulToDetail, setModulToDetail] = useState(localStorage.getItem('detailGroupBindingModulId') ? JSON.parse(localStorage.getItem('detailGroupBindingModulId') || '[]') : null);
  const [ModulToDelete, setModulToDelete] = useState(null);
  
  const [addTeacherModal, setAddTeacherModal] = useState(false)
  const [groupName, setGroupName] = useState(null)
  const [id, setId] = useState(null)
  const [teacherId, setTeacherId] = useState(null)

  const handlePageChange = (page) => {
    localStorage.setItem("GroupBinding", page.toString());
    dispatch(getGroupBinding({page_size: 10, page}));
  };

  const handleDeleteModal = (id) => {
    setIsModalOpen(true);
    setModulToDelete(id);
  };
  
  const handleAddTeacher = (group, id, teacher_id) => {
    setGroupName(group)
    setId(id)
    setTeacherId(teacher_id)
    setAddTeacherModal(true)
  }
  
  const handleCloseAddTeacher = () => {
    setGroupName(null)
    setId(null)
    setTeacherId(null)
    setAddTeacherModal(false)
  }
  
  const handleDetailModal = (id) => {
    setIsDetailModalOpen(true)
    setModulToDetail(id)
    localStorage.setItem('detailGroupBinding', JSON.stringify(true))
    localStorage.setItem('detailGroupBindingModulId', JSON.stringify(id))
  }

  const closeModalDetail = () => {
    setIsDetailModalOpen(false)
    localStorage.setItem('detailGroupBinding', JSON.stringify(false))
    localStorage.removeItem('detailGroupBindingModulId')
    localStorage.removeItem("DetailGroupBinding");
  }

  const closeModal = () => setIsModalOpen(false);

  const searchUserFunc = (value) => {
    setGroupUser(value)
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      const page = localStorage.getItem("GroupBinding");
      dispatch(getGroupBinding({page_size: 10, page, text: value}))
    }, 500)
  }

  useEffect(() => {
    if (storagePage) {
      dispatch(getGroupBinding({page_size: 10, page: storagePage}));
    } else {
      dispatch(getGroupBinding({page_size: 10}));
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (addTeacherModal) {
      dispatch(getTeacherList({page_size: 1000}))
    }
  }, [dispatch, addTeacherModal]);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className={'flex w-full items-center gap-3'}>
          <input
            type="text"
            placeholder={'Search'}
            className={'w-1/4 border py-2 px-1 divide-y divide-gray-200 rounded'}
            value={searchGroupState}
            onChange={(e) => searchUserFunc(e.target.value)}
          />
          <div
            onClick={() => {
              setGroupUser('')
              const page = localStorage.getItem("GroupBinding");
              dispatch(getGroupBinding({page_size: 10, page}));
            }}
            className={'cursor-pointer'}
          >
            <AiOutlineClose size={20}/>
          </div>
        </div>
        <Link
          to={ROUTES.GROUP_BINDING_BINDING}
          className="btn-primary mt-3 inline-block w-1/6"
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
                    Teacher
                  </th>
                  
                  {getUserData()?.role !== 'teacher' && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  )}
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
                      <div className="flex gap-2 items-center justify-center cursor-pointer"
                           onClick={() => handleDetailModal(item.id)}>
                        <FaUsers size={'22'}/>
                        {item.users.length}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item?.teacher?.name}
                    </td>
                    
                    <td
                      className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      
                      {getUserData()?.role !== 'teacher' && (
                        <>
                          <button
                            className="btn-info btn-sm mr-3"
                            onClick={() => handleAddTeacher(item?.group?.name, item?.id, item?.teacher?.id)}
                          >
                            <GiTeacher/>
                          </button>
                          
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
                            <FaChevronCircleRight/>
                          </button>
                        </>
                      )}
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
      
      <AddTeacherModal
        groupId={id}
        groupName={groupName}
        isModalOpen={addTeacherModal}
        closeModal={handleCloseAddTeacher}
        teacherId={teacherId}
      />
    </div>
  );
}

export default GroupBinding