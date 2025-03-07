import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../features/testResults/testResultsSlice";
import Pagination from "../components/Pagination";
import {BiChevronRightCircle} from "react-icons/bi";
import {HiPencil, HiTrash} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import AreYouSureModalDeleteUser from "../components/AreYouSureModalDeleteUser";
import {searchUser} from "../features/testResults/testResultsSlice";

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [modal, setModal] = useState(false)
  const [userId, setUserId] = useState(null)
  const [searchUserState, setSearchUser] = useState('')
  
  const handleOpenModal = (id) => {
    setUserId(id)
    setModal(true)
  }
  
  const handleCloseModal = () => {
    setModal(false)
    setUserId(null)
  }
  
  const {users} = useSelector(({testResults}) => testResults)
  
  const handlePageChange = (page) => {
    localStorage.setItem("currentPage", page.toString());
    dispatch(getUsers({ page_size: 10, page }));
  };
  
  useEffect(() => {
    const page = localStorage.getItem("currentPage");
    dispatch(getUsers({page_size: 10, page}))
  }, [dispatch]);
  
  const timeoutId = useRef()
  const searchUserFunc = (value) => {
    setSearchUser(value)
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      dispatch(searchUser(value))
    }, 500)
  }
  
  return (
    <>
      <div className={'card flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center'}>
        <div className='lg:w-1/4 w-full flex justify-center lg:justify-normal items-center gap-5'>
          <input
            className='border focus:border-blue-400 py-2 px-2.5 rounded'
            type={'text'}
            value={searchUserState || ''}
            onChange={(e) => searchUserFunc(e.target.value)}
            placeholder={'Search User'}
          />
          <div onClick={() => {
            setSearchUser('')
            const page = localStorage.getItem("currentPage");
            dispatch(getUsers({page_size: 10, page}))
          }}>
            <AiOutlineClose size={20}/>
          </div>
        </div>
        <div className="overflow-y-auto">
          <Pagination
            totalItems={users && users.count}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="card mt-8 overflow-y-auto">
        <table className='min-w-full bg-gray-200'>
          <thead className='bg-gray-50'>
          <tr>
            <th
              scope={'row'}
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              id
            </th>
            <th
              scope={'row'}
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Name
            </th>
            <th
              scope={'row'}
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Group Name
            </th>
            <th
              scope={'row'}
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Role
            </th>
            <th
              scope={'row'}
              className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          {users && (
            users.results.map((item) => (
              <tr className='bg-white px-2 py-1 text-center mt-2' key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.group_name === null ? "-" : item.group_name}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className='mt-2 mr-3'
                    onClick={() => {
                      navigate(`/users/${item.id}`)
                    }}
                  >
                    <BiChevronRightCircle size='22' color={'#28CD41'}/>
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/users/${item.id}`)
                    }}
                    className='bg-yellow rounded mr-3'
                  >
                    <HiPencil size={22} color={'#fff'}/>
                  </button>
                  <button onClick={() => handleOpenModal(item.id)} className='bg-red-500 rounded'>
                    <HiTrash size={22} color={'#fff'}/>
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
      
      <AreYouSureModalDeleteUser isModalOpen={modal} closeModal={handleCloseModal} userId={userId} />
    </>
  )
}

export default Users