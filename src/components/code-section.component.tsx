import "./code-section.component.css";
import { useState, useEffect } from "react";

import Editor from "./code-editor.component";
import Preview from "./preview.component";
import Resizable from "./resizable.component";
import bundle from "../bundler/bundler";
import { Section } from "../common/Section";
import { useAppDispatch } from "../app/store";
import { updateSection } from "../features/sections/sectionsSlice";

interface CodeSectionProps {
  section: Section;
}

const CodeSection: React.FC<CodeSectionProps> = ({ section }) => {
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("test");
      const output = await bundle(section.content);
      setCode(output.code);
      setErr(output.err);
    }, 1500);

    return () => clearTimeout(timer);
  }, [section.content]);

  return (
    <Resizable
      className="resize-y"
      width={Infinity}
      height={300}
      axis="y"
      resizeHandles={["s"]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 50]}
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable
          className="resize-x"
          width={window.innerWidth * 0.8}
          height={Infinity}
          axis="x"
          resizeHandles={["e"]}
          minConstraints={[window.innerWidth * 0.2, Infinity]}
          maxConstraints={[window.innerWidth * 0.8, Infinity]}
        >
          <Editor
            onChange={(value) =>
              dispatch(updateSection({ id: section.id, content: value }))
            }
            initialValue={section.content}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeSection;
