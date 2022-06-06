import ReactDOM from "react-dom/client";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
