import { Section } from "../common/Section";
import TextEditor from "./text-editor.component";
import CodeSection from "./code-section.component";

interface SectionListItemProps {
  section: Section;
}

const SectionListItem: React.FC<SectionListItemProps> = ({ section }) => {
  let child: JSX.Element = <p></p>;
  if (section.type === "text") {
    child = <TextEditor />;
  } else {
    child = <CodeSection />;
  }
  return <div>{child}</div>;
};

export default SectionListItem;
