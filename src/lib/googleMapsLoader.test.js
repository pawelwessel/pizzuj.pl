// Simple test for Google Maps loader
// This file can be used to test the centralized loader functionality

import { loadGoogleMapsAPI } from "./googleMapsLoader";

// Mock the environment variable
process.env.NEXT_PUBLIC_FIREBASE_MAP_KEY = "test-key";

// Test that multiple calls return the same promise
async function testMultipleCalls() {
  console.log("Testing multiple API load calls...");

  const promise1 = loadGoogleMapsAPI();
  const promise2 = loadGoogleMapsAPI();
  const promise3 = loadGoogleMapsAPI();

  // All promises should be the same instance
  console.log("Promise 1 === Promise 2:", promise1 === promise2);
  console.log("Promise 2 === Promise 3:", promise2 === promise3);

  try {
    await Promise.all([promise1, promise2, promise3]);
    console.log("✅ All promises resolved successfully");
  } catch (error) {
    console.error("❌ Error loading API:", error);
  }
}

// Test that script is only added once
function testScriptAddition() {
  console.log("Testing script addition...");

  // Clear any existing scripts
  const existingScripts = document.querySelectorAll(
    'script[src*="maps.googleapis.com"]'
  );
  existingScripts.forEach((script) => script.remove());

  // Make multiple calls
  loadGoogleMapsAPI();
  loadGoogleMapsAPI();
  loadGoogleMapsAPI();

  // Check that only one script was added
  const scripts = document.querySelectorAll(
    'script[src*="maps.googleapis.com"]'
  );
  console.log("Number of Google Maps scripts:", scripts.length);

  if (scripts.length === 1) {
    console.log("✅ Only one script was added");
  } else {
    console.log("❌ Multiple scripts were added");
  }
}

// Run tests if in browser environment
if (typeof window !== "undefined") {
  testScriptAddition();
  testMultipleCalls();
}

export { testMultipleCalls, testScriptAddition };
