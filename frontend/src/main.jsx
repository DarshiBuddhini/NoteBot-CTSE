import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css' // Ant Design v5+

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
