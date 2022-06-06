import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import sectionsReducer from "../features/sections/sectionsSlice";

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();