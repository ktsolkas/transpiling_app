import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type BundlesState = {
  [key: string]: {
    code: string;
    err: string;
  };
};

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    bundleCreated(
      state,
      action: PayloadAction<{
        bundle: { code: string; err: any };
        sectionId: string;
      }>
    ) {
      state[action.payload.sectionId] = action.payload.bundle;
    },
  },
});

export const selectBundleById = (state: RootState) => (sectionId: string) =>
  state.bundles[sectionId];

export const { bundleCreated } = bundlesSlice.actions;
export default bundlesSlice.reducer;
