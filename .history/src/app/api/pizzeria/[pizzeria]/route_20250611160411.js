import { getDocuments } from "../../../../db/firebase";
import { NextResponse } from "next/server";

export async function GET(params, req) {
  const { pizzeria } = await req.params;
  const pizzerias = await getDocuments("pizzerias", pizzeria);
  const pizza = pizzerias?.find((user) => user?.pseudo === pizzeria);
  return NextResponse.json({
    ...user,
    email: "hidden",
  });
}
