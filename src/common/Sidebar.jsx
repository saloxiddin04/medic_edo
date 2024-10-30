import React from "react";
import { TbLetterQ } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData } from "../auth/jwtService";
import {FaUserAlt, FaUserFriends} from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";

const Sidebar = () => {
  
  const handleCleanCurrentPage = () => {
    localStorage.removeItem('currentPage')
    localStorage.removeItem('ModuleTest')
    localStorage.removeItem('searchTestState')
  }
  
  return (
    <div className="fixed top-16 bg-white text-gray-700 h-screen w-56 py-8">
      <nav>
        <ul>
          <li>
            <NavLink
              activeclassname="active"
              to={ROUTES.MAIN}
              className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
            >
              <TbLetterQ className="mt-1" size="20" />
              <span>Question Blank</span>
            </NavLink>
            {getUserData() && getUserData().role === "admin" && (
              <>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.MODULE}
                  className="flex my-2 w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdOutlineCreateNewFolder className="mt-1" size="20" />
                  <span>Modul</span>
                </NavLink>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.SYSTEM}
                  className="flex my-2 w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdOutlineCreateNewFolder className="mt-1" size="20" />
                  <span>System</span>
                </NavLink>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.MODULETEST}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdOutlineCreateNewFolder className="mt-1" size="20" />
                  <span>Test</span>
                </NavLink>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.LESSON_BY_TESTS}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <FaUserFriends size="22" className='mt-1' />
                  <span>Lesson By Test</span>
                </NavLink>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.USERS}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <FaUserAlt size="22" className='mt-1' />
                  {/*<MdOutlineCreateNewFolder className="mt-1" size="20" />*/}
                  <span>Users</span>
                </NavLink>
                
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.GROUP}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdGroupAdd size="22" className='mt-1' />
                  <span>Group</span>
                </NavLink>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.GROUP_BINDING}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <FaUserFriends size="22" className='mt-1' />
                  <span>Group binding</span>
                </NavLink>
              </>
            )}
            
            {getUserData() && getUserData().role === "teacher" && (
              <>
                <NavLink
                  onClick={handleCleanCurrentPage}
                  activeclassname="active"
                  to={ROUTES.GROUP_BINDING}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <FaUserFriends size="22" className='mt-1' />
                  <span>Group binding</span>
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
