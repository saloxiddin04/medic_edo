import { configureStore } from "@reduxjs/toolkit";

import moduleSlice from "./modules/moduleSlice";
import pastTestSlice from "./pastTest/pastTestSlice";
import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import testResultsSlice from "./testResults/testResultsSlice";

export const store = configureStore({
  reducer: {
    module: moduleSlice,
    pastTest: pastTestSlice,
    localStorage: localStorageSlice,
    testResults: testResultsSlice,
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
