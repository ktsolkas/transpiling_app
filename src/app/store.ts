import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import sectionsReducer from "../features/sections/sectionsSlice";
import bundlesReducer from "../features/bundles/bundlesSlice";
import { bundleMiddleware } from "../features/bundles/bundleMiddleware";

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
    bundles: bundlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(bundleMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
