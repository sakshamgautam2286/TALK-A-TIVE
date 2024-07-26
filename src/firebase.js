import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqQIBYcddDCr5dYvi8QgXwfbXg11H21tg",
  authDomain: "talk-a-tive-f3772.firebaseapp.com",
  projectId: "talk-a-tive-f3772",
  storageBucket: "talk-a-tive-f3772.appspot.com",
  messagingSenderId: "1093725316132",
  appId: "1:1093725316132:web:054794c82c0eacb357e4b1",
  measurementId: "G-2LZCHYFMNR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
