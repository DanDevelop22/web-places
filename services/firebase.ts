// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEmDjNVjlwVviRutt7kSZtAgjMv4W8kI4",
  authDomain: "web-places-54de4.firebaseapp.com",
  projectId: "web-places-54de4",
  storageBucket: "web-places-54de4.firebasestorage.app",
  messagingSenderId: "230513649239",
  appId: "1:230513649239:web:c4a62b17ac8384ede32512",
  measurementId: "G-9T6ZRNL0BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
