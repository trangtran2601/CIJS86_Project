// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKY2CJK5k9O9ZKkJTxhgmX45_3TgtRxEE",
  authDomain: "ecommerce-f5bd6.firebaseapp.com",
  projectId: "ecommerce-f5bd6",
  storageBucket: "ecommerce-f5bd6.appspot.com",
  messagingSenderId: "238317561235",
  appId: "1:238317561235:web:4ea1cc6ea3c8753bbbf466",
  measurementId: "G-LRXMF5Q82E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
export {db , auth ,storage}