// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

export const provider = new GoogleAuthProvider();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}

export async function createUser(user) {
  await setDoc(doc(db, "users", user.uid), user);
}

export async function getDocuments(collectionName) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getDocument(collectionName, uniqueId) {
  const docRef = doc(db, collectionName, uniqueId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

// Pizzeria management functions
export async function createPizzeria(userId, pizzeriaData) {
  const pizzeriaId = `${userId}_${Date.now()}`;
  const pizzeria = {
    id: pizzeriaId,
    ownerId: userId,
    ...pizzeriaData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setDoc(doc(db, "user_pizzerias", pizzeriaId), pizzeria);
  return pizzeria;
}

export async function updatePizzeria(pizzeriaId, updateData) {
  const pizzeriaRef = doc(db, "user_pizzerias", pizzeriaId);
  await updateDoc(pizzeriaRef, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
}

export async function getUserPizzerias(userId) {
  const q = query(
    collection(db, "user_pizzerias"),
    where("ownerId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deletePizzeria(pizzeriaId) {
  await deleteDoc(doc(db, "user_pizzerias", pizzeriaId));
}

export async function updateUserProfile(userId, updateData) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
}

// User role management functions
export async function updateUserRole(userId, role) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    role: role,
    updatedAt: new Date().toISOString(),
  });
}

export async function getUserRole(userId) {
  const userDoc = await getDocument("users", userId);
  return userDoc?.role || "user";
}

export async function isUserAdmin(userId) {
  const userDoc = await getDocument("users", userId);
  const role = userDoc?.role?.toLowerCase();
  return role === "admin" || role === "owner";
}
