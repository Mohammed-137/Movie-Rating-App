import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
(() => {
  const silentStrings = [
    '[DEPRECATED] Default export is deprecated. Instead use `import { create } from \'zustand\'`',
    'A listener indicated an asynchronous response by returning true, but the message channel closed',
    'DialogContent requires a DialogTitle'
  ];

  const filter = (original, ...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && silentStrings.some(s => msg.includes(s))) return;
    original.apply(console, args);
  };

  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args) => filter(originalError, ...args);
  console.warn = (...args) => filter(originalWarn, ...args);
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

