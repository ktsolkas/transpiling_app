import "./code-section.component.css";
import { useState, useEffect } from "react";

import Editor from "./code-editor.component";
import Preview from "./preview.component";
import Resizable from "./resizable.component";
import bundle from "../bundler/bundler";

const CodeSection = () => {
  const [inputText, setInputText] = useState("");
  const [err, setErr] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("test");
      const output = await bundle(inputText);
      setCode(output.code);
      setErr(output.err);
    }, 1500);

    return () => clearTimeout(timer);
  }, [inputText]);

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
            onChange={(value) => setInputText(value)}
            initialValue="const b = 'peon';"
          />
        </Resizable>
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  );
};

export default CodeSection;
