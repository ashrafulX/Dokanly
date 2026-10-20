import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router';
import AppRoute from './routes/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoute ></AppRoute>
    </BrowserRouter>
  </StrictMode>,
)
