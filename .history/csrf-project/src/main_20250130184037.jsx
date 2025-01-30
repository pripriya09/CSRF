import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";

import AppRoutes from './heathplanCSRF/AppRoutes.jsx'; ///// backend - app.js(admincsrf folder)
import CsrfTutorials from "./CsrfTutorials.jsx"; ////   backend - index.js   (no other file include)

// Use createRoot to render your app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <AppRoutes /> */}
    <CsrfTutorials/>
  </BrowserRouter>
);
