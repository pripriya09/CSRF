
import React from "react";

import AppRoutes from './heathplanCSRF/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    <AppRoutes/>
  </>,
)




import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
