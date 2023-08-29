import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom";
import {BiChevronRightCircle} from "react-icons/bi";
import {getUserTestHistory} from "../features/testResults/testResultsSlice";
import {getUserDetail, patchUserDetail} from "../features/userDetail/userDetailSlice";
import LoadingPage from "./LoadingPage";
import {FaUserAlt} from "react-icons/fa";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {toast} from "react-toastify";

const UsersDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userTestHistory} = useSelector(({testResults}) => testResults)
  const {user, loading} = useSelector(({userDetail}) => userDetail)
  const id = useParams()
  
  const divRef = useRef(null)
  
  const [username, setUserName] = useState(user.username ? user.username : '')
  const [name, setName] = useState(user.name ? user.name : '')
  const [role, setRole] = useState(user.role ? user.role : '')
  const [password, setPassword] = useState(null)
  const [visible, setVisible] = useState(false)
  
  const [focusedDivId, setFocusedDivId] = useState(null);
  
  useEffect(() => {
    dispatch(getUserDetail(id))
    dispatch(getUserTestHistory(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    setUserName(user.username || localStorage.getItem('username') || '');
    setName(user.name || localStorage.getItem('name') || '');
    setRole(user.role || localStorage.getItem('role') || '');
  }, [user]);
  
  const handleDivFocus = (divId) => {
    setFocusedDivId(divId);
  };
  
  const handleDivBlur = () => {
    setFocusedDivId(null);
  };
  
  const isDivFocused = (divId) => {
    return divId === focusedDivId;
  };
  
  if (loading) return <LoadingPage/>
  
  return (
    <>
      <div className="card-8 mt-2">
        <div>
          <div className='flex gap-10'>
            <div className="card">
              <div className='bg-gray-100 p-5 rounded'>
                <FaUserAlt size="200"/>
              </div>
            </div>
            <div className='card flex items-center justify-between flex-wrap w-11/12'>
              <div
                className='input flex flex-col w-[48%]'
                onFocus={() => handleDivFocus(1)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id={'username'}
                  onFocus={() => handleDivFocus(1)}
                  onBlur={handleDivBlur}
                  className={`py-2.5 px-2 rounded mt-2 outline-none border ${isDivFocused(1) ? 'border-blue-400' : ''}`}
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='input flex flex-col w-[48%]'>
                <label htmlFor="password">Password</label>
                <div
                  ref={divRef}
                  onFocus={() => handleDivFocus(2)}
                  onBlur={handleDivBlur}
                  className={`mt-3 flex items-center justify-between py-2 px-2 rounded border bg-white password ${isDivFocused(2) ? 'border-blue-400' : ''}`}
                >
                  <input
                    type={visible ? "text" : "password"}
                    id={'password'}
                    onFocus={() => handleDivFocus(2)}
                    onBlur={handleDivBlur}
                    className='outline-none border-none bg-transparent w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {visible ?
                    <AiFillEye className='mt-1 cursor-pointer' onClick={() => setVisible(!visible)} size={25}/>
                    :
                    <AiFillEyeInvisible className='mt-1 cursor-pointer' onClick={() => setVisible(!visible)} size={25}/>
                  }
                </div>
              </div>
              <div
                className='input flex flex-col w-full'
                onFocus={() => handleDivFocus(3)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id={'name'}
                  onFocus={() => handleDivFocus(3)}
                  onBlur={handleDivBlur}
                  className={`py-2.5 px-2 rounded mt-2 outline-none border ${isDivFocused(3) ? 'border-blue-400' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div
                className='input flex flex-col w-full mt-1'
                onFocus={() => handleDivFocus(3)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="role">Role</label>
                <select
                  id={'role'}
                  onFocus={() => handleDivFocus(4)}
                  onBlur={handleDivBlur}
                  className={`py-2.5 px-2 rounded mt-2 outline-none border ${isDivFocused(4) ? 'border-blue-400' : ''}`}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value='admin'>{'admin'}</option>
                  <option value='student'>{'student'}</option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end mt-5 gap-3'>
            <button className='py-2 px-4 bg-red-400 text-white rounded text-lg' onClick={() => navigate('/users')}>Back</button>
            <button
              className='py-2 px-4 bg-green-400 text-white rounded text-lg'
              onClick={() => {
                dispatch(patchUserDetail({
                  id: id.id,
                  username,
                  name,
                  password,
                  role
                })).then((res) => {
                  if (res.meta.requestStatus === 'fulfilled') {
                    setPassword('')
                    toast.success('Profile updated successfully!')
                  }
                })
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="card mt-8">
        <div>
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
              <th
                scope={'row'}
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Action
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
                  <td>{item.start_date ? item.start_date?.split("T")[0] : '-'}</td>
                  <td>{item.end_date ? item.end_date?.split("T")[0] : '-'}</td>
                  <td>
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
    </>
  )
}

export default UsersDetail