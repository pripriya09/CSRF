
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
