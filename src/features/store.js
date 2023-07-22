import { configureStore } from "@reduxjs/toolkit";

import moduleSlice from "./modules/moduleSlice";
import pastTestSlice from "./pastTest/pastTestSlice";
import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";
import localStorageMiddleware from "./LocalStorageMiddleware";

export const store = configureStore({
  reducer: {
    module: moduleSlice,
    pastTest: pastTestSlice,
    localStorage: localStorageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: true,
});
