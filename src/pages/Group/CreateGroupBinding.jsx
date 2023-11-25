import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../features/testResults/testResultsSlice";
import {
  getGroup,
  getGroupBinding, getGroupBindingById,
  getGroupById, getUsersGroupBinding,
  postGroupBinding,
  updateGroup, updateGroupBinding
} from "../../features/modules/moduleSlice";
import {useNavigate, useParams} from "react-router-dom";

const CreateGroupBinding = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {users} = useSelector(({testResults}) => testResults)
  const {groupList, groupBinding, groupBindingUsers} = useSelector(({module}) => module);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {id} = useParams();
  
  const [data, setData] = useState({
    users: [],
    group: null,
  });
  
  const saveData = () => {
    // e.preventDefault();
    if (isSubmitted) return;
    if (Number(id)) {
      dispatch(updateGroupBinding({
        id: Number(id),
        data
      })).then(() => {
        navigate("/binding");
      });
    } else {
      dispatch(
        postGroupBinding(data)
      ).then(() => {
        navigate("/binding");
      });
    }
    setIsSubmitted(true);
  };
  
  const bindItems = (users, groupId) => {
    const newData = {
      ...data,
      users: users,
      group: groupId,
    };
    setData(newData);
  };
  
  useEffect(() => {
    if (Number(id)) {
      dispatch(getGroupBindingById(Number(id))).then(({payload}) => {
        const userIds = payload?.users.map(user => user.id);
        bindItems(userIds, payload?.group?.id);
      });
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    dispatch(getUsersGroupBinding())
    dispatch(getUsers())
    dispatch(getGroup())
  }, [dispatch]);
  
  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <div className='w-[45%]'>
          <label htmlFor="moduleName">Select Users</label>
          <Select
            options={groupBindingUsers?.results}
            getOptionLabel={(modul) => modul.name}
            getOptionValue={(modul) => modul.id}
            value={data.users.map(userId => users?.results?.find(user => user.id === userId))}
            isMulti
            onChange={(selectedOption) => {
              setData((prevData) => ({
                ...prevData,
                users: selectedOption?.map((option) => option.id),
              }));
            }}
            placeholder={'Select Users'}
          />
        </div>
        <div className='w-[45%]'>
          <label htmlFor="moduleName">Select Group</label>
          <Select
            options={groupList?.results}
            getOptionLabel={(modul) => modul.name}
            getOptionValue={(modul) => modul.id}
            onChange={(selectedOption) => {
              setData((prevData) => ({
                ...prevData,
                group: selectedOption?.id,
              }));
            }}
            value={groupList?.results?.find(item => item?.id === data.group)}
            placeholder={'Select Group'}
          />
        </div>
      </div>
      <div className='flex items-center justify-end mt-5 gap-3'>
        {/*<button className='py-2 px-4 bg-red-400 text-white rounded text-lg' onClick={() => navigate('/users')}>Back</button>*/}
        <button
          className='py-2 px-4 bg-green-400 text-white rounded text-lg'
          disabled={data?.users?.length === 0 || data?.group === null}
          onClick={saveData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateGroupBinding;