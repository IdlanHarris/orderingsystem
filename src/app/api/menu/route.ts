// File: src/app/api/menu/route.ts
// This file handles the API route for fetching menu items from the database
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const res = await db.query("SELECT * FROM menu_items");
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
