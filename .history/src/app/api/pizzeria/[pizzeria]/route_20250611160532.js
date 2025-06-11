import { getDocuments } from "../../../../db/firebase";
import { NextResponse } from "next/server";

export async function GET(params, req) {
  const { pizzeria } = await req.params;
  const cities = await getDocuments("pizzerias", pizzeria);
  // in each city is place array with places
  
