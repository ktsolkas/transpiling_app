import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";

import { RootState, AppDispatch, store } from "./store";
import {
  insertSectionAfter,
  updateSection,
} from "../features/sections/sectionsSlice";
import bundle from "../bundler/bundler";
import { bundleCreated } from "../features/bundles/bundlesSlice";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

let timer: any;
startAppListening({
  actionCreator: updateSection,
  effect: async (action, listenerApi) => {
    const type =
      listenerApi.getState().sections.entities[action.payload.id]?.type;
    console.log(type);
    if (type === "text") {
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log("start");
      const result = await bundle(action.payload.content);
      listenerApi.dispatch(
        bundleCreated({ bundle: result, sectionId: action.payload.id })
      );
      console.log("end");
    }, 1500);
  },
});
