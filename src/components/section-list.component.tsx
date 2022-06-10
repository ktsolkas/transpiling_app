import { useSelector } from "react-redux";
import { Fragment } from "react";
import { selectSortedSections } from "../features/sections/sectionsSlice";
import AddSection from "./AddSection";
import SectionListItem from "./section-list-item.component";

const SectionList: React.FC = () => {
  // const sections = useTypedSelector(({ sections: { ids, entities } }) =>
  //   ids.map((id) => entities[id])
  // );
  const sections = useSelector(selectSortedSections);
  const sectionsJSX = sections.map((section) => (
    <Fragment key={section!.id}>
      <SectionListItem section={section!} />
      <AddSection sectionBeforeId={section!.id} />
    </Fragment>
  ));
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
