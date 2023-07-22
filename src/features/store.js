import { configureStore } from "@reduxjs/toolkit";

import moduleSlice from "./modules/moduleSlice";
import pastTestSlice from "./pastTest/pastTestSlice";
import localStorageSlice from "./LocalStorageSlice/LocalStorageSlice";

export const store = configureStore({
  reducer: {
    module: moduleSlice,
    pastTest: pastTestSlice,
    localStorage: localStorageSlice
  },
  devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});
