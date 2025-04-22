import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Reference to Firestore collections
const historyCollection = collection(db, "history");

// Get all history documents
const getHistory = async () => {
  const querySnapshot = await getDocs(historyCollection);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

export { getHistory }; // Export the getHistory function
