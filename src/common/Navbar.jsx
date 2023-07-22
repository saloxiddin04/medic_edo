import React from "react";
import LOGO from "../images/logo.png";

// icons
import { BsBell } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

// routes
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData, logout } from "../auth/jwtService";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-10 bg-white text-gray-700 border-b-2 pl-4 py-3 pr-8">
      <div className="flex justify-between items-center">
        <div>
          <Link
            className="text-primary text-lg font-semibold uppercase"
            to={ROUTES.MAIN}
          >
            <div className="relative w-[280px] h-[42px] overflow-hidden">
              <img
                className="absolute -top-[110px] -left-[50px] scale-75"
                src={LOGO}
                alt=""
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-7">
          <button className="btn-primary">Prising</button>

          <button className="text-primary">
            <BsBell size="20" />
          </button>
          <div className="user-block flex">
            {getUserData() && (
              <p className="text-end mr-2">
                <span className="block text-xs font-medium text-gray-500 -mb-1">
                  @{getUserData().username}
                </span>{" "}
                <span className="block text-sm font-medium">
                  {getUserData().name}
                </span>
              </p>
            )}
            <button className="text-primary">
              <FaUserAlt size="22" />
            </button>
            <div className="tooltip">
              <div className="shadow-md bg-white py-2 w-full rounded">
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
      </div>
    </nav>
  );
};

export default Navbar;
