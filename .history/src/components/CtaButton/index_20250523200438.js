"use client";
import React from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ...other config
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CtaButton() {
  const openForm = async () => {
    const form = document.getElementById("form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
    // Example data to add
    const data = {
      timestamp: new Date(),
      action: "cta_clicked",
    };
    try {
      await addDoc(collection(db, "ctaClicks"), data);
      // Optionally show a success message
    } catch (error) {
      // Optionally handle error
      console.error("Error adding document: ", error);
    }
  };

  return (
    <button
      onClick={openForm}
      className="mx-auto block p-3 px-6 rounded-md bg-green-500 text-white font-bold"
    >
      Poproś o wycenę
    </button>
  );
}
