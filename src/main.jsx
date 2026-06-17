/* ============================================================
   src/main.jsx — Application Entry Point
   Multi-Format Text Hash Calculator & Validation Desk
   ============================================================ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
