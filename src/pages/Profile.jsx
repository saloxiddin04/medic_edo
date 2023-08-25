import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserDetail, patchUserDetail} from "../features/userDetail/userDetailSlice";
import {getUserData} from "../auth/jwtService";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import LoadingPage from "./LoadingPage";
import {FaUserAlt} from "react-icons/fa";

const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, loading} = useSelector(({userDetail}) => userDetail)

  const divRef = useRef(null)

  const [username, setUserName] = useState(user.username ? user.username : '')
  const [name, setName] = useState(user.name ? user.name : '')
  const [password, setPassword] = useState(null)
  const [visible, setVisible] = useState(false)

  const [focusedDivId, setFocusedDivId] = useState(null);

  useEffect(() => {
    dispatch(getUserDetail(getUserData()?.id))
    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
  }, [dispatch])

  useEffect(() => {
    setUserName(user.username || localStorage.getItem('username') || '');
    setName(user.name || localStorage.getItem('name') || '');
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
        </div>
      </div>
      <div className='flex items-center justify-end mt-5 gap-3'>
        <button className='py-2 px-4 bg-red-400 text-white rounded text-lg' onClick={() => navigate('/')}>Back</button>
        <button
          className='py-2 px-4 bg-green-400 text-white rounded text-lg'
          onClick={() => {
            dispatch(patchUserDetail({
              id: getUserData().id,
              username,
              name,
              password
            }))
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;