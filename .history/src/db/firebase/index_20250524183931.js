// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
  deleteDoc,
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw8WZJeLgIjBuv2SJU_oFkrHZM4MlWEo8",
  authDomain: "pizzuj-cd1fb.firebaseapp.com",
  projectId: "pizzuj-cd1fb",
  storageBucket: "pizzuj-cd1fb.firebasestorage.app",
  messagingSenderId: "437235346206",
  appId: "1:437235346206:web:77a7897c724afbbfbfb70f",
  measurementId: "G-2LSB6JMJE6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
