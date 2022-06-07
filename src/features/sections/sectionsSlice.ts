import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Section, SectionTypes } from "../../common/Section";

// type SectionsState = {
//   ids: string[];
//   data: {
//     [id: string]: Section;
//   };
// };

const sectionsAdapter = createEntityAdapter<Section>({});

const sectionsSlice = createSlice({
  name: "sections",
  initialState: sectionsAdapter.getInitialState(),
  reducers: {
    updateSection(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      const { id, content } = action.payload;
      const item = state.entities[id];
      if (item) {
        item.content = content;
      }
      //updateOne
    },
    deleteSection(state, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);
      if (index !== -1) {
        state.ids = state.ids.splice(index, 1);
        delete state.entities[action.payload];
        //sectionsAdapter.removeOne
      }
    },
    moveSection(
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>
    ) {
      const { id, direction } = action.payload;
      const index = state.ids.indexOf(id);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex > 0 && newIndex < state.ids.length) {
        state.ids[index] = state.ids[newIndex];
        state.ids[newIndex] = id;
      }
    },
    insertSectionAfter(
      state,
      action: PayloadAction<{ id: string | null; type: SectionTypes }>
    ) {
      const { id, type } = action.payload;
      const section: Section = {
        id: randomId(),
        type,
        content: "",
      };
      state.entities[section.id] = section;
      if (id) {
        const index = state.ids.indexOf(id);
        state.ids = state.ids.splice(index, 0, section.id);
      } else {
        state.ids.unshift(section.id);
      }
    },
  },
});

const randomId = () => {
  return Math.random().toString(36).slice(2, 7);
};

export const selectSortedSections = (state: RootState) => {
  const {
    sections: { ids, entities },
  } = state;
  return ids.map((id) => entities[id]);
};

export const { updateSection, deleteSection, moveSection, insertSectionAfter } =
  sectionsSlice.actions;

export default sectionsSlice.reducer;
