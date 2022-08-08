import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './services/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UserProvider>
  </React.StrictMode>,
);
