import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import move from "./javascripts/animationBackgroun";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>

      <App move={move} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
