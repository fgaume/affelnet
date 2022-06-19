import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
