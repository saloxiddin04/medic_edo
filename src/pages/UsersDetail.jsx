import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom";
import {BiChevronRightCircle} from "react-icons/bi";
import {getUserTestHistory} from "../features/testResults/testResultsSlice";
import {getUserDetail, patchUserDetail} from "../features/userDetail/userDetailSlice";
import LoadingPage from "./LoadingPage";
import {FaUserAlt} from "react-icons/fa";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import moment from "moment";
import { getUserData } from "../auth/jwtService";
import {IoReload} from "react-icons/io5";
import TabsRender from "../components/Tabs";

const tabs = [
  {
    title: 'Custom test history',
    active: true
  },
  {
    title: "Lesson by test history",
    active: false
  }
];

const UsersDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userTestHistory} = useSelector(({testResults}) => testResults)
  const {user, loading} = useSelector(({userDetail}) => userDetail)
  const id = useParams()
  
  const [openTab, setOpenTab] = useState(tabs.findIndex(tab => tab.active));
  
  const divRef = useRef(null)
  
  const [username, setUserName] = useState(user.username ? user.username : '')
  const [name, setName] = useState(user.name ? user.name : '')
  const [role, setRole] = useState(user.role ? user.role : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [password, setPassword] = useState(null)
  const [visible, setVisible] = useState(false)
  
  const [focusedDivId, setFocusedDivId] = useState(null);
  
  useEffect(() => {
    dispatch(getUserDetail(id))
    dispatch(getUserTestHistory({id: id?.id, openTab}));
  }, [dispatch, id, openTab]);
  
  useEffect(() => {
    setUserName(user.username || localStorage.getItem('username') || '');
    setName(user.name || localStorage.getItem('name') || '');
    setRole(user.role || localStorage.getItem('role') || '');
    setEmail(user.email || localStorage.getItem('email') || '');
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
            <div className="card hidden lg:block">
              <div className='bg-gray-100 p-5 rounded'>
                <FaUserAlt size="200"/>
              </div>
            </div>
            <div className='card flex items-center justify-between flex-wrap gap-5 lg:w-11/12 w-full'>
              <div
                className='input flex flex-col lg:w-[48%] w-full'
                onFocus={() => handleDivFocus(3)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="name">Full Name</label>
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
              <div className='input flex flex-col lg:w-[48%] w-full'>
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
                onFocus={() => handleDivFocus(5)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  id={'name'}
                  onFocus={() => handleDivFocus(5)}
                  onBlur={handleDivBlur}
                  className={`py-2.5 px-2 rounded mt-2 outline-none border ${isDivFocused(5) ? 'border-blue-400' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className='input flex flex-col w-full'
                onFocus={() => handleDivFocus(6)}
                onBlur={handleDivBlur}
              >
                <label htmlFor="name">Group</label>
                <input
                  type="email"
                  id={'name'}
                  onFocus={() => handleDivFocus(6)}
                  onBlur={handleDivBlur}
                  className={`py-2.5 px-2 rounded mt-2 outline-none border ${isDivFocused(6) ? 'border-blue-400' : ''}`}
                  value={user?.group_name}
                  disabled={true}
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
                  <option value='teacher'>{'teacher'}</option>
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
                  role,
                  email
                })).then((res) => {
                  if (res.meta.requestStatus === 'fulfilled') {
                    setPassword('')
                  }
                })
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <TabsRender
          tabs={tabs}
          color={'#000'}
          openTab={openTab}
          setOpenTab={setOpenTab}
        />
      </div>
      
      <div className="card">
        <div>
          <section>
            <div className='flex items-center md:justify-center justify-normal text-center gap-8 overflow-y-auto'>
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
        <div className='mt-3 overflow-y-auto'>
          <table className='min-w-full bg-gray-200'>
            <thead className='bg-gray-50'>
            <tr>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                id
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Correct answer
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Wrong answer
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Start test
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mode
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                End test
              </th>
              <th
                scope={'row'}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            {userTestHistory.isFilled && (
              userTestHistory.tests_history.map((item) => (
                <tr className='bg-white px-2 py-1 text-center mt-2' key={item.id}>
                  <td>{item?.id}</td>
                  <td>{item?.correct_answer_count}</td>
                  <td>{item?.worning_answer_count}</td>
                  <td>{item?.start_date ? moment(item.start_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
                  <td>{item?.is_tutor ? 'Tutor' : '-'}</td>
                  <td>{item?.end_date ? moment(item.end_date).format('DD.MM.YYYY, h:mm:ss') : '-'}</td>
                  <td>
                    {user?.id === getUserData()?.id && (
                      <button
                        className="mt-2 mr-1"
                        onClick={() => {
                          localStorage.setItem("testID", item.id)
                          navigate(`/test`, {state: {is_reload: true}})
                        }}
                      >
                        <IoReload size="30" color={'rgb(29 137 228)'}/>
                      </button>
                    )}
                    <button
                      className="mt-2"
                      onClick={() => {
                        localStorage.setItem("testID", item.id)
                        navigate(`/test-results`)
                      }}
                    >
                      <BiChevronRightCircle size="30" color={'#28CD41'}/>
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