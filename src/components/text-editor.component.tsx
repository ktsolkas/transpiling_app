import "./text-editor.component.css";
import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Section } from "../common/types/Section";
import { useAppDispatch } from "../app/store";
import { updateSection } from "../features/sections/sectionsSlice";

// export default function TextEditor() {
//   const [value, setValue] = React.useState("**Hello world!!!**");
//   return (
//     <div className="container">
//       <MDEditor value={value} />
//       <MDEditor.Markdown source={value} />
//     </div>
//   );
// }

interface TextEditorProps {
  section: Section;
}

const TextEditor: React.FC<TextEditorProps> = ({ section }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditMode(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editMode) {
    return (
      <div data-color-mode="dark" className="text-editor" ref={ref}>
        <MDEditor
          value={section.content}
          onChange={
            (value) =>
              dispatch(
                updateSection({
                  id: section.id,
                  changes: { content: value || "" },
                })
              ) //content: value || ''
          }
        />
      </div>
    );
  }
  return (
    <div
      data-color-mode="dark"
      className="text-editor card"
      onClick={() => setEditMode(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown
          className="markdown"
          source={section.content || "Click to edit"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
