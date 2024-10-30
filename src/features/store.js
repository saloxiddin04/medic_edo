import { configureStore } from "@reduxjs/toolkit";

import moduleSlice from "./modules/moduleSlice";
import pastTestSlice from "./pastTest/pastTestSlice";
import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import testResultsSlice from "./testResults/testResultsSlice";
import timerSlice from "./Timer/timerSlice";
import userDetailSlice from "./userDetail/userDetailSlice";
import lessonsByTestsSlice from "./LessonsByTests/LessonsByTestsSlice";

export const store = configureStore({
  reducer: {
    lessonByTest: lessonsByTestsSlice,
    module: moduleSlice,
    pastTest: pastTestSlice,
    localStorage: localStorageSlice,
    testResults: testResultsSlice,
    timer: timerSlice,
    userDetail: userDetailSlice
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
