import { getDocuments } from "../../../../db/firebase";
import { fetchUsers } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { pizzeria } = await req.params;
  const pizzerias = await getDocuments("pizzerias", pizzeria);
  const user = users?.find((user) => user?.pseudo === pizzeria);
  return NextResponse.json({
    ...user,
    email: "hidden",
  });
}
