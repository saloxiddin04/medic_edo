import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

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
import Users from "../pages/Users";
import UsersDetail from "../pages/UsersDetail";
import System from "../pages/System/System";
import CreateSystem from "../pages/System/CreateSystem";
import TestReview from "../pages/TestReview/TestReview";
import Group from "../pages/Group/Group";
import CreateGroup from "../pages/Group/CreateGroup";
import GroupBinding from "../pages/Group/GroupBinding";
import CreateGroupBinding from "../pages/Group/CreateGroupBinding";
import LessonByTests from "../pages/LessonByTest/LessonByTests";
import PassLesson from "../pages/PassLesson/PassLesson";
import CreateLessonTest from "../pages/LessonByTest/CreateLessonTest";
import Ranking from "../pages/Ranking/Ranking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Main />} />
      <Route path={'/'} element={<Navigate to={ROUTES.MAIN} />} />
      <Route path={ROUTES.LESSON_TEST} element={<PassLesson />} />
      <Route path={ROUTES.CUSTOMTEST} element={<CreateCustomTest />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.TEST_REVIEW} element={<TestReview />} />
      <Route path={ROUTES.CREATE_LESSON_TEST} element={<CreateLessonTest />} />
      
      <Route path={ROUTES.RANKING} element={<Ranking/>} />
      
      {getUserData() && getUserData().role === "admin" && (
        <>
          {" "}
          <Route path={ROUTES.MODULE} element={<Module />} />
          <Route path={ROUTES.CREATEMODULE} element={<CreateModule />} />
          <Route path={ROUTES.MODULETEST} element={<ModuleTest />} />
          <Route path={ROUTES.CREATE_SYSTEM} element={<CreateSystem />} />
          <Route
            path={ROUTES.CREATEMODULETEST}
            element={<CreateModuleTest />}
          />
          <Route path={ROUTES.USERS} element={<Users/>} />
          <Route path={ROUTES.USERS_DETAIL} element={<UsersDetail/>} />
          <Route path={ROUTES.SYSTEM} element={<System/>} />
          <Route path={ROUTES.GROUP} element={<Group/>} />
          <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup/>} />
          <Route path={ROUTES.GROUP_BINDING} element={<GroupBinding/>} />
          <Route path={ROUTES.GROUP_BINDING_BINDING} element={<CreateGroupBinding/>} />
          <Route path={ROUTES.LESSON_BY_TESTS} element={<LessonByTests/>} />
        </>
      )}
      
      {getUserData() && getUserData().role === "teacher" && (
        <>
          {" "}
          <Route path={ROUTES.GROUP_BINDING} element={<GroupBinding/>} />
          <Route path={ROUTES.GROUP_BINDING_BINDING} element={<CreateGroupBinding/>} />
        </>
      )}

      {/* not found */}
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
