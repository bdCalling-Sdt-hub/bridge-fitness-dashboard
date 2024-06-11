import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Store } from "./Store";
import { Provider } from "react-redux";
import AdminProvider from "./Provider/AdminProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <AdminProvider>
        <App />
      </AdminProvider>
    </Provider>
  </React.StrictMode>
);
