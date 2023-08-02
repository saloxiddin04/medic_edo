import React from "react";
import LOGO from "../../images/logo-white.png";
import AreYouSure from "./AreYouSureModal";
import { useState } from "react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="fixed bottom-0 right-0 w-[93%] h-[80px] z-10 bg-primary px-4 py-4 overflow-hidden ">
      <div className="flex justify-between items-center">
        <img className="absolute w-52 mt-5" src={LOGO} alt="" />
        <div>
          <div></div>
        </div>
        <div className="flex items-center gap-7">
          <button className="btn-danger" onClick={() => setIsModalOpen(true)}>
            End The Test
          </button>
        </div>
      </div>

      <AreYouSure isModalOpen={isModalOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Footer;
