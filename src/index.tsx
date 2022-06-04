import ReactDOM from "react-dom/client";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeSection from "./components/code-section.component";
import TextEditor from "./components/text-editor.component";

const App = () => (
  <div>
    <TextEditor />
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(<App />);
