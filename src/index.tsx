import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import store from "./redux/store/store";
import { Provider } from "react-redux";

import "./global.scss";
import "antd/dist/reset.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="madhakuday.us.auth0.com"
          clientId="s9Q2XTRasvzFNlaDEQ4fEDD1PUScgJga"
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
