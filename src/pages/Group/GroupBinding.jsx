import React, {useEffect, useState} from 'react';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../features/testResults/testResultsSlice";

const GroupBinding = () => {
  const dispatch = useDispatch()
  const {users} = useSelector(({testResults}) => testResults)
  
  const [data, setData] = useState({
    user_id: null,
    group_id: null,
  });
  
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);
  
  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <div className='w-[45%]'>
          <label htmlFor="moduleName">Select Users</label>
          <Select
            options={users?.results}
            getOptionLabel={(modul) => modul.name}
            getOptionValue={(modul) => modul.id}
            isMulti
            onChange={(selectedOption) => {
              setData((prevData) => ({
                ...prevData,
                user_id: selectedOption?.map((option) => option.id),
              }));
            }}
            placeholder={'Select Users'}
          />
        </div>
        <div className='w-[45%]'>
          <label htmlFor="moduleName">Select Group</label>
          <Select
            options={users?.results}
            getOptionLabel={(modul) => modul.name}
            getOptionValue={(modul) => modul.id}
            onChange={(selectedOption) => {
              setData((prevData) => ({
                ...prevData,
                group_id: selectedOption?.id,
              }));
            }}
            placeholder={'Select Group'}
          />
        </div>
      </div>
      <div className='flex items-center justify-end mt-5 gap-3'>
        {/*<button className='py-2 px-4 bg-red-400 text-white rounded text-lg' onClick={() => navigate('/users')}>Back</button>*/}
        <button
          className='py-2 px-4 bg-green-400 text-white rounded text-lg'
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default GroupBinding;