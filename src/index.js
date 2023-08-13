import React, { Suspense } from "react";
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
import LoadingPage from "./pages/LoadingPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <Suspense fallback={<LoadingPage />}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </Suspense>
);

// عبد العزيز
