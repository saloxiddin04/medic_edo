import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import CreateCustomTest from "../pages/CreateCustomTest";

import CreateModule from "../pages/Modules/CreateModule";
import CreateModuleTest from "../pages/Tests/CreateModuleTest";
import Module from "../pages/Modules/Module";
import ModuleTest from "../pages/Tests/ModuleTest";
import { ROUTES } from "./constants";
import { getUserData } from "../auth/jwtService";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Main />} />
      <Route path={ROUTES.CUSTOMTEST} element={<CreateCustomTest />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      {getUserData() && getUserData().role === "admin" && (
        <>
          {" "}
          <Route path={ROUTES.MODULE} element={<Module />} />
          <Route path={ROUTES.CREATEMODULE} element={<CreateModule />} />
          <Route path={ROUTES.MODULETEST} element={<ModuleTest />} />
          <Route
            path={ROUTES.CREATEMODULETEST}
            element={<CreateModuleTest />}
          />
        </>
      )}

      {/* not found */}
      <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
