// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqddyyYtyHqzIRpu-UTc8OtAmpn3HAFco",
    authDomain: "anna-f4ed0.firebaseapp.com",
    projectId: "anna-f4ed0",
    storageBucket: "anna-f4ed0.firebasestorage.app",
    messagingSenderId: "814290635402",
    appId: "1:814290635402:web:75beaa997d6722e9377b73",
    measurementId: "G-ZDVP3D33EK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };