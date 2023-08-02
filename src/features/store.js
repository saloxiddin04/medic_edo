import { configureStore } from "@reduxjs/toolkit";

import moduleSlice from "./modules/moduleSlice";
import pastTestSlice from "./pastTest/pastTestSlice";
import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import testResultsSlice from "./testResults/testResultsSlice";
import timerSlice from "./Timer/timerSlice";

export const store = configureStore({
  reducer: {
    module: moduleSlice,
    pastTest: pastTestSlice,
    localStorage: localStorageSlice,
    testResults: testResultsSlice,
    timer: timerSlice,
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
