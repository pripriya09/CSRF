import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './heathplanCSRF/AppRoutes.jsx'; ///// backend - app.js(admincsrf route)
import CsrfTutorials from "./CsrfTutorials.jsx";

// Use createRoot to render your app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes />
    <CsrfTutorials/>
  </BrowserRouter>
);
