// import React from "react";
// import LOGO from "../images/logo.png";
//
// // icons
// import {FaUserAlt} from "react-icons/fa";
// import {MdOutlineLogout} from "react-icons/md";
//
// // routes
// import {Link, useLocation} from "react-router-dom";
// import {ROUTES} from "../Routes/constants";
// import {getUserData, logout} from "../auth/jwtService";
// import {AiOutlineHome} from "react-icons/ai";
// import { RxHamburgerMenu } from "react-icons/rx";
// import {HiMenu, HiX} from "react-icons/hi";
// import {useDispatch, useSelector} from "react-redux";
// import {toggleSidebar} from "../features/LocalStorageSlice/LocalStorageSlice";
//
// const Navbar = () => {
//   const dispatch = useDispatch()
//   const {isSidebarOpen} = useSelector((state) => state.localStorage)
//
//   const {pathname} = useLocation();
//   return (
//     <nav className="fixed top-0 w-full z-10 bg-white text-gray-700 border-b-2 pl-4 py-3 pr-8">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           {pathname === "/create-custom-test" ? (
//             <Link to={ROUTES.MAIN} className=" flex items-center px-5 py-4">
//               <AiOutlineHome size="20" className="mt-0.5"/>
//
//               <h1 className="ml-5 text-xl">Back Home</h1>
//             </Link>
//           ) : (
//             <Link
//               className={`text-primary text-lg font-semibold uppercase ${isSidebarOpen ? '' : 'hidden'}`}
//               to={ROUTES.MAIN}
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   className="w-full h-full object-cover"
//                   src={LOGO}
//                   alt=""
//                 />
//               </div>
//             </Link>
//           )}
//           <button
//             onClick={() => dispatch(toggleSidebar())}
//             className="bg-blue-500 text-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
//           >
//             {isSidebarOpen ? <HiX size={28} color="white"/> : <HiMenu size={28} color="white"/>}
//           </button>
//         </div>
//         <div className="flex items-center gap-7">
//           <div className="user-block flex">
//             {getUserData() && (
//               <div className="text-end mr-2 flex gap-3">
//                 <div>
//                   <span className="block text-sm font-medium">
//                     Group Name:
//                   </span>
//                   <span className="block text-xs font-medium text-gray-500 -mb-1">
//                     {getUserData().group_name === null ? '--' : getUserData().group_name}
//                   </span>{" "}
//                 </div>
//                 <div>
//                   <span className="block text-sm font-medium">
//                     Name:
//                   </span>
//                   <span className="block text-xs font-medium text-gray-500 -mb-1">
//                     {getUserData().name}
//                   </span>{" "}
//                 </div>
//               </div>
//             )}
//             <button className="text-primary">
//               <FaUserAlt size="22"/>
//             </button>
//             <div className="tooltip">
//               <div className="shadow-md bg-white py-2 w-full rounded">
//                 <Link
//                   to={'/profile'}
//                   className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
//                 >
//                   <span>Profile</span>
//                   <FaUserAlt size="22"/>
//                 </Link>
//                 <Link
//                   to={ROUTES.SINGIN}
//                   onClick={logout}
//                   className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
//                 >
//                   <span>Logout</span>
//                   <MdOutlineLogout/>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
//
// export default Navbar;

import React from "react";
import LOGO from "../images/logo.png";

// icons
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

// routes
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData, logout } from "../auth/jwtService";
import { AiOutlineHome } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/LocalStorageSlice/LocalStorageSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.localStorage);
  
  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 w-full z-20 bg-white text-gray-700 border-b-2 pl-4 py-3 pr-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {pathname === "/create-custom-test" ? (
            <Link to={ROUTES.MAIN} className="flex items-center px-3 py-1">
              <AiOutlineHome size="20" className="mt-0.5"/>
              <h1 className="ml-5 text-base sm:text-lg md:text-xl hidden sm:block md:block lg:block">Back Home</h1>
            </Link>
          ) : (
            <Link
              className={`text-primary text-sm sm:text-base md:text-lg font-semibold uppercase ${
                isSidebarOpen ? "" : "hidden"
              }`}
              to={ROUTES.MAIN}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-full object-cover hidden sm:block md:block lg:block"
                  src={LOGO}
                  alt=""
                />
              </div>
            </Link>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="bg-blue-500 text-gray-800 p-1 sm:p-3 md:p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            {isSidebarOpen ? (
              <HiX size="15" className="sm:size-[24px] md:size-[20px] text-white"/>
            ) : (
              <HiMenu size="15" className="sm:size-[24px] md:size-[20px] text-white"/>
            )}
          </button>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <div className="user-block flex items-center gap-3">
            {getUserData() && (
              <div className="text-end mr-2 flex gap-3">
                <div>
                  <span className="block text-xs sm:text-sm font-medium">
                    Group Name:
                  </span>
                  <span className="block text-xs font-medium text-gray-500">
                    {getUserData().group_name === null ? "--" : getUserData().group_name}
                  </span>{" "}
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-medium">
                    Name:
                  </span>
                  <span className="block text-xs font-medium text-gray-500">
                    {getUserData().name}
                  </span>{" "}
                </div>
              </div>
            )}
            <button className="text-primary">
              <FaUserAlt size="20" />
            </button>
            <div className="tooltip hidden sm:block">
              <div className="shadow-md bg-white py-2 w-full rounded">
                <Link
                  to={"/profile"}
                  className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
                >
                  <span className="text-sm sm:text-base">Profile</span>
                  <FaUserAlt size="20" />
                </Link>
                <Link
                  to={ROUTES.SINGIN}
                  onClick={logout}
                  className="px-3 py-2 hover:bg-primary/10 hover:text-primary flex justify-between items-center w-full"
                >
                  <span className="text-sm sm:text-base">Logout</span>
                  <MdOutlineLogout size="18" />
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

