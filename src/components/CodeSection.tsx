import "./CodeSection.css";
import { useSelector } from "react-redux";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./resizable.component";
import { Section } from "../common/types/Section";
import { useAppDispatch } from "../app/store";
import { updateSection } from "../features/sections/sectionsSlice";
import { selectBundleById } from "../features/bundles/bundlesSlice";

interface CodeSectionProps {
  section: Section;
}

const CodeSection: React.FC<CodeSectionProps> = ({ section }) => {
  const bundle = useSelector(selectBundleById)(section.id);
  const dispatch = useAppDispatch();

  return (
    <Resizable
      width={Infinity}
      height={300}
      axis="y"
      resizeHandles={["s"]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 50]}
    >
      <div className="inner-section">
        <Resizable
          className="resize-x"
          width={window.innerWidth * 0.8}
          height={Infinity}
          axis="x"
          resizeHandles={["e"]}
          minConstraints={[window.innerWidth * 0.2, Infinity]}
          maxConstraints={[window.innerWidth * 0.8, Infinity]}
        >
          <CodeEditor
            onChange={(value) =>
              dispatch(
                updateSection({ id: section.id, changes: { content: value } })
              )
            }
            initialValue={section.content}
          />
        </Resizable>
        <Preview code={bundle && bundle.code} err={bundle && bundle.err} />
      </div>
    </Resizable>
  );
};

export default CodeSection;
