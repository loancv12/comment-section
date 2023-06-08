import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.scss";
import ComContextProvider from "./components/ComContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ComContextProvider>
    <App />
  </ComContextProvider>
  // </React.StrictMode>
);
