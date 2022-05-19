import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU3ZPudGd0JAyZ9Q-o8Vt_9MeSaTjuCM0",
    authDomain: "tracker-76600.firebaseapp.com",
    projectId: "tracker-76600",
    storageBucket: "tracker-76600.appspot.com",
    messagingSenderId: "719346126693",
    appId: "1:719346126693:web:b5a576925a14a9623a1b8c",
    measurementId: "G-H63Y69ZSR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
