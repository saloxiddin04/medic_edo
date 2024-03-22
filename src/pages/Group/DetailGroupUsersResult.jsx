import React from 'react';
import {useSelector} from "react-redux";
import moment from "moment/moment";
import {BiChevronRightCircle} from "react-icons/bi";
import {IoClose} from "react-icons/io5";

const DetailGroupUsersResult = ({closeModal, id, isOpen}) => {
  
  const {userTestHistory} = useSelector(({testResults}) => testResults)
  
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
          <section>
            <div className='flex items-center justify-center text-center gap-8'>
              <div className='border py-2 px-2.5 rounded'>
                <h1>All tests</h1>
                <span>{userTestHistory.all_test_count}</span>
              </div>
              <div className='border py-2 px-2.5 rounded'>
                <h1>Correct answers</h1>
                <span>{userTestHistory.correct_answer_count}</span>
              </div>
              <div className='border py-2 px-2.5 rounded'>
                <h1>Unsolved answers</h1>
                <span>{userTestHistory.unsolved_test}</span>
              </div>
              <div className='border py-2 px-2.5 rounded'>
                <h1>Wrong answers</h1>
                <span>{userTestHistory.worning_answer_count}</span>
              </div>
            </div>
          </section>
        </div>
        <div className='mt-3'>
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
                Correct answer
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Wrong answer
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Start test
              </th>
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                End test
              </th>
            </tr>
            </thead>
            <tbody>
            {userTestHistory.isFilled && (
              userTestHistory.tests_history.map((item) => (
                <tr className='bg-white px-2 py-1 text-center mt-2' key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.correct_answer_count}</td>
                  <td>{item.worning_answer_count}</td>
                  <td>{item.start_date ? moment(item.start_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
                  <td>{item.end_date ? moment(item.end_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
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