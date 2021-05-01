import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import {AuthContextFn} from "./context/auth-context"

ReactDOM.render(
  <AuthContextFn>
    <App/>
  </AuthContextFn>,
  document.getElementById("root")
)
