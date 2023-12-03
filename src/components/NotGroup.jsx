import React from "react";
import { FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import {ROUTES} from "../Routes/constants";
import {logout} from "../auth/jwtService";
import {MdOutlineLogout} from "react-icons/md";
import {Link} from "react-router-dom";

const NotGroupModal = ({isModalOpen}) => {
  
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
        <div
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 p-4">
            <div className="text-lg font-medium text-gray-900 flex justify-between items-center">
              <h3>Warning!</h3>
              <span className={'cursor-pointer'} onClick={() => window.location.reload()}>
                <TbReload />
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              ✅ You have successfully registered, contact the admin to get access to tests and cases
            </p>
            <a className={'flex items-center gap-1 mt-2'} href={'tel:+998948880800'}>
              <FaPhoneAlt />
              +998948880800
            </a>
            <a className={'flex items-center gap-1 mt-2'} href={'https://t.me/indoc_support'}>
              <FaTelegram />
              @indoc_support
            </a>
          </div>
          <div className="bg-gray-100 p-4 flex gap-5 justify-end">
            <Link
              to={ROUTES.SINGIN}
              onClick={logout}
              className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
            >
              <span>Logout</span>
              <MdOutlineLogout />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotGroupModal;
