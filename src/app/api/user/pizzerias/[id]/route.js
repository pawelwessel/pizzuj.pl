import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pizzeriaId = params.id;

    const pizzeria = await prisma.pizzeria.findUnique({
      where: {
        id: pizzeriaId,
      },
      include: {
        photos: true,
        reviews: {
          include: {
            user: true,
          },
        },
        address: true,
      },
    });

    if (!pizzeria) {
      return NextResponse.json(
        { error: "Pizzeria not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pizzeria);
  } catch (error) {
    console.error("Error fetching pizzeria:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pizzeriaId = params.id;
    const data = await request.json();

    const updatedPizzeria = await prisma.pizzeria.update({
      where: {
        id: pizzeriaId,
      },
      data: {
        name: data.name,
        description: data.description,
        phone: data.phone,
        website: data.website,
        openingHours: data.openingHours,
        address: {
          update: {
            street: data.address.street,
            city: data.address.city,
            postalCode: data.address.postalCode,
            country: data.address.country,
          },
        },
      },
    });

    return NextResponse.json(updatedPizzeria);
  } catch (error) {
    console.error("Error updating pizzeria:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pizzeriaId = params.id;

    await prisma.pizzeria.delete({
      where: {
        id: pizzeriaId,
      },
    });

    return NextResponse.json({ message: "Pizzeria deleted successfully" });
  } catch (error) {
    console.error("Error deleting pizzeria:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
