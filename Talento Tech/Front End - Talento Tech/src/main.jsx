import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Context/CartContext.jsx';
import { AdminProvider } from './Context/AdminContext';
import { AuthProvider } from './Context/AuthContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

