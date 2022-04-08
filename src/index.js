import "./app.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./app";
import Dashboard from "./pages/dashboard/dashboard";
import Error from "./pages/error/error";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./providers/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="user/:id" element={<Dashboard />} />
            <Route path="404" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
