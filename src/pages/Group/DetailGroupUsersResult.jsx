import React from 'react';
import {useSelector} from "react-redux";
import moment from "moment/moment";
import {BiChevronRightCircle} from "react-icons/bi";
import {IoClose} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const DetailGroupUsersResult = ({closeModal, isOpen}) => {
  
  const {userTestHistoryForGroup} = useSelector(({testResults}) => testResults)
  const navigate = useNavigate()
  
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
            ? "h-4/5 w-4/5 m-auto card"
            : "hidden card mt-8"
        }
      >
        {/*<div className="fixed inset-0 bg-gray-500 opacity-75"></div>*/}
        <div>
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
                Correct answer
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                Wrong answer
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r'
              >
                Start test
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                End test
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
                  <td className={'border'}>{item.correct_answer_count}</td>
                  <td className={'border'}>{item.worning_answer_count}</td>
                  <td className={'border'}>{item.start_date ? moment(item.start_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
                  <td className={'border'}>{item.end_date ? moment(item.end_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
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
        </div>
      </div>
    </div>
  );
};

export default DetailGroupUsersResult;