
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './heathplanCSRF/AppRoutes.jsx'

ReactDOM.render(
  <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>,
  document.getElementById("root")
);
