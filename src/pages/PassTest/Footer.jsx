import React from "react";
import LOGO from "../../images/logo-white.png";
import AreYouSure from "./AreYouSureModal";
import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="fixed bottom-0 right-0 w-[94%] h-[50px] z-10 bg-primary px-4 py-4 overflow-hidden ">
      <div className="flex justify-between items-center">
        <img className="absolute w-32" src={LOGO} alt="" />
        <div>
          <div></div>
        </div>
        <div className="flex items-center gap-7 -mt-2">
          {location?.pathname === '/test-review' ? (
            <button
              className="btn-danger btn-xs"
              onClick={() => navigate('/test-results')}
            >
              <span className="text-sm mx-5">Back</span>
            </button>
          ) : (
            <button
              className="btn-danger btn-xs"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-sm mx-5">End The Test</span>
            </button>
          )}
        </div>
      </div>

      <AreYouSure isModalOpen={isModalOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Footer;
