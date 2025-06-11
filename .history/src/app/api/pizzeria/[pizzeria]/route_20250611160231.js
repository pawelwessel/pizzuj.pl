import { fetchUsers } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(params, req) {
  const { pizzeria } = await req.params;
  const users = await fetchUsers();
  const user = users?.find((user) => user?.pseudo === slug);
  return NextResponse.json({
    ...user,
    email: "hidden",
  });
}
