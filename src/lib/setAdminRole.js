// Utility script to set admin roles
// This is for development/testing purposes only
import { updateUserRole } from "../db/firebase";

export async function setAdminRole(userId, role = "admin") {
  try {
    await updateUserRole(userId, role);
    console.log(`Successfully set user ${userId} role to ${role}`);
    return true;
  } catch (error) {
    console.error("Error setting admin role:", error);
    return false;
  }
}

export async function setOwnerRole(userId) {
  return await setAdminRole(userId, "owner");
}

// Example usage:
// import { setAdminRole, setOwnerRole } from "../lib/setAdminRole";
// await setAdminRole("user-uid-here", "admin");
// await setOwnerRole("user-uid-here");