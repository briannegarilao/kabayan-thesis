// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyzdVmD48LzqjBkj5KRfPmiI1ae-djfCQ",
  authDomain: "kabayan-1cb89.firebaseapp.com",
  projectId: "kabayan-1cb89",
  storageBucket: "kabayan-1cb89.firebasestorage.app",
  messagingSenderId: "12913010048",
  appId: "1:12913010048:web:c63fd26cd62d0005160d65",
  measurementId: "G-28Z7LRBK5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);