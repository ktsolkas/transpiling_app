import { useSelector } from "react-redux";
import { Fragment } from "react";

import { selectSortedSections } from "../features/sections/sectionsSlice";
import AddSection from "./AddSection";
import SectionListItem from "./SectionListItem";

const SectionList: React.FC = () => {
  const sections = useSelector(selectSortedSections);
  const sectionsJSX = sections.map((section) => {
    if (section) {
      return (
        <Fragment key={section.id}>
          <SectionListItem section={section} />
          <AddSection sectionBeforeId={section.id} />
        </Fragment>
      );
    }
    return undefined;
  });

  return (
    <div>
      <AddSection
        overrideOpacity={sections.length === 0}
        sectionBeforeId={null}
      />
      {sectionsJSX}
    </div>
  );
};

export default SectionList;
