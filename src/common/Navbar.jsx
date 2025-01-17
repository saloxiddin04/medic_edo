import React from "react";
import LOGO from "../images/logo.png";

// icons
import {FaUserAlt} from "react-icons/fa";
import {MdOutlineLogout} from "react-icons/md";

// routes
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../Routes/constants";
import {getUserData, logout} from "../auth/jwtService";
import {AiOutlineHome} from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import {HiMenu, HiX} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../features/LocalStorageSlice/LocalStorageSlice";

const Navbar = () => {
  const dispatch = useDispatch()
  const {isSidebarOpen} = useSelector((state) => state.localStorage)
  
  const {pathname} = useLocation();
  return (
    <nav className="fixed top-0 w-full z-10 bg-white text-gray-700 border-b-2 pl-4 py-3 pr-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {pathname === "/create-custom-test" ? (
            <Link to={ROUTES.MAIN} className=" flex items-center px-5 py-4">
              <AiOutlineHome size="20" className="mt-0.5"/>
              
              <h1 className="ml-5 text-xl">Back Home</h1>
            </Link>
          ) : (
            <Link
              className={`text-primary text-lg font-semibold uppercase ${isSidebarOpen ? '' : 'hidden'}`}
              to={ROUTES.MAIN}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={LOGO}
                  alt=""
                />
              </div>
            </Link>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="bg-blue-500 text-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
             <HiMenu size={28} color="white"/>
          </button>
        </div>
        <div className="flex items-center gap-7">
          <div className="user-block flex">
            {getUserData() && (
              <div className="text-end mr-2 flex gap-3">
                <div>
                  <span className="block text-sm font-medium">
                    Group Name:
                  </span>
                  <span className="block text-xs font-medium text-gray-500 -mb-1">
                    {getUserData().group_name === null ? '--' : getUserData().group_name}
                  </span>{" "}
                </div>
                <div>
                  <span className="block text-sm font-medium">
                    Name:
                  </span>
                  <span className="block text-xs font-medium text-gray-500 -mb-1">
                    {getUserData().name}
                  </span>{" "}
                </div>
              </div>
            )}
            <button className="text-primary">
              <FaUserAlt size="22"/>
            </button>
            <div className="tooltip">
              <div className="shadow-md bg-white py-2 w-full rounded">
                <Link
                  to={'/profile'}
                  className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
                >
                  <span>Profile</span>
                  <FaUserAlt size="22"/>
                </Link>
                <Link
                  to={ROUTES.SINGIN}
                  onClick={logout}
                  className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
                >
                  <span>Logout</span>
                  <MdOutlineLogout/>
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
