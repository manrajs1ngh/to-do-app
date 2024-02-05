// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkwxPDX6ITAGoyefJRlm7V5Cg5VBy4x6c",
  authDomain: "to-do-app-5fcd7.firebaseapp.com",
  projectId: "to-do-app-5fcd7",
  storageBucket: "to-do-app-5fcd7.appspot.com",
  messagingSenderId: "1094992794198",
  appId: "1:1094992794198:web:74574ca5ee4c5913bb61f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);