import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pizzerias = await prisma.pizzeria.findMany({
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

    return NextResponse.json(pizzerias);
  } catch (error) {
    console.error("Error fetching pizzerias:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const newPizzeria = await prisma.pizzeria.create({
      data: {
        name: data.name,
        description: data.description,
        phone: data.phone,
        website: data.website,
        openingHours: data.openingHours,
        address: {
          create: {
            street: data.address.street,
            city: data.address.city,
            postalCode: data.address.postalCode,
            country: data.address.country,
          },
        },
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(newPizzeria);
  } catch (error) {
    console.error("Error creating pizzeria:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
