import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Section, SectionTypes } from "../../common/Section";

type SectionsState = {
  ids: string[];
  data: {
    [id: string]: Section;
  };
};

const sectionsAdapter = createEntityAdapter<SectionsState>({});

const sectionsSlice = createSlice({
  name: "sections",
  initialState: sectionsAdapter.getInitialState(),
  reducers: {
    updateSection(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      state = state;
    },
    deleteSection(state, action: PayloadAction<string>) {
      state = state;
    },
    moveSection(
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) {
      state = state;
    },
    insertSectionAfter(
      state,
      action: PayloadAction<{ id: string; type: SectionTypes }>
    ) {
      state = state;
    },
  },
});

export default sectionsSlice.reducer;
