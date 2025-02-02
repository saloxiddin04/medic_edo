import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getGroupBinding, getTeacherList} from "../../features/modules/moduleSlice";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Routes/constants";
import Pagination from "../../components/Pagination";
import {AiFillDelete, AiFillEdit, AiOutlineClose} from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import {FaUserCheck, FaUsers} from "react-icons/fa";
import DeleteGroupBinding from "./DeleteGroupBinding";
import {FaChevronCircleRight} from "react-icons/fa";
import DetailGroupBinding from "./DetailGroupBinding";
import {getUserData} from "../../auth/jwtService"
import AddTeacherModal from "./AddTeacherModal";
import {MdGroupRemove} from "react-icons/md";
import LoadingPage from "../LoadingPage";

const GroupBinding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {groupBindingList, isLoading} = useSelector(({module}) => module);

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
  
  const [remove, setRemove] = useState(null)

  const handlePageChange = (page) => {
    // localStorage.setItem("GroupBinding", page.toString());
    dispatch(getGroupBinding({page_size: 10, page}));
  };

  const handleDeleteModal = (id, deleteBinding) => {
    setRemove(deleteBinding)
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
    localStorage.setItem('currentPage', JSON.stringify(1))
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

  const closeModal = () => {
    localStorage.setItem('currentPage', JSON.stringify(1))
    setIsModalOpen(false);
    setRemove(null)
  }

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
      dispatch(getGroupBinding({page_size: 10, page: 1}));
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
    <div className="card overflow-hidden">
      <div className="flex justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap">
        <div className={'flex w-full items-center gap-3'}>
          <input
            type="text"
            placeholder={'Search'}
            className={'lg:w-1/4 w-11/12 border py-2 px-1 divide-y divide-gray-200 rounded'}
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
          className="btn-primary mt-3 inline-block text-center lg:w-1/6 w-2/4 text-sm lg:text-lg"
        >
          Group Binding
        </Link>
      </div>
      <div className="w-full py-2 align-middle inline-block overflow-y-auto">
        <div className="w-full sm:rounded-lg">
          <table className="w-full divide-y divide-gray-200">
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
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delete statistics
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Attendance
              </th>
              {getUserData()?.role === 'admin' && (
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
            {groupBindingList &&
              groupBindingList?.results?.map((item) => (
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
                    className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="btn-danger btn-sm mr-3"
                      onClick={() => handleDeleteModal(item.id, true)}
                    >
                      <MdGroupRemove/>
                    </button>
                  </td>
                  
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      className="btn-primary btn-sm inline-block mr-3"
                      to={`/attendance/${item.id}`}
                      state={{group: item.group.id, group_name: item.group.name}}
                    >
                      <span>
                        <FaUserCheck/>
                      </span>
                    </Link>
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
                          onClick={() => handleDeleteModal(item.id, null)}
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
            resetPage={isModalOpen}
          />
        </div>
      </div>

      <DeleteGroupBinding
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modulId={ModulToDelete}
        remove={remove}
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