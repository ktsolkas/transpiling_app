import "./SectionListItem.css";
import { Section } from "../common/types/Section";
import TextEditor from "./TextEditor";
import CodeSection from "./CodeSection";
import ActionBar from "./ActionBar";

interface SectionListItemProps {
  section: Section;
}

const SectionListItem: React.FC<SectionListItemProps> = ({ section }) => {
  let child: JSX.Element;
  if (section.type === "text") {
    child = (
      <>
        <ActionBar id={section.id} />
        <TextEditor section={section} />
      </>
    );
  } else {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={section.id} />
        </div>
        <CodeSection section={section} />
      </>
    );
  }
  return <div className="section-list-item">{child}</div>;
};

export default SectionListItem;
