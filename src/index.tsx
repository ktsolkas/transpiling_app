import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import * as esbuild from "esbuild-wasm";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  let esbuildInitialized = false;

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    esbuildInitialized = true;
  };
  useEffect(() => {
    startService();
    //esbuild.build({});
  }, []);

  const onInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInputText(e.target.value);
  const onClick = () => {
    if (!esbuildInitialized) {
      return;
    }
    console.log(3);
  };

  return (
    <div>
      <textarea
        placeholder="test"
        value={inputText}
        onChange={onInputTextChange}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{outputText}</pre>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(<App />);
