import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  let esbuildInitialized = true;

  const startService = async () => {
    esbuildInitialized = false;
    await esbuild.initialize({
      worker: true,
      wasmURL: "esbuild.wasm",
    });
    esbuildInitialized = true;
  };
  useEffect(() => {
    startService();
    //esbuild.build({});
  }, []);

  const onInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInputText(e.target.value);
  const onClick = async () => {
    if (!esbuildInitialized) {
      return;
    }
    // const result = await esbuild.transform(inputText, {
    //   loader: "tsx",
    //   target: "es2015",
    // });
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(inputText)],
      //   define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
    });
    setOutputText(result.outputFiles[0].text);
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
