import { NextResponse } from "next/server";
import { updateUserRole, isUserAdmin, getDocument } from "../../../../db/firebase";

export async function POST(request) {
  try {
    const { userId, targetUserId, role } = await request.json();

    // Validate input
    if (!userId || !targetUserId || !role) {
      return NextResponse.json(
        { error: "Missing required fields: userId, targetUserId, role" },
        { status: 400 }
      );
    }

    // Check if the requesting user is an admin
    const isAdmin = await isUserAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can set user roles" },
        { status: 403 }
      );
    }

    // Validate role
    const validRoles = ["user", "admin", "owner"];
    if (!validRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid role. Must be one of: user, admin, owner" },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await getDocument("users", targetUserId);
    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    // Update user role
    await updateUserRole(targetUserId, role);

    return NextResponse.json({
      success: true,
      message: `User ${targetUserId} role updated to ${role}`,
      targetUser: {
        id: targetUserId,
        name: targetUser.name,
        email: targetUser.email,
        newRole: role,
      },
    });
  } catch (error) {
    console.error("Error setting user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to set user roles." },
    { status: 405 }
  );
}