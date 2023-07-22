import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";

const AreYouSure = ({ isModalOpen, closeModal }) => {
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
              Are you sure you want to leave the test?
            </p>
          </div>
          <div className="bg-gray-100 p-4 flex gap-5 justify-end">
            <button className="btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <Link
              to={ROUTES.RESULTS}
              type="submit"
              className="btn-danger"
              onClick={closeModal}
            >
              Yes, I'm sure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
