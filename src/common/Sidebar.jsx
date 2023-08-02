import React from "react";
import { TbLetterQ } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData } from "../auth/jwtService";

const Sidebar = () => {
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
                  activeclassname="active"
                  to={ROUTES.MODULE}
                  className="flex my-2 w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdOutlineCreateNewFolder className="mt-1" size="20" />
                  <span>Modul</span>
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to={ROUTES.MODULETEST}
                  className="flex w-10/12 items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
                >
                  <MdOutlineCreateNewFolder className="mt-1" size="20" />
                  <span>Test</span>
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
