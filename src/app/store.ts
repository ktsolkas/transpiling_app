import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sectionsReducer from "../features/sections/sectionsSlice";

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
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
