import "react-app-polyfill/stable";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import Editor from "./components/code-editor.component";

const App = () => {
  const iframe = useRef<any>();
  const [inputText, setInputText] = useState("");
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
    //reset the iframe every time in case the user does something like document.body.innerHTML = '';
    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(inputText)],
      //   define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
    });
    //setOutputText(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                    console.error(err);
                }
            }, false);
            </script>
        </body>
    </html>
  `;

  return (
    <div>
      <Editor
        onChange={(value) => setInputText(value)}
        initialValue="const b = 'peon';"
      />
      <textarea
        placeholder="test"
        value={inputText}
        onChange={onInputTextChange}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        title="A frame that shows the output of the code we have written"
      />
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
