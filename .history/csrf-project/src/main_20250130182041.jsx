
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import AppRoutes from './heathplanCSRF/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    <AppRoutes/>
  </>,
)



import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
