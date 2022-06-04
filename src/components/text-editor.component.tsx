import "./text-editor.component.css";
import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

// export default function TextEditor() {
//   const [value, setValue] = React.useState("**Hello world!!!**");
//   return (
//     <div className="container">
//       <MDEditor value={value} />
//       <MDEditor.Markdown source={value} />
//     </div>
//   );
// }

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("**Hello world!!!**");
  const [editMode, setEditMode] = useState(false);

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
        <MDEditor value={value} onChange={(value) => setValue(value || "")} />
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
        <MDEditor.Markdown className="markdown" source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
