import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGroupBindingUsersDetail} from "../../features/modules/moduleSlice";
import Pagination from "../../components/Pagination";
import { IoClose } from "react-icons/io5";

const DetailGroupBinding = ({isModalOpen, modulId, closeModal}) => {
  const dispatch = useDispatch()
  const {bindingUsers} = useSelector(({module}) => module);
  
  const [searchUserState, setSearchUser] = useState('')
  
  const timeoutId = useRef()
  
  const searchUserFunc = (value) => {
    setSearchUser(value)
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      dispatch(getGroupBindingUsersDetail({id: modulId, text: value}))
    }, 500)
  }
  
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getGroupBindingUsersDetail({id: modulId}))
    }
  }, [isModalOpen, modulId]);
  
  const handlePageChange = (page) => {
    dispatch(getGroupBindingUsersDetail({id: modulId, page_size: 10, page}));
  };
  
  return (
    <div>
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
          <div className='bg-white w-full rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-5xl sm:w-full'>
            <div className='w-full p-4 flex items-center justify-between'>
              <input
                type="text"
                placeholder={'Search'}
                className={'w-1/4 border py-2 px-1 divide-y divide-gray-200 rounded'}
                value={searchUserState}
                onChange={(e) => searchUserFunc(e.target.value)}
              />
              <button className={'btn-danger btn-sm'} onClick={closeModal}>
                <IoClose/>
              </button>
            </div>
            <div className={'w-[97%] m-auto'}>
              <table className="w-full divide-y divide-gray-200 border px-4">
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
                    User Name
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {bindingUsers?.results?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.name}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-end p-2'>
              <Pagination
                totalItems={bindingUsers?.count} // Replace with the total number of items you have
                itemsPerPage={10} // Replace with the number of items to display per page
                onPageChange={handlePageChange}// Pass the handlePageChange function
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGroupBinding;