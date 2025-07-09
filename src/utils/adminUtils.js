import { updateDoc, doc } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

// You can use this function to promote a user to admin role
// Note: This should be run in a secure environment or through Firebase Admin SDK in production

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Promote a user to admin role
 * @param {string} userId - Firebase user ID
 * @returns {Promise<void>}
 */
export async function promoteToAdmin(userId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: "admin",
      updatedAt: new Date().toISOString(),
    });
    console.log(`User ${userId} has been promoted to admin`);
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    throw error;
  }
}

/**
 * Demote an admin user back to regular user
 * @param {string} userId - Firebase user ID
 * @returns {Promise<void>}
 */
export async function demoteFromAdmin(userId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: "user",
      updatedAt: new Date().toISOString(),
    });
    console.log(`User ${userId} has been demoted to regular user`);
  } catch (error) {
    console.error("Error demoting user from admin:", error);
    throw error;
  }
}

/**
 * Console helper function to promote user to admin
 * Usage: In browser console, run: promoteUserToAdmin("user-id-here")
 */
if (typeof window !== "undefined") {
  window.promoteUserToAdmin = promoteToAdmin;
  window.demoteUserFromAdmin = demoteFromAdmin;
}