// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA80SJd4Sv1WcrkDaGpmSa57hwNLHA9F_8",
  authDomain: "task-manager-460b3.firebaseapp.com",
  projectId: "task-manager-460b3",
  storageBucket: "task-manager-460b3.appspot.com",
  messagingSenderId: "967610541354",
  appId: "1:967610541354:web:a9a7d0c4fe07308434aa53",
  measurementId: "G-CWS592NMW6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
