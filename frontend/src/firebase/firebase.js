// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKOeBa9FFJ7-M9wlEBoOBSLjVouUhSOZs",
  authDomain: "agrobazaar-d755b.firebaseapp.com",
  projectId: "agrobazaar-d755b",
  storageBucket: "agrobazaar-d755b.firebasestorage.app",
  messagingSenderId: "69198017330",
  appId: "1:69198017330:web:462eab9d86aa9828e19d2b",
  measurementId: "G-C4B8NQHHC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, createUserWithEmailAndPassword };