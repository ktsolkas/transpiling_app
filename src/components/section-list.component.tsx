import { useSelector } from "react-redux";
import { selectSortedSections } from "../features/sections/sectionsSlice";
import SectionListItem from "./section-list-item.component";

const SectionList: React.FC = () => {
  // const sections = useTypedSelector(({ sections: { ids, entities } }) =>
  //   ids.map((id) => entities[id])
  // );
  const sections = useSelector(selectSortedSections);
  const sectionsJSX = sections.map((section) => (
    <SectionListItem key={section!.id} section={section!} />
  ));
  return <div>{sectionsJSX}</div>;
};

export default SectionList;
