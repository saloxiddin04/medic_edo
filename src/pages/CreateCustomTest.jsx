import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { startTest } from "../features/pastTest/pastTestSlice";
import { useEffect } from "react";
import { getModules } from "../features/modules/moduleSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setItem } from "../features/LocalStorageSlice/LocalStorageSlice";
import { resetTimer } from "../features/Timer/timerSlice";

const CreateCustomTest = () => {
  const navigate = useNavigate();

  const { moduleList } = useSelector(({ module }) => module);
  const dispatch = useDispatch();

  const [isTutor, setIsTutor] = useState(true);
  const [isTimer, setIsTimer] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [checkedItems, setCheckedItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    const isChecked = event.target.checked;

    setCheckedItems({
      ...checkedItems,
      [name]: isChecked,
    });
  };

  const getCookieItem = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return null;
  };

  const handleReset = () => {
    sessionStorage.removeItem("timerState");
    dispatch(resetTimer());
  };

  const pastTest = () => {
    const cookieItemValue = getCookieItem("user");
    const jsonParseCookie =
      cookieItemValue !== null ? JSON.parse(cookieItemValue) : "";
    const selectedModules = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    handleReset();

    if (selectedModules.length > 0) {
      dispatch(
        startTest({
          modul_ids: selectedModules,
          timer: isTimer,
          tutor: isTutor,
          is_selected: isSelected,
          user: jsonParseCookie.id,
        })
      ).then((res) => {
        dispatch(setItem({ key: "testID", value: res.payload.id }));
        dispatch(
          setItem({
            key: "exactTestID",
            value: res.payload.test_ids[0]?.test_question?.id,
          })
        );
        dispatch(setItem({ key: "idx", value: 0 }));
        navigate(ROUTES.TEST);
        setIsSubmitted(false);
      });
    }

    setIsSubmitted(true);
  };

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  return (
    <div className="card">
      <h1 className="text-xl">Test Mode</h1>

      <div className="flex items-center gap-10 mt-10 mb-5">
        <div className="flex items-center gap-3">
          <span>Tutor:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isTutor}
              onChange={() => setIsTutor(!isTutor)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <span>Timer:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setIsTimer(!isTimer)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <span>Do not show solved tests:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setIsSelected(!isSelected)}
              className="sr-only peer"
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>
      </div>
      <hr />

      <div className="flex flex-wrap mt-10 mb-5">
        {moduleList.map((item) => (
          <div className="w-1/2" key={item.id}>
            <label className="mb-2 block cursor-pointer">
              <input
                type="checkbox"
                name={item.id}
                checked={checkedItems[item.id] || false}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">{item.name}</span>
            </label>
          </div>
        ))}
      </div>
      <hr />
      {isSubmitted ? (
        <button
          type="button"
          disabled
          className="btn-primary flex gap-3 items-center justify-between mt-10"
        >
          <AiOutlineLoading3Quarters className="animate-spin" />
          Processing...
        </button>
      ) : (
        <button
          className="btn-primary mt-10"
          onClick={pastTest}
          disabled={
            !Object.values(checkedItems).some((value) => value === true)
          }
        >
          Start Test
        </button>
      )}
    </div>
  );
};

export default CreateCustomTest;
