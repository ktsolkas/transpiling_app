import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sectionsReducer from "../features/sections/sectionsSlice";
import bundlesReducer from "../features/bundles/bundlesSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
    bundles: bundlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

store.dispatch({
  type: "sections/insertSectionAfter",
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: "sections/insertSectionAfter",
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: "sections/insertSectionAfter",
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: "sections/insertSectionAfter",
  payload: {
    id: null,
    type: "text",
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
