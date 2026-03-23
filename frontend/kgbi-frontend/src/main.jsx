import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // 🎨 High-end custom Tailwind & DaisyUI styles
import App from './App.jsx';

/**
 * 🏛️ KENYA GRACE BIBLE INSTITUTE - FRONTEND
 * Entry point for the React 19 Application.
 * StrictMode is enabled to catch potential issues during development.
 */

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
