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

setTimeout(() => {
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
}, 1500);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
