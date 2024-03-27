import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BiChevronRightCircle} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {getUserTestHistoryForGroup} from "../../features/testResults/testResultsSlice";

const DetailGroupUsersResult = ({closeModal, isOpen, id}) => {
  
  const dispatch = useDispatch()
  const {userTestHistoryForGroup} = useSelector(({testResults}) => testResults)
  const navigate = useNavigate()

  let storagePage = localStorage.getItem("DetailGroupUsersResult");

  useEffect(() => {
    if (id) {
      if (storagePage) {
        dispatch(getUserTestHistoryForGroup({page_size: 10, page: storagePage, id}));
      } else {
        dispatch(getUserTestHistoryForGroup({id}));
      }
    }
  }, [id])
  
  const handlePageChange = (page) => {
    localStorage.setItem("DetailGroupUsersResult", page.toString());
    dispatch(getUserTestHistoryForGroup({page_size: 10, page, id}));
  };
  
  return (
    <div
      className={
        isOpen
          ? "fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
          : "opacity-0 pointer-events-none"
      }
    >
      <div
        className={
          isOpen
            ? "h-4/5 w-4/5 m-auto card overflow-y-scroll"
            : "hidden card mt-8"
        }
      >
        <div className={'text-right'}>
          <button className={'btn-danger btn-sm'} onClick={closeModal}>
            <IoClose/>
          </button>
        </div>
        <div className='mt-3'>
          <table className='min-w-full bg-gray-200'>
            <thead className='bg-gray-50'>
            <tr>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                id
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                accuracy
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                start date
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                modules
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                system
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                action
              </th>
            </tr>
            </thead>
            <tbody>
            {userTestHistoryForGroup.isFilled && (
              userTestHistoryForGroup.results.map((item) => (
                <tr className='bg-white px-2 py-1 text-center mt-2' key={item.id}>
                  <td className={'border'}>{item.id}</td>
                  <td className={'border'}>{item.accuracy}</td>
                  <td className={'border'}>{item.start_date}</td>
                  <td className={'border'}>
                    <div className={'flex flex-wrap p-1 gap-1'}>
                      {item?.modules?.map((el, index) => (
                        <div key={index} className={'p-1 border border-blue-400 rounded'}>{el}</div>
                      ))}
                    </div>
                  </td>
                  <td className={'border'}>
                    <div className={'flex flex-wrap p-1 gap-1'}>
                      {item?.system?.map((el, index) => (
                        <div key={index} className={'p-1 border border-blue-400 rounded'}>{el}</div>
                      ))}
                    </div>
                  </td>
                  <td className={'border'}>
                    <button
                      className='mt-2'
                      onClick={() => {
                        localStorage.setItem("testID", item.id)
                        navigate(`/test-results`)
                      }}
                    >
                      <BiChevronRightCircle size='30' color={'#28CD41'}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
          <div className={'w-full flex items-center justify-end'}>
            <Pagination
              totalItems={userTestHistoryForGroup.count} // Replace with the total number of items you have
              itemsPerPage={10} // Replace with the number of items to display per page
              onPageChange={handlePageChange} // Pass the handlePageChange function
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGroupUsersResult;