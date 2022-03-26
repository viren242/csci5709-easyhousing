import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./context/userContext";

// import "./index.css";
import App from "../src/app/App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme="colored"
          hideProgressBar
        />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
