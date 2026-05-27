import { NextResponse } from "next/server";
import { getDb } from "../../lib/db"

export async function GET() {
  const db = getDb();
  const [rows] = await db.query("SELECT * FROM todos");
  return NextResponse.json(rows);
}