import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";

import bundle from "./bundler/bundler";
import { updateSection } from "../sections/sectionsSlice";
import { bundleCreated } from "./bundlesSlice";
import type { RootState, AppDispatch } from "../../app/store";

export const bundleMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
  bundleMiddleware.startListening as AppStartListening;

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
      const result = await bundle(action.payload.changes.content!);
      listenerApi.dispatch(
        bundleCreated({ bundle: result, sectionId: "" + action.payload.id })
      );
    }, 1000);
  },
});
