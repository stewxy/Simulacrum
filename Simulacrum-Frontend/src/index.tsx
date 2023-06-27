import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// axios.defaults.baseURL = 'https://localhost:6969/api';
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('auth_token')) {
      config.headers!['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
    }
    return config;
  }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
