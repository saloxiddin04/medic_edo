import React, {useEffect} from "react";
import {getGroupBinding, deleteGroupBinding, removeGroupBinding} from "../../features/modules/moduleSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {toast} from "react-toastify";

const DeleteGroupBinding = ({ isModalOpen, modulId, closeModal, remove }) => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(30);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (seconds === 0) return;
    
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [seconds]);
  
  const deleteTestAction = () => {
    if (remove) {
      if (isSubmitted) return;
      dispatch(removeGroupBinding({group_id: modulId})).then(() => {
        dispatch(getGroupBinding());
        closeModal();
        setIsSubmitted(false);
        setSeconds(30)
        toast.success('Statistics deleted successfully!')
      });
      setIsSubmitted(true);
    } else {
      if (isSubmitted) return;
      dispatch(deleteGroupBinding(modulId)).then(() => {
        dispatch(getGroupBinding());
        closeModal();
        setIsSubmitted(false);
      });
      setIsSubmitted(true);
    }
  };
  
  return (
    <div
      className={
        isModalOpen
          ? "fixed z-50 inset-0 overflow-y-auto"
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
            <h3 className="text-lg font-medium text-gray-900">
              {remove ? 'Delete the statistics' : 'Delete Group'}
            </h3>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              {remove ? 'Delete the statistics of users bound to the group.' : 'Are you sure you want to delete this item?'}
            </p>
          </div>
          <div className="bg-gray-100 p-4 flex gap-5 justify-end">
            <button
              className="btn-secondary"
              onClick={() => {
                closeModal()
                setSeconds(30)
              }}
            >
              Cancel
            </button>
            {isSubmitted ? (
              <button
                type="button"
                disabled
                className="btn-primary flex gap-3 items-center justify-between"
              >
                <AiOutlineLoading3Quarters className="animate-spin"/>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="btn-danger"
                onClick={deleteTestAction}
                disabled={seconds}
              >
                Delete {seconds ? seconds : ''}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGroupBinding;
