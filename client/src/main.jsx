import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./components/redux/index";
import { BrowserRouter } from "react-router-dom";

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
  },
  devTools: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
