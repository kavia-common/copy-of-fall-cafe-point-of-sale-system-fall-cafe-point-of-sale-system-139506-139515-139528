import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './theme.css';
import './layout.css';
import App from './App';
import { POSProvider } from './state/POSContext';
import { ToastProvider } from './ui/Toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <POSProvider>
          <App />
        </POSProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
