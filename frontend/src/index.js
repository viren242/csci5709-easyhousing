import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./context/userContext";

// import "./index.css";
import App from "../src/app/App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
