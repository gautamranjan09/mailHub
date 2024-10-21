// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-_xRcAjEY0c00OZ4iREUyORNuFpveXHA",
  authDomain: "clone-9e796.firebaseapp.com",
  projectId: "clone-9e796",
  storageBucket: "clone-9e796.appspot.com",
  messagingSenderId: "774100952049",
  appId: "1:774100952049:web:63f06033b64fb782065a50",
  measurementId: "G-9JCQV363M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();