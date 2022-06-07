import "./section-list-item.component.css";
import { Section } from "../common/Section";
import TextEditor from "./text-editor.component";
import CodeSection from "./code-section.component";
import ActionBar from "./action-bar.component";

interface SectionListItemProps {
  section: Section;
}

const SectionListItem: React.FC<SectionListItemProps> = ({ section }) => {
  let child: JSX.Element;
  if (section.type === "text") {
    console.log(section, section.type);
    child = <TextEditor section={section} />;
  } else {
    console.log(section, section.type);
    child = <CodeSection section={section} />;
  }
  return (
    <div className="section-list-item">
      <ActionBar id={section.id} />
      {child}
    </div>
  );
};

export default SectionListItem;
