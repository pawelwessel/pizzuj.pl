import { getDocument } from "../db/firebase";

/**
 * Check if user has admin role
 * @param {string} userId - Firebase user ID
 * @returns {Promise<boolean>} - Returns true if user is admin
 */
export async function isUserAdmin(userId) {
  try {
    const userData = await getDocument("users", userId);
    return userData && userData.role === "admin";
  } catch (error) {
    console.error("Error checking user role:", error);
    return false;
  }
}

/**
 * Get user role from Firebase
 * @param {string} userId - Firebase user ID
 * @returns {Promise<string>} - Returns user role ('admin', 'user', or null)
 */
export async function getUserRole(userId) {
  try {
    const userData = await getDocument("users", userId);
    return userData ? userData.role || "user" : null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

/**
 * Redirect user based on their role
 * @param {Object} router - Next.js router object
 * @param {string} userId - Firebase user ID
 * @returns {Promise<void>}
 */
export async function redirectByRole(router, userId) {
  try {
    const userRole = await getUserRole(userId);
    
    if (userRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  } catch (error) {
    console.error("Error redirecting by role:", error);
    // Default redirect on error
    router.push("/user");
  }
}