import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

import './configurations/i18n';
import App from './pages/app';
import reportWebVitals from './reportWebVitals';
import { getFirebaseConfig } from './configurations/firebase';
import { ConfigContextProvider } from './contexts/configContext';

firebase.initializeApp({
  ...getFirebaseConfig(process.env.REACT_APP_FIREBASE_PROJECT || '', process.env.REACT_APP_FIREBASE_API_KEY || '')
});

ReactDOM.render(
  <React.StrictMode>
    <ConfigContextProvider>
      <App />
    </ConfigContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
