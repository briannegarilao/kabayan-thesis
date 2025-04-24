import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyzdVmD48LzqjBkj5KRfPmiI1ae-djfCQ",
  authDomain: "kabayan-1cb89.firebaseapp.com",
  projectId: "kabayan-1cb89",
  storageBucket: "kabayan-1cb89.firebasestorage.app",
  messagingSenderId: "12913010048",
  appId: "1:12913010048:web:c63fd26cd62d0005160d65",
  measurementId: "G-28Z7LRBK5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);