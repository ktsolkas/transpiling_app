import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { randomId } from "../../common/helpers/randomId";
import { Direction } from "../../common/types/Direction";
import { Section, SectionTypes } from "../../common/types/Section";

const sectionsAdapter = createEntityAdapter<Section>({});

const sectionsSlice = createSlice({
  name: "sections",
  initialState: sectionsAdapter.getInitialState(),
  reducers: {
    updateSection: sectionsAdapter.updateOne,
    deleteSection: sectionsAdapter.removeOne,
    moveSection(
      state,
      action: PayloadAction<{ id: string; direction: Direction }>
    ) {
      const { id, direction } = action.payload;
      const index = state.ids.indexOf(id);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex > -1 && newIndex < state.ids.length) {
        state.ids[index] = state.ids[newIndex];
        state.ids[newIndex] = id;
      }
    },
    insertSectionAfter(
      state,
      action: PayloadAction<{ id: string | null; type: SectionTypes }>
    ) {
      const { id, type } = action.payload;
      let content = "";
      if (type === "text") {
        content = `# Markdown Editor\n*Click to edit*`;
      } else {
        content = `//Code Editor
//Use 'printf' to write a message to the frame
printf('Hello World!');
printf(5 * 5);
//Editor also supports importing any package from npm
import React from 'react'
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div style={{color: 'darkblue'}}>
    <h1>Formatting your code with Prettier</h1>
    <p>You can format your code by clicking on the button located at the top-right corner of the editor.</p>
  </div>
)`;
      }
      const section: Section = {
        id: randomId(),
        type,
        content,
      };
      state.entities[section.id] = section;
      if (id) {
        const index = state.ids.indexOf(id);
        state.ids.splice(index + 1, 0, section.id);
      } else {
        state.ids.unshift(section.id);
      }
    },
  },
});

export const selectSortedSections = (state: RootState) => {
  const {
    sections: { ids, entities },
  } = state;
  return ids.map((id) => entities[id]);
};

export const { updateSection, deleteSection, moveSection, insertSectionAfter } =
  sectionsSlice.actions;

export default sectionsSlice.reducer;
