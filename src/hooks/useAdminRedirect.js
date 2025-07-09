import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../db/firebase";
import { getDocument } from "../db/firebase";
import { useRouter } from "next/navigation";

export function useAdminRedirect() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUserRole() {
      if (loading) return;
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getDocument("users", user.uid);
        setUserData(data);
        
        // Check if user has admin or owner role
        const userRole = data?.role?.toLowerCase();
        const hasAdminAccess = userRole === "admin" || userRole === "owner";
        
        setIsAdmin(hasAdminAccess);
        
        // Auto-redirect admin users to admin panel
        if (hasAdminAccess) {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkUserRole();
  }, [user, loading, router]);

  return {
    user,
    userData,
    isAdmin,
    isLoading: isLoading || loading,
    redirectToAdmin: () => router.push("/admin"),
    redirectToUser: () => router.push("/user"),
  };
}

export function checkAdminRole(userData) {
  if (!userData || !userData.role) return false;
  const userRole = userData.role.toLowerCase();
  return userRole === "admin" || userRole === "owner";
}