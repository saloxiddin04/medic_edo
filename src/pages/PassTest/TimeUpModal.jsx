import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { useDispatch } from "react-redux";
import { resetTimer } from "../../features/Timer/timerSlice";

const TimeUpModal = ({ isModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const endTheTest = () => {
    dispatch(resetTimer());
    navigate(ROUTES.RESULTS);
  };

  return (
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
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 p-4">
            <h3 className="text-lg font-medium text-gray-900">Warning!</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              Your time is up! Now click the button to show your results.
            </p>
          </div>
          <div className="bg-gray-100 p-4 flex gap-5 justify-end">
            <button type="submit" className="btn-primary" onClick={endTheTest}>
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeUpModal;
