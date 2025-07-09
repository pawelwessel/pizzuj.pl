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

// User settings management functions
export async function getUserSettings(userId) {
  try {
    const settingsRef = doc(db, "user_settings", userId);
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data();
    } else {
      // Return default settings if none exist
      const defaultSettings = {
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        pizzeriaUpdates: true,
        weeklyDigest: false,
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
        allowAnalytics: true,
        theme: "light",
        language: "pl",
        compactView: false,
        showAchievements: true,
        autoSave: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        dataRetention: 365,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Create default settings in database
      await setDoc(settingsRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error("Error getting user settings:", error);
    throw error;
  }
}

export async function updateUserSettings(userId, settings) {
  try {
    const settingsRef = doc(db, "user_settings", userId);
    await updateDoc(settingsRef, {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
}

export async function resetUserSettings(userId) {
  try {
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      pizzeriaUpdates: true,
      weeklyDigest: false,
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowAnalytics: true,
      theme: "light",
      language: "pl",
      compactView: false,
      showAchievements: true,
      autoSave: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
      dataRetention: 365,
      updatedAt: new Date().toISOString(),
    };
    
    const settingsRef = doc(db, "user_settings", userId);
    await setDoc(settingsRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error("Error resetting user settings:", error);
    throw error;
  }
}

// User preferences and activity tracking
export async function logUserActivity(userId, activity) {
  try {
    const activityData = {
      userId,
      ...activity,
      timestamp: new Date().toISOString(),
    };
    
    const activityId = `${userId}_${Date.now()}`;
    await setDoc(doc(db, "user_activity", activityId), activityData);
  } catch (error) {
    console.error("Error logging user activity:", error);
    // Don't throw error for activity logging as it's not critical
  }
}

export async function getUserActivity(userId, limit = 50) {
  try {
    const q = query(
      collection(db, "user_activity"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    const activities = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
    
    return activities;
  } catch (error) {
    console.error("Error getting user activity:", error);
    return [];
  }
}

export async function updateUserPreferences(userId, preferences) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      preferences: preferences,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw error;
  }
}

// Enhanced user management functions
export async function getUserStats(userId) {
  try {
    const [userDoc, pizzerias, activities] = await Promise.all([
      getDocument("users", userId),
      getUserPizzerias(userId),
      getUserActivity(userId, 10)
    ]);

    return {
      user: userDoc,
      pizzeriasCount: pizzerias.length,
      recentActivities: activities,
      lastLoginDate: userDoc?.lastLoginDate || null,
      accountCreatedDate: userDoc?.joinDate || null,
      isPremium: userDoc?.isPremium || false
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    throw error;
  }
}

export async function updateUserLoginInfo(userId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      lastLoginDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user login info:", error);
    // Don't throw error as it's not critical
  }
}

export async function deleteUserAccount(userId) {
  try {
    // Delete user pizzerias
    const pizzerias = await getUserPizzerias(userId);
    const deletePromises = pizzerias.map(pizzeria => deletePizzeria(pizzeria.id));
    await Promise.all(deletePromises);

    // Delete user settings
    await deleteDoc(doc(db, "user_settings", userId));

    // Delete user activities (in batches if needed)
    const activitiesQuery = query(
      collection(db, "user_activity"),
      where("userId", "==", userId)
    );
    const activitiesSnapshot = await getDocs(activitiesQuery);
    const activityDeletePromises = activitiesSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(activityDeletePromises);

    // Finally delete user document
    await deleteDoc(doc(db, "users", userId));

    return { success: true, message: "User account deleted successfully" };
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}

export async function upgradeUserToPremium(userId, subscriptionData) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isPremium: true,
      premiumUpgradeDate: new Date().toISOString(),
      subscriptionData: subscriptionData,
      updatedAt: new Date().toISOString(),
    });

    // Log the upgrade activity
    await logUserActivity(userId, {
      action: "premium_upgrade",
      subscriptionType: subscriptionData?.type || "premium"
    });

    return { success: true, message: "User upgraded to premium successfully" };
  } catch (error) {
    console.error("Error upgrading user to premium:", error);
    throw error;
  }
}
