import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./features/store";

// App component
import App from "./App";

// style
import "./styles/tailwind.css";
import "./styles/components.scss";
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';

const container = document.getElementById("root");
const root = createRoot(container);

// document.addEventListener('contextmenu', (e) => e.preventDefault());
//
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
//     e.preventDefault();
//   }
// });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// عبد العزيز
