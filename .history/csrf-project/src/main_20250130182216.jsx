
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './heathplanCSRF/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppRoutes/>
</BrowserRouter>,
)




