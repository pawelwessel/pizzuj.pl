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

console.log("Firebase config environment variables:");
console.log("NEXT_PUBLIC_API_KEY:", process.env.NEXT_PUBLIC_API_KEY ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_AUTH_DOMAIN ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_PROJECT_ID:", process.env.NEXT_PUBLIC_PROJECT_ID ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_STORAGE_BUCKET ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_APP_ID:", process.env.NEXT_PUBLIC_APP_ID ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_MEASURMENT_ID:", process.env.NEXT_PUBLIC_MEASURMENT_ID ? "SET" : "NOT SET");

export const provider = new GoogleAuthProvider();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized successfully");

// Test function to check Firebase connection
export async function testFirebaseConnection() {
  try {
    console.log("Testing Firebase connection...");
    const testDoc = await getDocument("test", "connection");
    console.log("Firebase connection test successful");
    return true;
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    return false;
  }
}

// Test function to try writing to a test collection
export async function testFirebaseWrite() {
  try {
    console.log("Testing Firebase write...");
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: "Test write from pizzeria dashboard"
    };
    await setDoc(doc(db, "test", "write_test"), testData);
    console.log("Firebase write test successful");
    return true;
  } catch (error) {
    console.error("Firebase write test failed:", error);
    return false;
  }
}

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

export async function updateDocument(collectionName, uniqueId, data) {
  const docRef = doc(db, collectionName, uniqueId);
  await updateDoc(docRef, data);
}

// Pizzeria management functions
export async function createPizzeria(userId, pizzeriaData) {
  console.log("createPizzeria called with:", { userId, pizzeriaData });
  
  const pizzeriaId = `${userId}_${Date.now()}`;
  const pizzeria = {
    id: pizzeriaId,
    ownerId: userId,
    ...pizzeriaData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  console.log("Pizzeria object to save:", pizzeria);
  console.log("Saving to collection: user_pizzerias, document ID:", pizzeriaId);
  
  try {
    await setDoc(doc(db, "user_pizzerias", pizzeriaId), pizzeria);
    console.log("Pizzeria saved successfully to Firebase");
    return pizzeria;
  } catch (error) {
    console.error("Error saving pizzeria to Firebase:", error);
    throw error;
  }
}

export async function updatePizzeria(pizzeriaId, updateData) {
  const pizzeriaRef = doc(db, "user_pizzerias", pizzeriaId);
  await updateDoc(pizzeriaRef, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
}

export async function getUserPizzerias(userId) {
  console.log("getUserPizzerias called for userId:", userId);
  
  const q = query(
    collection(db, "user_pizzerias"),
    where("ownerId", "==", userId)
  );
  
  console.log("Query created, executing...");
  
  try {
    const snapshot = await getDocs(q);
    console.log("Query result - documents found:", snapshot.docs.length);
    const pizzerias = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Processed pizzerias:", pizzerias);
    return pizzerias;
  } catch (error) {
    console.error("Error in getUserPizzerias:", error);
    throw error;
  }
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

// Menu management functions
export async function createMenuItem(pizzeriaId, menuItem) {
  const menuItemId = `${pizzeriaId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const menuItemData = {
    id: menuItemId,
    pizzeriaId,
    ...menuItem,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  await setDoc(doc(db, "menu_items", menuItemId), menuItemData);
  return menuItemData;
}

export async function getMenuItems(pizzeriaId) {
  const q = query(
    collection(db, "menu_items"),
    where("pizzeriaId", "==", pizzeriaId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateMenuItem(menuItemId, updateData) {
  const menuItemRef = doc(db, "menu_items", menuItemId);
  await updateDoc(menuItemRef, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteMenuItem(menuItemId) {
  await deleteDoc(doc(db, "menu_items", menuItemId));
}

export async function toggleMenuItemAvailability(menuItemId, isAvailable) {
  const menuItemRef = doc(db, "menu_items", menuItemId);
  await updateDoc(menuItemRef, {
    isAvailable,
    updatedAt: new Date().toISOString(),
  });
}

// Promotion management functions
export async function createPromotion(pizzeriaId, promotionData) {
  const promotionId = `${pizzeriaId}_promotion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const promotion = {
    id: promotionId,
    pizzeriaId,
    ...promotionData,
    status: promotionData.status || 'active',
    usage: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  await setDoc(doc(db, "promotions", promotionId), promotion);
  return promotion;
}

export async function getPromotions(pizzeriaId) {
  const q = query(
    collection(db, "promotions"),
    where("pizzeriaId", "==", pizzeriaId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updatePromotion(promotionId, updateData) {
  const promotionRef = doc(db, "promotions", promotionId);
  await updateDoc(promotionRef, {
    ...updateData,
    updatedAt: new Date().toISOString(),
  });
}

export async function deletePromotion(promotionId) {
  await deleteDoc(doc(db, "promotions", promotionId));
}

export async function togglePromotionStatus(promotionId, status) {
  const promotionRef = doc(db, "promotions", promotionId);
  await updateDoc(promotionRef, {
    status,
    updatedAt: new Date().toISOString(),
  });
}
