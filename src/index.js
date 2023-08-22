import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/custom.scss"
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as LoginProvider } from './LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Router>
  </React.StrictMode>
);