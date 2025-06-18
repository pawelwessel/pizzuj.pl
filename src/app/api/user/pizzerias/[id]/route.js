import { NextResponse } from "next/server";
import { updatePizzeria, deletePizzeria, getDocument } from "../../../../../db/firebase";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

async function verifyIdToken(idToken) {
  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    return null;
  }
}

async function verifyPizzeriaOwnership(pizzeriaId, userId) {
  try {
    const pizzeria = await getDocument("user_pizzerias", pizzeriaId);
    return pizzeria && pizzeria.ownerId === userId;
  } catch (error) {
    return false;
  }
}

export async function PUT(request, { params }) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await verifyIdToken(idToken);
    
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id } = params;
    
    // Verify ownership
    const isOwner = await verifyPizzeriaOwnership(id, decodedToken.uid);
    if (!isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updateData = await request.json();
    
    // Validate required fields
    if (!updateData.name || !updateData.address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 }
      );
    }

    await updatePizzeria(id, updateData);
    return NextResponse.json({ message: "Pizzeria updated successfully" });
  } catch (error) {
    console.error("Error updating pizzeria:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await verifyIdToken(idToken);
    
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id } = params;
    
    // Verify ownership
    const isOwner = await verifyPizzeriaOwnership(id, decodedToken.uid);
    if (!isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deletePizzeria(id);
    return NextResponse.json({ message: "Pizzeria deleted successfully" });
  } catch (error) {
    console.error("Error deleting pizzeria:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}